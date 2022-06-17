import { Popover, Transition } from '@headlessui/react'
import { InformationCircleIcon } from '@heroicons/react/outline'
import { Fragment } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectChosenCurrency } from '../../currencyChoice/currencyChoiceSlice';
import { selectEthPrice, selectFeeAmount, selectMintingFee, selectRate } from '../minterSlice';

export function InfoPopover() {
  const chosenCurrency = useAppSelector(selectChosenCurrency);
  const feeAmount = useAppSelector(selectFeeAmount);
  const mintingFee = useAppSelector(selectMintingFee);
  const ethPrice = useAppSelector(selectEthPrice);
  const rate = useAppSelector(selectRate);

  const bustadPrice = (chosenCurrency === 'eth' ? ethPrice : 1) * rate * 100;

  return (
    <Popover>
        {({ open }) => (
          <>
          <div className='flex text-sm'>
            <span className='mr-2'>1 BUST = {bustadPrice} {chosenCurrency.toUpperCase()}</span>
          <Popover.Button
              className={''}
            >
              <InformationCircleIcon className='h-5 w-5'/>              
            </Popover.Button>
          </div>
            
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="bg-stone-500 text-white absolute">
                <div className="">
                  fee {mintingFee * 100}%
                </div>
                <div className="">
                  Fee amount {feeAmount.toFixed(2)} BUST
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
  )
}
