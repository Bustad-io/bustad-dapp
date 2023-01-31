import { MainBox } from "../../components/MainBox";
import { Fragment, useState } from 'react';
import { SortIncentiveByDate } from "../../features/incentive/utils";
import { RewardProgramItems } from "./components/RewardProgramItems";
import { TotalAccrued } from './components/TotalAccrued';
import { useWalletConnection } from "../../hooks/walletConnectionHook";
import { ConnectButton } from "../../features/wallet/connectButton";
import { useEffect } from 'react';
import { useAppDispatch } from "../../app/hooks";
import { fetchAccruedPerIncentiveAsync, fetchCreatedIncentivesAsync, fetchTotalAccruedAsync, fetchUserPositionsAsync, fetchUserStakesAsync } from "../../features/incentive/incentiveSlice";
import { isAddress } from "ethers/lib/utils";
import Skeleton from 'react-loading-skeleton';
import { AnnouncementBox } from "../../components/AnnouncementBox";
import { PaginationBar } from "../../components/PaginationBar";
import { useIncentivePaged } from '../../hooks/incentivePagedHook';

function RewardPage() {  
  const { isConnected, address } = useWalletConnection();
  const { totalPages, currentPageNumber, pagedIncentives, onPageChange } = useIncentivePaged();
  const sortedIncentives = [...pagedIncentives].sort(SortIncentiveByDate);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!isConnected || address === null || !isAddress(address)) {
        return;
      }

      if (pagedIncentives.length === 0) {
        setLoading(true);
        await dispatch(fetchCreatedIncentivesAsync());
        setLoading(false);
      }

      await dispatch(fetchUserStakesAsync());
      await dispatch(fetchUserPositionsAsync());
      await dispatch(fetchTotalAccruedAsync());
      await dispatch(fetchAccruedPerIncentiveAsync());
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isConnected]);

  return (
    <div className="space-y-2 w-full">
      <MainBox title="Reward program">
        {isConnected
          ? <>
          <h2 className="text-white font-medium text-base mb-1">Stake/Unstake Uniswap LP NFT</h2>
            <div className="space-y-2.5 mb-5">
              {loading ? <Skeleton baseColor="#dbdbdb" count={4} /> : sortedIncentives.map((data, i) => <Fragment key={i}><RewardProgramItems incentive={data} /></Fragment>)}
              {(!loading && sortedIncentives.length === 0) && <div className="font-semibold border-2 border-dashed border-white rounded-lg px-3 py-3">No active program</div>}
              <PaginationBar currentPage={currentPageNumber} totalPages={totalPages} onPageChange={onPageChange}/>
            </div>
            <h2 className="text-white font-medium text-base mb-1">Claim Rewards</h2>
            <div className="flex flex-col space-y-1">
              <TotalAccrued />
              <span className="text-[#222222] text-xs pl-1">*You can only claim your unstaked positions</span>
            </div>
          </>
          : <ConnectButton wrapperClass='cursor-pointer py-4 rounded-2xl bg-Tuscanyapprox text-center' buttonClass='text-white font-bold text-2xl px-10' />}
      </MainBox>
      <AnnouncementBox bgColor={'bg-Anakiwa'} title='Learn more about the Reward program' text='Join in the Reward program and earn more EIG.' />
    </div>
  );
}

export default RewardPage;
