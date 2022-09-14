import { Minter } from "../features/minter/minter";
import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { AnnouncementBox } from "../components/AnnouncementBox";
import { selectPendingTransactionList } from "../features/dialog/dialogSlice";

function MintPage() {
  const [announcement, showAnnouncement] = useState(false);
  const pendingTransactionList = useAppSelector(selectPendingTransactionList);

  useEffect(() => {
    setTimeout(() => {
      showAnnouncement(true);
    }, 1000);
  }, []);

  return (
    <div className="relative">
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
        <AnnouncementBox text={'Early participants will receive governance tokens, "Eigar".'} link="https://www.bustad.io/#eigar">          
          <img src="https://app.bustad.io/logo/eigar_black.png" alt="Eigar token" className="h-6" />
        </AnnouncementBox>
      </Transition>      
      <Minter />
    </div>
  );
}

export default MintPage;
