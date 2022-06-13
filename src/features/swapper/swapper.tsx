import { CurrencyChoice } from "../currencyChoice/CurrencyChoice";

export function Swapper() {
  /* const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0; */

  const RenderInputComponent = () => {
    return <div className="flex">
      <input type="text" placeholder="amount" className="border" />
      <CurrencyChoice />
    </div>;
  }

  return (
    <div className="border-2 flex flex-col">
      <span className="text-left">
        Mint
      </span>
      {RenderInputComponent()}
      {RenderInputComponent()}
    </div>
  );
}
