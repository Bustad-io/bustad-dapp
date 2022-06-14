import { useAppSelector } from "../../app/hooks";
import { CurrencyChoice } from "../currencyChoice/CurrencyChoice";
import { ConnectButton } from "../wallet/connectButton";
import { selectWalletStatus } from "../wallet/walletSlice";
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { ValidateDecimalInput } from "./validator";
import { Crowdsale } from '../../typechain/Crowdsale.d';
import { useEffect } from 'react';
import { Contract, ethers } from "ethers";

import CrowdsaleDef from '../../contracts/Crowdsale.sol/Crowdsale.json';
import { CrowdsaleAddress } from "../../config";
import { getProvider, getSigner } from "../wallet/walletAPI";
import { fromEther, parseToNumber } from "../../utils/format";

type inputCallback = (e: ChangeEvent<HTMLInputElement>) => void;

export function Minter() {
  const walletStatus = useAppSelector(selectWalletStatus);

  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");

  const [crowdsale, setCrowdsale] = useState<Contract>();

  useEffect(() => {
    if(walletStatus !== "connected") return;

    const signer = getSigner();    
    const crowdsaleContract = new ethers.Contract(CrowdsaleAddress, CrowdsaleDef.abi, signer);

    setCrowdsale(crowdsaleContract);
  }, [walletStatus]);


  const RenderInputComponent = (value: string, disabled: boolean, onChange?: inputCallback) => {    
    return <div className="flex">
      <input value={value} onChange={onChange} type="text" placeholder={!disabled ? 'amount' : ''} className="border" disabled={disabled}/>
      {!disabled ? <CurrencyChoice/> : <span className="text-sm flex pl-3 items-center flex-grow">BUST</span>}
    </div>;
  }

  const onClickMint = async () => {
    if(!crowdsale) return;

    const tx = await crowdsale.buyWithETH({ value: fromEther(Number(fromAmount)) });

    await tx.wait();
    alert('success!');
  }

  return (
    <div className="border-2 flex flex-col">
      <span className="text-left">
        Mint
      </span>
      {RenderInputComponent(fromAmount, false, (e) => setFromAmount(e.target.value))}
      {RenderInputComponent(toAmount, true, )}
      {walletStatus === "connected" ? <button onClick={onClickMint}>Mint</button> : <ConnectButton/>}      
    </div>
  );
}
