import { MainBox } from "../../components/MainBox";
import { Fragment } from 'react';
import { useIncentive } from "../../hooks/incentiveHook";
import { SortIncentiveByDate } from "../../features/incentive/utils";
import { RewardProgramItems } from "./components/RewardProgramItems";
import { TotalAccrued } from './components/TotalAccrued';

function RewardPage() {
  const { incentives } = useIncentive();  
  const sortedIncentives = [...incentives].sort(SortIncentiveByDate);  

  return (
    <MainBox title="Reward program">
      <>
        <div className="space-y-2.5 mb-5">
          {sortedIncentives.map((data, i) => <Fragment key={i}><RewardProgramItems incentive={data} /></Fragment>)}
        </div>
        <TotalAccrued />
      </>
    </MainBox>
  );
}

export default RewardPage;
