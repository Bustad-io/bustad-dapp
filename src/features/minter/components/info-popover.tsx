import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectChosenCurrency } from '../../currencyChoice/currencyChoiceSlice';
import { selectEthPrice, selectEthPriceLoading, selectFeeAmount, selectMintingFee, selectRate, selectRateLoading } from '../minterSlice';
import { BustadTokenSymbol } from '../../../config';
import { LoadingTextComponent } from '../../../components/LoadingTextComponent';

export function InfoPopover() {
  const chosenCurrency = useAppSelector(selectChosenCurrency);
  const feeAmount = useAppSelector(selectFeeAmount);
  const mintingFee = useAppSelector(selectMintingFee);
  const ethPrice = useAppSelector(selectEthPrice);
  const ethPriceLoading = useAppSelector(selectEthPriceLoading);
  const rateLoading = useAppSelector(selectRateLoading);
  const rate = useAppSelector(selectRate);

  const bustadPrice = (chosenCurrency === 'eth' ? ethPrice : 1) * rate;

  return (
    <div className='relative'>
      <Popover>
        {({ open }) => (
          <>
            <div className='flex text-sm text-white relative'>
              <LoadingTextComponent loading={ethPriceLoading || rateLoading} useSpinner>
                {chosenCurrency === 'eth'
                  ? <span className='mr-2'>1 ETH = {bustadPrice.toFixed(0)}  {BustadTokenSymbol}</span>
                  : <span className='mr-2'>1 {chosenCurrency.toUpperCase()} = {bustadPrice.toPrecision(2)} {BustadTokenSymbol}</span>}
              </LoadingTextComponent>              
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
              <Popover.Panel className="bg-white text-black absolute rounded-md top-7 px-4 py-3 -left-4 sm:left-0">
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
