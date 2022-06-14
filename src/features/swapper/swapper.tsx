import { spawn } from "child_process";
import { CurrencyChoice } from "../currencyChoice/CurrencyChoice";
import { ConnectButton } from "../wallet/connectButton";

export function Swapper() {
  /* const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0; */

  const RenderInputComponent = (disabled: boolean) => {
    return <div className="flex">
      <input type="text" placeholder={!disabled ? 'amount' : ''} className="border" disabled={disabled}/>
      {!disabled ? <CurrencyChoice/> : <span className="text-sm flex pl-3 items-center flex-grow">BUST</span>}
    </div>;
  }

  return (
    <div className="border-2 flex flex-col">
      <span className="text-left">
        Mint
      </span>
      {RenderInputComponent(false)}
      {RenderInputComponent(true)}
      <ConnectButton/>
    </div>
  );
}
