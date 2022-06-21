import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { hidePendingModal, selectPending } from './dialogSlice'
import { ReactComponent as Spinner } from '../../assets/icons/Spinner.svg';

export default function PendingDialog() {
  const dispatch = useAppDispatch();

  const pending = useAppSelector(selectPending);

  function closeModal() {
    dispatch(hidePendingModal());
  }

  return (
    <Transition appear show={pending.show} as={Fragment}>
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
                <Dialog.Panel className="rounded-2xl bg-Negroni px-10 pt-9 pb-12 flex flex-col items-center">
                  <Dialog.Title
                    as="h2"
                    className="text-2xl font-bold leading-6 text-gray-900 text-center"
                  >
                    Confirm in you wallet
                  </Dialog.Title>
                  <div className="mt-4 mb-10">
                    <p className="text-lg text-gray-900 font-medium text-center">
                    {pending.text}
                    </p>
                  </div>
                  <div className='animate-spin'>
                    <Spinner/>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}
