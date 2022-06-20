import { Popover, Transition } from '@headlessui/react'
import { ReactComponent as InfoIcon } from '../../../assets/icons/infoIcon.svg';
import { Fragment } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectChosenCurrency } from '../../currencyChoice/currencyChoiceSlice';
import { selectEthPrice, selectFeeAmount, selectMintingFee, selectRate } from '../minterSlice';
import { BustadTokenSymbol } from '../../../config';

export function InfoPopover() {
  const chosenCurrency = useAppSelector(selectChosenCurrency);
  const feeAmount = useAppSelector(selectFeeAmount);
  const mintingFee = useAppSelector(selectMintingFee);
  const ethPrice = useAppSelector(selectEthPrice);
  const rate = useAppSelector(selectRate);

  const bustadPrice = (chosenCurrency === 'eth' ? ethPrice : 1) * rate;

  return (
    <div className='relative'>
      <Popover>
        {({ open }) => (
          <>
            <div className='flex text-sm text-white relative'>
              <span className='mr-2'>1 {BustadTokenSymbol} = {bustadPrice} {chosenCurrency.toUpperCase()}</span>
              <Popover.Button
                className={''}
              >
                <InfoIcon className='h-5 w-5 text-white' />
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
              <Popover.Panel className="bg-white text-black absolute rounded-md top-7 px-4 py-3">
                <div className="flex justify-between">
                  <span className='font-semibold'>Fee</span>
                  <span>{mintingFee * 100}%</span>
                </div>
                <div className="flex justify-between">
                  <span className='font-semibold mr-4'>Amount</span>
                  <span className='whitespace-nowrap'>{feeAmount.toFixed(2)} {BustadTokenSymbol}</span>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>

  )
}
