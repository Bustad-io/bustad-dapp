import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { CurrencyOption, selectChosenCurrency, selectChosenOption, setCurrency } from './currencyChoiceSlice';
import { ChevronDownIcon } from '@heroicons/react/solid'
import { BustadTokenSymbol } from '../../config';
import { ReactComponent as BustadIcon } from '../../assets/icons/BustadIcon.svg';
import { CurrencyChoiceModal } from './CurrencyChoiceModal';
import { useState } from 'react';

export interface CurrencyChoiceProp {  
  isBustad: boolean
}

export function CurrencyChoice({ isBustad }: CurrencyChoiceProp) {
  const [modal, showModal] = useState(false);

  const chosenCurrency = useAppSelector(selectChosenCurrency);
  const chosenOption = useAppSelector(selectChosenOption);

  function onOpenModal() {
    showModal(true);
  }

  function onCloseModal() {
    showModal(false);
  }

  const currencyDisplay = isBustad ? BustadTokenSymbol : chosenCurrency.toUpperCase();

  return (
    <>
      <div>
        <div className="relative">
          <button onClick={onOpenModal} disabled={isBustad} className="relative w-full bg-Negroni rounded-full flex items-center pl-3 py-2 disabled:cursor-auto cursor-pointer">
            {isBustad ? <BustadIcon className='relative left-1 w-4 mr-2' /> : <img src={chosenOption.img} alt="" className='w-6 max-h-6' />}
              <span className="font-semibold text-l ml-2 mr-1 min-w-[2.6rem]">{currencyDisplay}</span>                          
            {!isBustad ? <span className="flex items-center pr-2">
              <ChevronDownIcon
                className="h-6 w-6 text-black"
                aria-hidden="true"
              /> 
            </span> : <div className='w-8'></div>}
          </button>
        </div>
      </div>
      <CurrencyChoiceModal onClose={onCloseModal} show={modal} />
    </>
  );
}

//42px