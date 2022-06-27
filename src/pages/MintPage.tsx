import { AnnouncementBox } from "../components/AnnouncementBox";
import { Minter } from "../features/minter/minter";
import { BadgeCheckIcon } from '@heroicons/react/outline';
import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";

function MintPage() {
  const [announcement, showAnnouncement] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      showAnnouncement(true);
    }, 1000);
  }, []);

  return (
    <div className="relative">
      <Transition
        className='mb-2 absolute -top-12 w-[520px]'
        show={announcement}
        enter="transition ease-out duration-[300ms]"
        enterFrom="transform opacity-0 translate-y-2"
        enterTo="transform opacity-100 translate-y-0"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 translate-y-0"
        leaveTo="transform opacity-0 translate-y-2"
      >
        <AnnouncementBox text={'Early participants will receive governance tokens, "Eigar".'} link="https://bustad.io">
          <BadgeCheckIcon className="h-6" />
        </AnnouncementBox>
      </Transition>
      <Minter />
    </div>
  );
}

export default MintPage;
