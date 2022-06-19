import { useAppSelector } from "../app/hooks";
import { selectAccount } from "../features/wallet/walletSlice";

export function AccountButton() {
    const account = useAppSelector(selectAccount);
    const firstAccountPart = account?.slice(0, 6);
    const lastAccountPart = account?.slice(38, 42);    

    return <div>{firstAccountPart}...{lastAccountPart}</div>
}