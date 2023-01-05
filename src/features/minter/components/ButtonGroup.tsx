import { useAppSelector } from "../../../app/hooks";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { selectChosenCurrency } from "../../currencyChoice/currencyChoiceSlice";

export interface ButtonGroupProp {
  insufficientBalance: boolean;
  fromAmountNumber: Number;
  onClickMint: () => void;
  onClickAllow: () => void;
  allowance: Number;
}

export function ButtonGroup({ insufficientBalance, fromAmountNumber, onClickMint, onClickAllow, allowance }: ButtonGroupProp) {
  const chosenCurrency = useAppSelector(selectChosenCurrency);  

  return (
    <div className="flex flex-col">
      {chosenCurrency !== 'eth' &&
        <div className="flex mb-2">
          <div className="grow flex justify-center">
            <span className="font-bold text-sm text-white rounded-full bg-Tuscanyapprox h-7 w-7 flex justify-center items-center">1</span>
          </div>
          <div className="grow flex justify-center">
            <span className="font-bold text-sm text-white rounded-full bg-Tuscanyapprox h-7 w-7 flex justify-center items-center">2</span>
          </div>
        </div>}
      <div className="flex">
        {chosenCurrency === 'eth' ?
          <PrimaryButton text="Mint" disabled={insufficientBalance || fromAmountNumber === 0} onClick={onClickMint} /> :
          <>
            <div className="grow  mr-2">
              <PrimaryButton text="Allow" disabled={allowance >= fromAmountNumber} onClick={onClickAllow} />
            </div>
            <div className="grow">
              <PrimaryButton text="Mint" disabled={allowance < fromAmountNumber || insufficientBalance || fromAmountNumber === 0} onClick={onClickMint} />
            </div>
          </>
        }
      </div>
    </div>
  );
}