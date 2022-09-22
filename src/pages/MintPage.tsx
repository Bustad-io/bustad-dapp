import { Minter } from "../features/minter/minter";
import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { AnnouncementBox } from "../components/AnnouncementBox";
import { selectPendingTransactionList } from "../features/dialog/dialogSlice";
import { ExclamationIcon } from '@heroicons/react/outline'
import { useWeb3Connector } from "../hooks/web3Hook";

function MintPage() {
  const [announcement, showAnnouncement] = useState(false);
  const pendingTransactionList = useAppSelector(selectPendingTransactionList);

  const { networkName, correctChain } = useWeb3Connector();

  useEffect(() => {
    setTimeout(() => {
      showAnnouncement(true);
    }, 1000);
  }, []);

  return (
    <div className="relative">
      {true ? (
        <Transition
          className='mb-2 sm:absolute -top-12 sm:w-[520px]'
          show={announcement && pendingTransactionList.length === 0}
          enter="transition ease-out duration-[300ms]"
          enterFrom="transform opacity-0 translate-y-2"
          enterTo="transform opacity-100 translate-y-0"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 translate-y-0"
          leaveTo="transform opacity-0 translate-y-2"
        >
          <AnnouncementBox text={'Early participants will receive governance tokens, "Eigar".'} link="https://www.bustad.io/#eigar" bgColor={'bg-Anakiwa'}>
            <img src="https://app.bustad.io/logo/eigar_black.png" alt="Eigar token" className="h-6" />
          </AnnouncementBox>
        </Transition>
      ) :
        (
          <Transition
            className='mb-2 sm:absolute -top-12 sm:w-[520px]'
            show={announcement && pendingTransactionList.length === 0}
            enter="transition ease-out duration-[300ms]"
            enterFrom="transform opacity-0 translate-y-2"
            enterTo="transform opacity-100 translate-y-0"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 translate-y-0"
            leaveTo="transform opacity-0 translate-y-2"
          >
            <AnnouncementBox text={`Wrong network. Please switch to Ethereum ${networkName.toLocaleUpperCase()}.`} bgColor={'bg-red-500'} textStyle='text-white font-semibold'>
              <ExclamationIcon className="h-6 text-white" />
            </AnnouncementBox>
          </Transition>
        )}
      <Minter />
    </div>
  );
}

export default MintPage;
