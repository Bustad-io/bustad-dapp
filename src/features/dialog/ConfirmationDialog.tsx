import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { hideConfirmedModal, selectConfirmed } from './dialogSlice'
import { ReactComponent as SuccessIcon } from '../../assets/icons/SuccessIcon.svg';

export default function ConfirmationDialog() {
  const dispatch = useAppDispatch();

  const modal = useAppSelector(selectConfirmed);

  function closeModal() {
    dispatch(hideConfirmedModal());
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
              <Dialog.Panel className="rounded-2xl bg-Negroni px-10 py-9 flex flex-col items-center max-w-md">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 text-gray-900 text-center"
                >
                  Transaction confirmed
                </Dialog.Title>
                <div className="mt-4 mb-5">
                    <p className="text-lg text-gray-900 text-center">
                      The transaction has been confirmed and added to the blockchain
                    </p>
                  </div>
                <div className='animate-ping-once'>
                  <SuccessIcon/>
                </div>
                <div className="flex flex-col">                  
                  <button
                    type="button"
                    className="mt-4 inline-flex justify-center font-semibold text-black "
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
