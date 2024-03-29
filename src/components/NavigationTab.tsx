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
            <NavLink className={({ isActive }) => isActive ? 'text-PrimaryHordeBlue bg-orange-300 dark:bg-white font-bold py-2 sm:py-3 px-3 sm:px-9 rounded-xl' : 'px-4 sm:px-8'} to={to} >{text}</NavLink>
        </div>
    )
}

function Badge() {
    const walletGovernanceDistributionShare = useAppSelector(selectWalletGovernanceDistributionShare);
    return <div className="absolute text-2xs text-white bg-rose-500 dark:bg-red-500 rounded-full p-2 h-6 -right-2 -top-4 flex justify-center items-center font-bold">{walletGovernanceDistributionShare.toFixed(0)}</div>
}

export function NavigationTab() {
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

    return (
        <nav className="bg-orange-50 dark:bg-PrimaryHordeBlue rounded-xl h-11 dark:text-white text-slate-700 sm:text-2xl flex items-center sm:w-80 sm:justify-between px-1 sm:px-0">
            <Tab text="Mint" to="/" showBadge={false}/>
            <Tab text="Governance" to="/governance" showBadge={showBadge} />
        </nav>
    )
}