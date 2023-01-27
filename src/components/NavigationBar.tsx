import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchAccountAsync, fetchGovernanceDistributorShareAsync, selectAccount, selectWalletGovernanceDistributionShare } from "../features/wallet/walletSlice";
import { useWalletConnection } from '../hooks/walletConnectionHook';

/* function Badge() {
    const walletGovernanceDistributionShare = useAppSelector(selectWalletGovernanceDistributionShare);
    return <div className="absolute text-2xs text-white bg-rose-500 dark:bg-red-500 rounded-full p-2 h-6 -right-2 -top-4 flex justify-center items-center font-bold">{walletGovernanceDistributionShare.toFixed(0)}</div>
} */

export function NavigationBar() {
    const dispatch = useAppDispatch();
    const {isConnected} = useWalletConnection();
    const walletGovernanceDistributionShare = useAppSelector(selectWalletGovernanceDistributionShare);
    const account = useAppSelector(selectAccount);
    const location = useLocation();

    const isMintLocation = location.pathname.includes('/mint') || location.pathname === '/';

    const [, setIsMintTab] = useState(isMintLocation);

    //const showBadge = walletGovernanceDistributionShare >= 1;

    useEffect(() => {        
        setIsMintTab(isMintLocation);        
    }, [isMintLocation]);

    useEffect(() => {
        const runAsync = async () => {
            if (!isConnected) return;

            if (!account) {
                await dispatch(fetchAccountAsync());
            }

            await dispatch(fetchGovernanceDistributorShareAsync());
        }
        runAsync();
    }, [account, dispatch, isConnected, walletGovernanceDistributionShare]);

    return (
        <nav className="flex space-x-5 sm:space-x-9 text-[#757575] dark:text-[#838383] text-xl sm:text-[26px] font-medium">            
            <NavLink className={({isActive}) => isActive ? 'text-black dark:text-white' : ''} to={'/mint'} >Mint</NavLink>
            <NavLink className={({isActive}) => isActive ? 'text-black dark:text-white' : ''} to={'/eig'} >EIG</NavLink>
            <NavLink className={({isActive}) => isActive ? 'text-black dark:text-white' : ''} to={'/reward'} >Reward</NavLink>
        </nav>
    )
}