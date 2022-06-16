import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CurrencyChoice } from "../currencyChoice/CurrencyChoice";
import { ConnectButton } from "../wallet/connectButton";
import { connectWalletAsync, fetchAllowanceAsync, fetchBalanceAsync, selectWalletBalance, selectWalletStatus } from "../wallet/walletSlice";
import { useState, useEffect } from 'react';
import { fromEther, parseToNumber, parseUnits } from "../../utils/format";
import { useWeb3Connector } from '../../hooks/web3Hook';
import { calculateFromAmount, calculateToAmount } from './helper';
import { useWalletBalance } from "../../hooks/balanceHook";
import { useWalletAllowance } from "../../hooks/allowanceHook";
import { selectChosenCurrency } from "../currencyChoice/currencyChoiceSlice";
import { useCoinConfig } from '../../hooks/coinConfigHook';
import { parseEther } from "ethers/lib/utils";
import { ethers } from "ethers";
import PendingDialog from "../dialog/PendingDialog";
import { hidePendingModal, showPendingModal, showRejectedModal, showSubmittedModal } from "../dialog/dialogSlice";
import SubmittedDialog from "../dialog/SubmittedDialog";
import RejectedDialog from '../dialog/RejectedDialog';
import { fetchEthPriceAsync, fetchRateAsync, selectEthPrice, selectRate } from "./minterSlice";

export function Minter() {
  const walletStatus = useAppSelector(selectWalletStatus);
  const walletBalance = useAppSelector(selectWalletBalance);
  const chosenCurrency = useAppSelector(selectChosenCurrency);
  const rate = useAppSelector(selectRate);
  const ethPrice = useAppSelector(selectEthPrice);

  const coinConfig = useCoinConfig();
  const balance = useWalletBalance();
  const allowance = useWalletAllowance();

  const dispatch = useAppDispatch();

  const { contracts, chosenCurrencyContract } = useWeb3Connector();

  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");

  const fromAmountNumber = Number(fromAmount);
  const toAmountNumber = Number(toAmount);

  const insufficientBalance = fromAmountNumber > balance;

  useEffect(() => {
    const run = async () => {
      await dispatch(connectWalletAsync());
      await dispatch(fetchBalanceAsync());
      await dispatch(fetchAllowanceAsync());
      await dispatch(fetchRateAsync());
      await dispatch(fetchEthPriceAsync());
    }
    run();
  }, []);

  useEffect(() => {
    onChangeFromAmount(fromAmount);
  }, [chosenCurrency]);

  const onClickMint = async () => {
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

  const onClickAllow = async () => {
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

  const onChangeFromAmount = (value: string) => {
    setFromAmount(value);

    const calculatedToAmount = calculateToAmount(Number(value), rate, chosenCurrency !== 'eth', ethPrice);

    if (!isNaN(calculatedToAmount)) {
      setToAmount(calculatedToAmount.toFixed(2).toString());
    } else {
      setToAmount('');
    }
  }

  const onChangeToAmount = (value: string) => {
    setToAmount(value);

    const calculatedFromAmount = calculateFromAmount(Number(value), rate, chosenCurrency !== 'eth', ethPrice);

    if (!isNaN(calculatedFromAmount)) {
      setFromAmount(calculatedFromAmount.toString());
    } else {
      setFromAmount('');
    }
  }

  return (
    <>
      <div className="border-2 flex flex-col">
        <span className="text-left">
          Mint
        </span>
        <div className="flex flex-col mb-4">
          <div className="flex">
            <input value={fromAmount} onChange={e => onChangeFromAmount(e.target.value)} type="text" className="border" />
            <CurrencyChoice />
          </div>
          {insufficientBalance ? <span className="text-sm text-red-600 text-left pl-2">insufficient balance {balance} {chosenCurrency.toUpperCase()}</span> : <span className="text-sm text-left pl-2">
            {chosenCurrency.toUpperCase()} balance: {balance}
          </span>}
        </div>
        <div className="flex flex-col mb-4">
          <div className="flex">
            <input value={toAmount} onChange={e => onChangeToAmount(e.target.value)} type="text" className="border" />
            <span className="text-sm flex pl-3 items-center flex-grow">BUST</span>
          </div>
          <span className="text-sm text-left pl-2">
            BUST balance: {walletBalance.bustadToken}
          </span>
        </div>
        {walletStatus !== "connected" ? <ConnectButton /> : allowance >= fromAmountNumber ? <button disabled={insufficientBalance || fromAmountNumber === 0} className="disabled:opacity-40" onClick={onClickMint}>Mint</button> : <button className="disabled:opacity-40" disabled={insufficientBalance} onClick={onClickAllow}>Allow</button>}
      </div>
      <PendingDialog />
      <SubmittedDialog />
      <RejectedDialog />
    </>
  );
}
