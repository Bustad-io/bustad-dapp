import { Transition } from "@headlessui/react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchAccountAsync, fetchGovernanceDistributorShareAsync, selectAccount, selectWalletGovernanceDistributionShare } from "../features/wallet/walletSlice";
import { useWalletConnection } from '../hooks/walletConnectionHook';

interface TabProp {
    to: string;
    text: string;
    showBadge: boolean;    
}

export function NavigationBar() {
    const dispatch = useAppDispatch();
    const {isConnected} = useWalletConnection();
    const walletGovernanceDistributionShare = useAppSelector(selectWalletGovernanceDistributionShare);
    const account = useAppSelector(selectAccount);    

    const showBadge = walletGovernanceDistributionShare >= 1;    

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

    function Tab({ to, text, showBadge = false }: TabProp) {    
        return (
            <div className="relative">
                <Transition                    
                    show={showBadge}
                    enter="transition ease-out duration-[300ms]"
                    enterFrom="transform opacity-0 translate-y-2"
                    enterTo="transform opacity-100 translate-y-0"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 translate-y-0"
                    leaveTo="transform opacity-0 translate-y-2"
                >
                    <Badge></Badge>
                </Transition>
                <NavLink className={({isActive}) => isActive ? 'text-black dark:text-white' : ''} to={to} >{text}</NavLink>
            </div>
        )
    }
    
    function Badge() {
        const walletGovernanceDistributionShare = useAppSelector(selectWalletGovernanceDistributionShare);
        return <div className="absolute text-2xs text-white bg-rose-500 dark:bg-red-500 rounded-full p-2 h-6 -right-3 -top-4 flex justify-center items-center font-bold">{walletGovernanceDistributionShare.toFixed(0)}</div>
    }

    return (
        <nav className="flex space-x-5 sm:space-x-9 text-[#757575] dark:text-[#838383] text-xl sm:text-[26px] font-medium">                        
            <Tab showBadge={false} text={'Mint'} to={'/mint'}/>
            <Tab showBadge={showBadge} text={'EIG'} to={'/eig'}/>
            <Tab showBadge={false} text={'Reward'} to={'/reward'}/>            
        </nav>
    )
}