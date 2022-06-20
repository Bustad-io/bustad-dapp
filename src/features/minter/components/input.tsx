import { CurrencyChoice } from "../../currencyChoice/CurrencyChoice";
import { useRef } from 'react';
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
            <div className="flex flex-col ml-6 relative">
                <input ref={inputRef} value={fromAmount} onChange={e => onChange(e.target.value)} type="text" className="focus:outline-none text-2xl" placeholder="0.0" />
                {insufficientBalance && <span className="absolute top-8 text-red-600 text-xs">insufficient balance </span>
            }
            </div>
        </div>)
}