import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { explorerBaseUri } from '../../config';
import { hideSubmittedModal, selectSubmitted, selectSubmittedShowAddBustadToWalletButton, selectSubmittedShowAddGovToWalletButton } from './dialogSlice'
import { ReactComponent as SuccessIcon } from '../../assets/icons/SuccessIcon.svg';
import { addBustadToWallet, addGovTokenToWallet } from '../../providers/web3.provider';


export default function SubmittedDialog() {
  const dispatch = useAppDispatch();

  const modal = useAppSelector(selectSubmitted);
  const showAddBustadToWalletButton = useAppSelector(selectSubmittedShowAddBustadToWalletButton);
  const showAddGovToWalletButton = useAppSelector(selectSubmittedShowAddGovToWalletButton);

  function closeModal() {
    dispatch(hideSubmittedModal());
  }

  async function onAddBustadToMetaMask() {
    await addBustadToWallet();
  }

  async function onAddGovToMetaMask() {
    await addGovTokenToWallet();
  }

  return (
    <Transition appear show={modal.show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="rounded-2xl bg-Negroni px-10 py-9 flex flex-col items-center">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 text-gray-900 text-center"
                >
                  Transaction submitted
                </Dialog.Title>
                <div className="my-4">
                  <a href={`${explorerBaseUri}/tx/${modal.txHash}`} target="_blank" rel="noopener noreferrer" className='underline text-blue-700'>View on explorer</a>
                </div>
                <div className='animate-ping-once'>
                  <SuccessIcon/>
                </div>
                <div className="flex flex-col">
                  {showAddBustadToWalletButton && <button
                    type="button"
                    className="mb-3 mt-4 inline-flex justify-center rounded-xl bg-Coral px-6 py-2 font-medium text-white"
                    onClick={onAddBustadToMetaMask}
                  >
                    Add Bustad Coin to Wallet
                  </button>}
                  {showAddGovToWalletButton && <button
                    type="button"
                    className="mb-3 mt-4 inline-flex justify-center rounded-xl bg-Coral px-6 py-2 font-medium text-white"
                    onClick={onAddGovToMetaMask}
                  >
                    Add Eigar to Wallet
                  </button>}
                  <button
                    type="button"
                    className="mt-4 inline-flex justify-center font-semibold text-black"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
