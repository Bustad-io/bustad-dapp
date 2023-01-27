import { MainBox } from "../../components/MainBox";
import { Fragment, useState } from 'react';
import { SortIncentiveByDate } from "../../features/incentive/utils";
import { RewardProgramItems } from "./components/RewardProgramItems";
import { TotalAccrued } from './components/TotalAccrued';
import { useWalletConnection } from "../../hooks/walletConnectionHook";
import { ConnectButton } from "../../features/wallet/connectButton";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCreatedIncentivesAsync, fetchTotalAccruedAsync, fetchUserPositionsAsync, fetchUserStakesAsync, selectIncentives } from "../../features/incentive/incentiveSlice";
import { isAddress } from "ethers/lib/utils";
import Skeleton from 'react-loading-skeleton';

function RewardPage() {
  const incentives = useAppSelector(selectIncentives);
  const { isConnected, address } = useWalletConnection();
  const sortedIncentives = [...incentives].sort(SortIncentiveByDate);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!isConnected || address === null || !isAddress(address)) {
        return;
      }

      if (incentives.length === 0) {
        setLoading(true);        
        await dispatch(fetchCreatedIncentivesAsync());
        setLoading(false);
      }

      await dispatch(fetchUserStakesAsync());
      await dispatch(fetchUserPositionsAsync());
      await dispatch(fetchTotalAccruedAsync());
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isConnected]);


  return (
    <MainBox title="Reward program">
      {isConnected
        ? <>
          <div className="space-y-2.5 mb-5">
            {loading ? <Skeleton baseColor="#dbdbdb" count={4} /> : sortedIncentives.map((data, i) => <Fragment key={i}><RewardProgramItems incentive={data} /></Fragment>)}
          </div>
          <TotalAccrued />
        </>
        : <ConnectButton wrapperClass='cursor-pointer py-4 rounded-2xl bg-Tuscanyapprox text-center' buttonClass='text-white font-bold text-2xl px-10' />}
    </MainBox>
  );
}

export default RewardPage;
