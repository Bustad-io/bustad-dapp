import { Transition } from "@headlessui/react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchTotalAccruedAsync, selectTotalAccrued } from "../features/incentive/incentiveSlice";
import { fetchAccountAsync, fetchGovernanceDistributorShareAsync, selectAccount, selectWalletGovernanceDistributionShare } from "../features/wallet/walletSlice";
import { useWalletConnection } from '../hooks/walletConnectionHook';
import { NumberPostfixFormatter } from "../utils/format";

interface TabProp {
    to: string;
    text: string;
    badgeValue: number;    
}

export function NavigationBar() {
    const dispatch = useAppDispatch();
    const {isConnected} = useWalletConnection();
    const walletGovernanceDistributionShare = useAppSelector(selectWalletGovernanceDistributionShare);
    const totalAccrued = useAppSelector(selectTotalAccrued);
    const account = useAppSelector(selectAccount);    

    useEffect(() => {
        const runAsync = async () => {
            if (!isConnected) return;

            if (!account) {
                await dispatch(fetchAccountAsync());
            }

            await dispatch(fetchGovernanceDistributorShareAsync());
            await dispatch(fetchTotalAccruedAsync());
        }
        runAsync();
    }, [account, dispatch, isConnected, walletGovernanceDistributionShare]);

    function Tab({ to, text, badgeValue }: TabProp) {    
        return (
            <div className="relative">
                <Transition                    
                    show={badgeValue > 0}
                    enter="transition ease-out duration-[300ms]"
                    enterFrom="transform opacity-0 translate-y-2"
                    enterTo="transform opacity-100 translate-y-0"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 translate-y-0"
                    leaveTo="transform opacity-0 translate-y-2"
                >
                    <Badge value={badgeValue}></Badge>
                </Transition>
                <NavLink className={({isActive}) => isActive ? 'text-black dark:text-white' : ''} to={to} >{text}</NavLink>
            </div>
        )
    }
    
    function Badge({value}: {value: number}) {        
        return <div className="absolute text-2xs text-white bg-rose-500 dark:bg-red-500 rounded-full p-2 h-6 -right-5 -top-5 flex justify-center items-center font-bold">{NumberPostfixFormatter(value)}</div>
    }

    return (
        <nav className="flex space-x-5 sm:space-x-9 text-[#757575] dark:text-[#838383] text-xl sm:text-[26px] font-medium">                        
            <Tab badgeValue={0} text={'Mint'} to={'/mint'}/>
            <Tab badgeValue={walletGovernanceDistributionShare} text={'Claim'} to={'/claim'}/>
            <Tab badgeValue={totalAccrued} text={'Reward'} to={'/reward'}/>            
        </nav>
    )
}