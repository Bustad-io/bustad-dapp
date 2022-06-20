import { CurrencyChoice } from "../../currencyChoice/CurrencyChoice";
import { useLayoutEffect, useRef } from 'react';
import { BustadTokenSymbol } from "../../../config";

export interface InputProp {
    fromAmount: string;
    onChange: (value: string) => void;
    insufficientBalance?: boolean;
    balance: number;
    currencyName: string;    
}

export function Input({ fromAmount, onChange, insufficientBalance, currencyName, balance }: InputProp) {
    const inputRef = useRef<any>(null);

    function onFocusInput() {
        if(inputRef.current !== null) {
            inputRef.current.focus();
        }
        
    }


    return (
        <div onClick={onFocusInput} className="flex items-center bg-white rounded-2xl w-120 h-23 px-3">
            <CurrencyChoice balance={balance} isBustad={currencyName === BustadTokenSymbol}/>
            <div className="">
                <input ref={inputRef} value={fromAmount} onChange={e => onChange(e.target.value)} type="text" className="focus:outline-none ml-6 text-2xl" placeholder="0.0" />
            </div>
            {/* {insufficientBalance ? <span className="">insufficient balance {balance} {currencyName}</span> : <span className="">
                {currencyName} balance: {balance} <span onClick={onClickMax} className="">Max</span>
            </span>} */}
        </div>)
}