import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CurrencyChoice } from "../currencyChoice/CurrencyChoice";
import { ConnectButton } from "../wallet/connectButton";
import { fetchAllowanceAsync, fetchBalanceAsync, selectWalletBalance, selectWalletStatus } from "../wallet/walletSlice";
import { useState, useEffect } from 'react';
import { fromEther, parseToNumber } from "../../utils/format";
import { useWeb3Connector } from '../../hooks/web3Hook';
import { calculateFromAmount, calculateToAmount } from './helper';
import { useWalletBalance } from "../../hooks/balanceHook";
import { useWalletAllowance } from "../../hooks/allowanceHook";
import { selectChosenCurrency } from "../currencyChoice/currencyChoiceSlice";

export function Minter() {
  const walletStatus = useAppSelector(selectWalletStatus);
  const walletBalance = useAppSelector(selectWalletBalance);
  const chosenCurrency = useAppSelector(selectChosenCurrency);

  const balance = useWalletBalance();
  const allowance = useWalletAllowance();

  const dispatch = useAppDispatch();

  const { contracts, chosenCurrencyContract } = useWeb3Connector();

  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");

  const [rate, setRate] = useState<number>(0);
  const [ethUsdPrice, setEthUsdPrice] = useState<number>(0);

  useEffect(() => {
    if (contracts.crowdsale) {
      contracts.crowdsale.callStatic.rate().then(res => setRate(parseToNumber(res)));
      contracts.crowdsale.callStatic.getLatestETHPrice().then(res => setEthUsdPrice(parseToNumber(res)));
    }
  }, [contracts.crowdsale]);

  useEffect(() => {
    onChangeFromAmount(fromAmount);
  }, [chosenCurrency]);

  const onClickMint = async () => {
    if (!contracts.crowdsale) return;

    let tx;

    if (chosenCurrency === 'eth') {
      tx = await contracts.crowdsale.buyWithETH({ value: fromEther(Number(fromAmount)) });
    } else {
      tx = await contracts.crowdsale.buyWithStableCoin(fromEther(Number(fromAmount)), chosenCurrencyContract!.address);
    }

    await tx.wait();
    alert('success!');
    dispatch(fetchBalanceAsync());
  }

  const onClickAllow = async () => {
    const tx = await chosenCurrencyContract!.approve(contracts.crowdsale.address, fromEther(Number(fromAmount)));

    await tx.wait();

    alert('success!');
    dispatch(fetchAllowanceAsync());
  }

  const onChangeFromAmount = (value: string) => {
    setFromAmount(value);

    const calculatedToAmount = calculateToAmount(Number(value), rate, chosenCurrency !== 'eth', ethUsdPrice);

    if (!isNaN(calculatedToAmount)) {
      setToAmount(calculatedToAmount.toFixed(2).toString());
    } else {
      setToAmount('');
    }
  }

  const onChangeToAmount = (value: string) => {    
    setToAmount(value);

    const calculatedFromAmount = calculateFromAmount(Number(value), rate, chosenCurrency !== 'eth', ethUsdPrice);

    if (!isNaN(calculatedFromAmount)) {
      setFromAmount(calculatedFromAmount.toString());
    } else {
      setFromAmount('');
    }
  }

  return (
    <div className="border-2 flex flex-col">
      <span className="text-left">
        Mint
      </span>
      <div className="flex flex-col mb-4">
        <div className="flex">
          <input value={fromAmount} onChange={e => onChangeFromAmount(e.target.value)} type="text" className="border" />
          <CurrencyChoice />
        </div>
        <span className="text-sm text-left pl-2">
          {chosenCurrency.toUpperCase()} balance: {balance}
        </span>
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
      {walletStatus !== "connected" ? <ConnectButton /> : allowance >= Number(fromAmount) ? <button onClick={onClickMint}>Mint</button> : <button onClick={onClickAllow}>Allow</button>}
    </div>
  );
}
