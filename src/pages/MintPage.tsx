import { useAppSelector } from "../app/hooks";
import { Swapper } from "../features/swapper/swapper";
import { selectAccount } from "../features/wallet/walletSlice";

function MintPage() {
  const account = useAppSelector(selectAccount);
  return (
    <div>
      <span className="text-sm">{account}</span>
      <Swapper/>
    </div>
  );
}

export default MintPage;
