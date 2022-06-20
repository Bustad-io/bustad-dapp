import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CurrencyChoice } from "../currencyChoice/CurrencyChoice";
import { ConnectButton } from "../wallet/connectButton";
import { connectWalletAsync, fetchAccountAsync, fetchAllowanceAsync, fetchBalanceAsync, selectWalletBalance, selectWalletStatus } from "../wallet/walletSlice";
import { useEffect } from 'react';
import { fromEther } from "../../utils/format";
import { useWeb3Connector } from '../../hooks/web3Hook';
import { useWalletBalance } from "../../hooks/balanceHook";
import { useWalletAllowance } from "../../hooks/allowanceHook";
import { selectChosenCurrency } from "../currencyChoice/currencyChoiceSlice";
import { useCoinConfig } from '../../hooks/coinConfigHook';
import { parseEther } from "ethers/lib/utils";
import { ethers } from "ethers";
import { hidePendingModal, showPendingModal, showRejectedModal, showSubmittedModal } from "../dialog/dialogSlice";
import { fetchEthPriceAsync, fetchMintingFeeAsync, fetchRateAsync, setFromAmountAndCalculateToAmount, selectFromAmount, selectToAmount, setToAmountAndCalculateFromAmount } from "./minterSlice";
import { InfoPopover } from './components/info-popover';
import { web3Modal } from "../../providers/web3.provider";
import { Input } from "./components/input";
import { BustadTokenSymbol } from "../../config";

export function Minter() {
  const walletStatus = useAppSelector(selectWalletStatus);
  const walletBalance = useAppSelector(selectWalletBalance);
  const chosenCurrency = useAppSelector(selectChosenCurrency);

  const coinConfig = useCoinConfig();
  const balance = useWalletBalance();
  const allowance = useWalletAllowance();

  const dispatch = useAppDispatch();

  const { contracts, chosenCurrencyContract } = useWeb3Connector();

  const fromAmount = useAppSelector(selectFromAmount);
  const toAmount = useAppSelector(selectToAmount);

  const fromAmountNumber = Number(fromAmount);
  const toAmountNumber = Number(toAmount);

  const insufficientBalance = fromAmountNumber > balance;

  useEffect(() => {
    const run = async () => {
      await dispatch(connectWalletAsync());
      await dispatch(fetchAccountAsync());
      await dispatch(fetchBalanceAsync());
      await dispatch(fetchAllowanceAsync());
      await dispatch(fetchRateAsync());
      await dispatch(fetchEthPriceAsync());
      await dispatch(fetchMintingFeeAsync());
    }

    if (web3Modal.cachedProvider) {
      run();
    }
  }, []);

  useEffect(() => {
    if (fromAmount === '') return;
    dispatch(setFromAmountAndCalculateToAmount(fromAmount));
  }, [chosenCurrency]);

  async function onClickMint() {
    if (!contracts.crowdsale) return;

    dispatch(showPendingModal(`Mint ${toAmountNumber} Bustad for ${fromAmountNumber} ${chosenCurrency.toUpperCase()}`));

    let tx;

    try {
      if (chosenCurrency === 'eth') {
        tx = await contracts.crowdsale.buyWithETH({ value: fromEther(fromAmountNumber) });
      } else {
        tx = await contracts.crowdsale.buyWithStableCoin(parseEther(fromAmount), chosenCurrencyContract!.address);
      }
    } catch (e) {
      await dispatch(hidePendingModal());
      await dispatch(showRejectedModal());
      return;
    }

    await dispatch(hidePendingModal());
    await dispatch(showSubmittedModal(tx.hash));

    await tx.wait();
    alert('success!');
    dispatch(fetchBalanceAsync());
  }

  async function onClickAllow() {
    dispatch(showPendingModal(`Allow Bustad to access your ${chosenCurrency.toUpperCase()}`));

    let tx;

    try {
      tx = await chosenCurrencyContract!.approve(contracts.crowdsale.address, ethers.utils.parseUnits(fromAmount, coinConfig!.decimal));
    } catch (e) {
      await dispatch(hidePendingModal());
      await dispatch(showRejectedModal());
      return;
    }

    await dispatch(hidePendingModal());
    await dispatch(showSubmittedModal(tx.hash));

    await tx.wait();

    alert('success!');
    dispatch(fetchAllowanceAsync());
  }

  function onChangeFromAmount(value: string) {
    dispatch(setFromAmountAndCalculateToAmount(value));
  }

  function onChangeToAmount(value: string) {
    dispatch(setToAmountAndCalculateFromAmount(value));
  }

  return (
    <div className="flex flex-col bg-Coral rounded-2xl py-4 px-5">
      <span className="text-left text-3xl text-white font-bold mb-10">
        Mint
      </span>      
      <Input balance={balance} currencyName={chosenCurrency.toUpperCase()} fromAmount={fromAmount} insufficientBalance={insufficientBalance} onChange={onChangeFromAmount}/>
      <div className="mt-4">
        <Input balance={walletBalance.bustadToken} currencyName={BustadTokenSymbol} fromAmount={toAmount} onChange={onChangeToAmount}/>        
      </div>
      <div className="flex justify-end mt-2">
        <InfoPopover />
      </div>
      {walletStatus !== "connected" ? <ConnectButton /> : allowance >= fromAmountNumber ? <button disabled={insufficientBalance || fromAmountNumber === 0} className="disabled:opacity-40" onClick={onClickMint}>Mint</button> : <button className="disabled:opacity-40" disabled={insufficientBalance} onClick={onClickAllow}>Allow</button>}
    </div>
  );
}
