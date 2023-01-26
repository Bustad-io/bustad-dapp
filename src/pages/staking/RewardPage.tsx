import { MainBox } from "../../components/MainBox";
import { Fragment } from 'react';
import { useIncentive } from "../../hooks/incentiveHook";
import { SortIncentiveByDate } from "../../features/incentive/utils";
import { RewardProgramItems } from "./components/RewardProgramItems";
import { TotalAccrued } from './components/TotalAccrued';
import { useWalletConnection } from "../../hooks/walletConnectionHook";
import { ConnectButton } from "../../features/wallet/connectButton";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUserPositionsAsync, fetchUserStakesAsync, selectUserPositions, selectUserStakes } from "../../features/incentive/incentiveSlice";
import { isAddress } from "ethers/lib/utils";

function RewardPage() {
  const { incentives } = useIncentive();  
  const { isConnected, address } = useWalletConnection();
  const userStakes = useAppSelector(selectUserStakes);
  const positions = useAppSelector(selectUserPositions);
  const sortedIncentives = [...incentives].sort(SortIncentiveByDate);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      if(!isConnected || address === null || !isAddress(address)) {
        return;
      }

      if (userStakes.length === 0) {        
        await dispatch(fetchUserStakesAsync(address));
      }

      if(positions.length === 0) {
        await dispatch(fetchUserPositionsAsync());
      }
    })();    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isConnected]);


  return (
    <MainBox title="Reward program">
      { isConnected ? <>
        <div className="space-y-2.5 mb-5">
          {sortedIncentives.map((data, i) => <Fragment key={i}><RewardProgramItems incentive={data} /></Fragment>)}
        </div>
        <TotalAccrued />
      </> : <ConnectButton wrapperClass='cursor-pointer py-4 rounded-2xl bg-Tuscanyapprox text-center' buttonClass='text-white font-bold text-2xl px-10' />}
    </MainBox>
  );
}

export default RewardPage;