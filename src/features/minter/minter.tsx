import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ConnectButton } from "../wallet/connectButton";
import { fetchAllowanceAsync, fetchBalanceAsync, fetchGovernanceDistributorShareAsync, selectWalletBalance } from "../wallet/walletSlice";
import { useEffect } from 'react';
import { fromEther } from "../../utils/format";
import { useWeb3Connector } from '../../hooks/web3Hook';
import { useWalletBalance } from "../../hooks/balanceHook";
import { useWalletAllowance } from "../../hooks/allowanceHook";
import { selectChosenCurrency } from "../currencyChoice/currencyChoiceSlice";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "ethers";
import { hideAwaitingModal, showConfirmedModal, showAwaitingModal, showRejectedModal, showSubmittedModal, addPendingTransaction, removePendingTransaction } from "../dialog/dialogSlice";
import { setFromAmountAndCalculateToAmount, selectFromAmount, selectToAmount, setToAmountAndCalculateFromAmount, selectGovDistributionRate, selectFeeAmount } from "./minterSlice";
import { InfoPopover } from './components/info-popover';
import { Input } from "./components/input";
import { BustadTokenSymbol } from "../../config";
import { useWalletConnection } from "../../hooks/walletConnectionHook";
import { MainBox } from "../../components/MainBox";
import ReactGA from 'react-ga';
import { ButtonGroup } from "./components/ButtonGroup";

export function Minter() {
  const walletBalance = useAppSelector(selectWalletBalance);
  const chosenCurrency = useAppSelector(selectChosenCurrency);
  const govDistributionRate = useAppSelector(selectGovDistributionRate);

  const balance = useWalletBalance();
  const allowance = useWalletAllowance();

  const dispatch = useAppDispatch();

  const { contracts, chosenCurrencyContract } = useWeb3Connector();
  const { isConnected, isMetaMask } = useWalletConnection();

  const fromAmount = useAppSelector(selectFromAmount);
  const toAmount = useAppSelector(selectToAmount);
  const feeAmount = useAppSelector(selectFeeAmount);

  const fromAmountNumber = Number(fromAmount);
  const toAmountNumber = Number(toAmount);

  const insufficientBalance = fromAmountNumber > balance;

  useEffect(() => {
    if (fromAmount === '') return;
    dispatch(setFromAmountAndCalculateToAmount(fromAmount));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenCurrency]);

  async function onClickMint() {
    if (!contracts.crowdsale) return;

    dispatch(showAwaitingModal(`Mint ${toAmountNumber.toPrecision(4)} Bustad for ${fromAmountNumber.toPrecision(4)} ${chosenCurrency.toUpperCase()}`));

    let tx;

    try {
      if (chosenCurrency === 'eth') {
        tx = await contracts.crowdsale.buyWithETH({ value: fromEther(fromAmountNumber) });
      } else {
        tx = await contracts.crowdsale.buyWithStableCoin(parseEther(fromAmount), chosenCurrencyContract!.address);
      }

      ReactGA.event({
        category: 'Mint',
        action: 'Start Minting Process'
      });
    } catch (e) {
      await dispatch(hideAwaitingModal());
      await dispatch(showRejectedModal());
      return;
    }

    await dispatch(hideAwaitingModal());
    await dispatch(showSubmittedModal({ txHash: tx.hash, showAddBustadToWalletButton: isMetaMask }));    
    await dispatch(addPendingTransaction({txHash: tx.hash, type: 'mint'}));

    await tx.wait();
    await dispatch(removePendingTransaction(tx.hash));
    await dispatch(showConfirmedModal());
    dispatch(fetchBalanceAsync());
    dispatch(fetchGovernanceDistributorShareAsync());
  }

  async function onClickAllow() {
    dispatch(showAwaitingModal(`Allow Bustad to access your ${chosenCurrency.toUpperCase()}`));

    let tx;

    try {
      tx = await chosenCurrencyContract!.approve(contracts.crowdsale.address, ethers.constants.MaxUint256);

      ReactGA.event({
        category: 'Mint',
        action: 'Start Allow Process'
      });
    } catch (e) {      
      await dispatch(hideAwaitingModal());
      await dispatch(showRejectedModal());
      return;
    }

    await dispatch(hideAwaitingModal());
    await dispatch(showSubmittedModal({ txHash: tx.hash }));
    await dispatch(addPendingTransaction({txHash: tx.hash, type: 'allow'}));

    await tx.wait();

    await dispatch(removePendingTransaction(tx.hash));
    await dispatch(showConfirmedModal());
    dispatch(fetchAllowanceAsync());
  }

  function onChangeFromAmount(value: string) {
    dispatch(setFromAmountAndCalculateToAmount(value));
  }

  function onChangeToAmount(value: string) {
    dispatch(setToAmountAndCalculateFromAmount(value));
  }

  function calculateGovTokensToReceive() {
    return Number((toAmountNumber * govDistributionRate + feeAmount).toFixed(2));
  }

  return (
    <MainBox title="Mint">
      <>
        <Input balance={balance} currencyName={chosenCurrency.toUpperCase()} amount={fromAmount} insufficientBalance={insufficientBalance} onChange={onChangeFromAmount} />
        <div className="mt-4">
          <Input balance={walletBalance.bustadToken} currencyName={BustadTokenSymbol} amount={toAmount} onChange={onChangeToAmount} govTokenToReceive={calculateGovTokensToReceive()} />
        </div>
        <div className="flex justify-end mt-2 mb-12 h-5">
          {isConnected && <InfoPopover />}
        </div>
        {
          !isConnected ?
            <ConnectButton wrapperClass='cursor-pointer py-4 rounded-2xl bg-Tuscanyapprox text-center' buttonClass='text-white font-bold text-2xl' /> :
            <ButtonGroup insufficientBalance={insufficientBalance} fromAmountNumber={fromAmountNumber} onClickMint={onClickMint} onClickAllow={onClickAllow} allowance={allowance} />
        }
      </>
    </MainBox>
  );
}
