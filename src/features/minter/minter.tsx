import { useAppSelector } from "../../app/hooks";
import { CurrencyChoice } from "../currencyChoice/CurrencyChoice";
import { ConnectButton } from "../wallet/connectButton";
import { selectWalletStatus } from "../wallet/walletSlice";
import { ChangeEvent, useState, useEffect } from 'react';
import { fromEther, parseToNumber } from "../../utils/format";
import { useWeb3Connector } from '../../hooks/web3Hook';
import { calculateFromAmount, calculateToAmount } from './helper';

type inputCallback = (e: ChangeEvent<HTMLInputElement>) => void;

export function Minter() {
  const walletStatus = useAppSelector(selectWalletStatus);

  const { crowdsale } = useWeb3Connector();

  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");

  const [rate, setRate] = useState<number>(0);
  const [ethUsdPrice, setEthUsdPrice] = useState<number>(0);

  useEffect(() => {
    if (!crowdsale) return;

    crowdsale.callStatic.rate().then(res => setRate(parseToNumber(res)));
    crowdsale.callStatic.getLatestETHPrice().then(res => setEthUsdPrice(parseToNumber(res)));

  }, [crowdsale]);

  const RenderInputComponent = (value: string, swappable: boolean, onChange?: inputCallback) => {
    return <div className="flex">
      <input value={value} onChange={onChange} type="text" className="border" />
      {!swappable ? <CurrencyChoice /> : <span className="text-sm flex pl-3 items-center flex-grow">BUST</span>}
    </div>;
  }

  const onClickMint = async () => {
    if (!crowdsale) return;

    const tx = await crowdsale.buyWithETH({ value: fromEther(Number(fromAmount)) });

    await tx.wait();
    alert('success!');
  }

  const onChangeFromAmount: inputCallback = (e) => {
    const value = e.target.value;
    
    setFromAmount(value);

    const calculatedToAmount = calculateToAmount(Number(value), rate, false, ethUsdPrice);

    if(!isNaN(calculatedToAmount)) {
      setToAmount(calculatedToAmount.toFixed(2).toString());
    } else {
      setToAmount('');
    }
  }

  const onChangeToAmount: inputCallback = (e) => {
    const value = e.target.value;
    
    setToAmount(value);

    const calculatedFromAmount = calculateFromAmount(Number(value), rate, false, ethUsdPrice);
    console.log('calculatedFromAmount', calculatedFromAmount)

    if(!isNaN(calculatedFromAmount)) {
      setFromAmount(calculatedFromAmount.toFixed(6).toString());
    } else {
      setFromAmount('');
    }
  }

  return (
    <div className="border-2 flex flex-col">
      <span className="text-left">
        Mint
      </span>
      {RenderInputComponent(fromAmount, false, onChangeFromAmount)}
      {RenderInputComponent(toAmount, true, onChangeToAmount)}
      {walletStatus === "connected" ? <button onClick={onClickMint}>Mint</button> : <ConnectButton />}
    </div>
  );
}
