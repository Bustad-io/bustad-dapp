import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { CurrencyOption, selectCurrencyOptions, setCurrency } from './currencyChoiceSlice';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import ReactGA from 'react-ga';

export interface CurrencyChoiceModalProp {  
  show: boolean;
  onClose: () => void
}

export function CurrencyChoiceModal({ show, onClose }: CurrencyChoiceModalProp) {
  const dispatch = useAppDispatch();
  
  const currencyOptions = useAppSelector(selectCurrencyOptions);

  function onChoose(value: CurrencyOption) {
    ReactGA.event({
      category: 'Mint',
      action: 'Select token',
      label: value.value
    });
    dispatch(setCurrency(value));
    onClose();
  }

  function renderOptions() {
    return currencyOptions.map(option => (
      <div key={option.value} onClick={() => onChoose(option)} className='flex justify-center py-7 hover:bg-PeachOrange cursor-pointer'>
        <div className='flex items-center w-36'>
          <img src={option.img} alt="" className='h-11 w-11' />
          <span className='text-3xl font-bold ml-6'>
            {option.value.toUpperCase()}
          </span>
      </div>
      </div>      
    )     
    )
  }  

  return (
    <>      
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white transition-all py-4">
                  <Dialog.Title
                    as="h2"
                    className="text-4xl font-bold text-black mb-6"
                  >
                    Select a token
                  </Dialog.Title>
                  {renderOptions()}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
