import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { hideRejectedModal, selectRejected } from './dialogSlice'
import { ReactComponent as Cross } from '../../assets/icons/cross.svg';


export default function RejectedDialog() {
  const dispatch = useAppDispatch();

  const modal = useAppSelector(selectRejected);

  function closeModal() {
    dispatch(hideRejectedModal());
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
              <Dialog.Panel className="rounded-2xl bg-Negroni px-10 pt-9 pb-6 flex flex-col items-center">
                  <Dialog.Title
                    as="h2"
                    className="text-2xl font-bold leading-6 text-gray-900 text-center"
                  >
                    Transaction rejected
                  </Dialog.Title>                  
                  <div className='mt-10'>
                    <Cross/>
                  </div>
                  <button
                    type="button"
                    className="mt-6 inline-flex justify-center font-semibold text-black "
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
