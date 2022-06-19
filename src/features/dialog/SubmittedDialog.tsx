import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { BustadTokenAddress, BustadTokenDecimal, BustadTokenRoundIcon, BustadTokenSymbol, explorerBaseUri } from '../../config';
import { hideSubmittedModal, selectSubmitted } from './dialogSlice'


export default function SubmittedDialog() {
  const dispatch = useAppDispatch();

  const modal = useAppSelector(selectSubmitted);

  function closeModal() {
    dispatch(hideSubmittedModal());
  }

  async function onAddToMetaMask() {
    await (window as any).ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: BustadTokenAddress,
          symbol: BustadTokenSymbol,
          decimals: BustadTokenDecimal,
          image: BustadTokenRoundIcon
        },
      },
    });
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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Transaction submitted
                </Dialog.Title>
                <div className="mt-2 mb-4">
                  <a href={`${explorerBaseUri}/tx/${modal.txHash}`} target="_blank" rel="noopener noreferrer" className='underline text-blue-700'>View on explorer</a>
                </div>
                <div className="flex flex-col">
                  <button
                    type="button"
                    className="mb-3 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={onAddToMetaMask}
                  >
                    Add Bustad to MetaMask
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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