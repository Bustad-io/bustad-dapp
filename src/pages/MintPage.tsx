import { useAppSelector } from "../app/hooks";
import { Minter } from "../features/minter/minter";
import { selectAccount } from "../features/wallet/walletSlice";

function MintPage() {
  const account = useAppSelector(selectAccount);
  return (
    <div>
      <span className="text-sm">{account}</span>
      <Minter/>
    </div>
  );
}

export default MintPage;
