import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { disconnectWallet, selectAccount } from '../features/wallet/walletSlice';
import { useWalletConnection } from '../hooks/walletConnectionHook';
import { ConnectButton } from '../features/wallet/connectButton';

export function AccountButton() {
    const dispatch = useAppDispatch();

    const account = useAppSelector(selectAccount);
    const firstAccountPart = account?.slice(0, 6);
    const lastAccountPart = account?.slice(38, 42);
    const [copyConfirmation, showCopyConfirmation] = useState(false);

    const { isConnected } = useWalletConnection();

    function onCopyAddress() {
        navigator.clipboard.writeText(account!);
        showCopyConfirmation(true);
        setTimeout(() => showCopyConfirmation(false), 2500);
    }

    function onDisconnect() {
        dispatch(disconnectWallet());
    }

    return isConnected && !!account ? (
        <div>
            <Menu as="div" className="relative inline-block text-left">
                <div className='flex items-center'>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-orange-300 dark:bg-PrimaryHordeBlue px-9 py-2 text-sm font-medium dark:text-white text-DarkPaleBlue hover:bg-opacity-50">
                        {firstAccountPart}...{lastAccountPart}
                        <ChevronDownIcon
                            className="ml-2 -mr-1 h-5 w-5 text-DarkPaleBlue dark:text-violet-200 dark:hover:text-violet-100"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                    <Transition
                        className='top-10 absolute ml-4'
                        show={copyConfirmation}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <span className='text-PrimaryHordeBlue dark:text-white'>copied!</span>
                    </Transition>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={onCopyAddress}
                                        className={`${active ? 'bg-Coral text-white' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        Copy address
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={onDisconnect}
                                        className={`${active ? 'bg-Coral text-white' : 'text-gray-900'
                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        Disconnect
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    ) : (<ConnectButton buttonClass='text-white mr-2' wrapperClass='bg-Coral rounded-lg px-7 py-2 flex items-center cursor-pointer' showIcon/>)
}