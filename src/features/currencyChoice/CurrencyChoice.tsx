import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { CurrencyOption, selectChosenCurrency, selectChosenOption, setCurrency } from './currencyChoiceSlice';
import { ChevronDownIcon } from '@heroicons/react/solid'
import { BustadTokenSymbol } from '../../config';
import { ReactComponent as BustadIcon } from '../../assets/icons/BustadIcon.svg';
import { CurrencyChoiceModal } from './CurrencyChoiceModal';
import { useState } from 'react';

export interface CurrencyChoiceProp {
  balance: number;
  isBustad: boolean
}

export function CurrencyChoice({ balance, isBustad }: CurrencyChoiceProp) {
  const dispatch = useAppDispatch();

  const [modal, showModal] = useState(false);

  const chosenCurrency = useAppSelector(selectChosenCurrency);
  const chosenOption = useAppSelector(selectChosenOption);

  const onChange = (value: CurrencyOption) => {
    dispatch(setCurrency(value))
  }

  function onOpenModal() {
    showModal(true);
  }

  function onCloseModal() {
    showModal(false);
  }

  const currencyDisplay = isBustad ? BustadTokenSymbol : chosenCurrency.toUpperCase();

  return (
    <>
      <div className="w-40">
        <div className="relative">
          <button onClick={onOpenModal} disabled={isBustad} className="relative w-full bg-Negroni rounded-2xl flex items-center px-3 py-2 disabled:cursor-auto cursor-pointer">
            {isBustad ? <BustadIcon className='w-6 mr-3' /> : <img src={chosenOption.img} alt="" className='w-7 mr-3' />}
            <div className='relative top-1 flex flex-col items-start'>
              <span className="font-bold text-xl">{currencyDisplay}</span>
              <span className="text-2xs">Balance: {balance.toPrecision(4)}</span>
            </div>
            {!isBustad && <span className="absolute right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-6 w-6 text-black"
                aria-hidden="true"
              />
            </span>}
          </button>
        </div>
      </div>
      <CurrencyChoiceModal onClose={onCloseModal} show={modal} />
    </>
  );
}
