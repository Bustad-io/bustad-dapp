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

export function Minter() {
  const walletStatus = useAppSelector(selectWalletStatus);
  const walletBalance = useAppSelector(selectWalletBalance);
  const chosenCurrency = useAppSelector(selectChosenCurrency);

  const coinConfig = useCoinConfig();
  const balance = useWalletBalance();
  const allowance = useWalletAllowance();

  const dispatch = useAppDispatch();

  const { contracts, chosenCurrencyContract } = useWeb3Connector();

  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");

  const [rate, setRate] = useState<number>(0);
  const [ethUsdPrice, setEthUsdPrice] = useState<number>(0);

  const insufficientBalance = Number(fromAmount) > balance;

  useEffect(() => {
    if (contracts.crowdsale) {
      contracts.crowdsale.callStatic.rate().then(res => setRate(parseToNumber(res)));
      contracts.crowdsale.callStatic.getLatestETHPrice().then(res => setEthUsdPrice(parseToNumber(res)));
    }
  }, [contracts.crowdsale]);

  useEffect(() => {  
    dispatch(connectWalletAsync());    
  }, []);

  useEffect(() => {
    onChangeFromAmount(fromAmount);
  }, [chosenCurrency]);

  const onClickMint = async () => {
    if (!contracts.crowdsale) return;

    let tx;

    if (chosenCurrency === 'eth') {
      tx = await contracts.crowdsale.buyWithETH({ value: fromEther(Number(fromAmount)) });
    } else {      
      tx = await contracts.crowdsale.buyWithStableCoin(parseEther(fromAmount), chosenCurrencyContract!.address);
    }

    await tx.wait();
    alert('success!');
    dispatch(fetchBalanceAsync());
  }

  const onClickAllow = async () => {    
    const tx = await chosenCurrencyContract!.approve(contracts.crowdsale.address, parseUnits(fromAmount, coinConfig!.decimal));

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
        {insufficientBalance ? <span className="text-sm text-red-600 text-left pl-2">insufficient balance {balance} {chosenCurrency.toUpperCase()}</span>  :<span className="text-sm text-left pl-2">
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
      {walletStatus !== "connected" ? <ConnectButton /> : allowance >= Number(fromAmount) ? <button disabled={insufficientBalance} className="disabled:opacity-40" onClick={onClickMint}>Mint</button> : <button className="disabled:opacity-40" disabled={insufficientBalance} onClick={onClickAllow}>Allow</button>}
    </div>
  );
}
