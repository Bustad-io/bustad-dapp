import { CurrencyChoice } from "../../currencyChoice/CurrencyChoice";
import { useRef } from 'react';
import { BustadTokenSymbol } from "../../../config";
import { LoadingTextComponent } from "../../../components/LoadingTextComponent";
import { useAppSelector } from "../../../app/hooks";
import { selectBalanceLoading } from "../../wallet/walletSlice";

export interface InputProp {
    fromAmount: string;
    onChange: (value: string) => void;
    insufficientBalance?: boolean;
    balance: number;
    currencyName: string;
    govTokenToReceive?: number;
}

export function Input({ fromAmount, onChange, insufficientBalance, currencyName, balance, govTokenToReceive = 0 }: InputProp) {
    const inputRef = useRef<any>(null);

    const balanceLoading = useAppSelector(selectBalanceLoading);

    function onFocusInput() {
        if(inputRef.current !== null) {
            inputRef.current.focus();
        }        
    }

    return (
        <div onClick={onFocusInput} className="flex items-center bg-white rounded-2xl w-120 h-23 px-3">
            <div>
                <CurrencyChoice isBustad={currencyName === BustadTokenSymbol}/>
                <span className="text-sm pl-2 mt-2 block">
                    <span className="font-semibold">Balance: </span>
                    <LoadingTextComponent loading={balanceLoading}>
                        <span>{balance.toPrecision(4)}</span>                    
                    </LoadingTextComponent>
                </span>
            </div>
            <div className="flex flex-col ml-6 relative">
                <input ref={inputRef} value={fromAmount} onChange={e => onChange(e.target.value)} type="text" className="focus:outline-none text-3xl" placeholder="0.0" />
                {insufficientBalance && <span className="absolute top-9 text-red-600 text-xs">insufficient balance </span>}
                {govTokenToReceive > 0 && <span className="absolute top-9 text-xs text-gray-700">+ {govTokenToReceive} Governance tokens </span>}
            </div>
        </div>)
}