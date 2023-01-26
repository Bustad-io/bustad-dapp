import { MainBox } from "../../components/MainBox";
import { useWeb3Connector } from "../../hooks/web3Hook";
import { Fragment } from 'react';
import { useWalletConnection } from "../../hooks/walletConnectionHook";
import { StakeIncentiveItem } from "./components/StakeIncentiveItem";
import { SortIncentiveByDate } from "../../features/incentive/utils";
import { generateIncentivePositionAllowance } from "./helpers";
import { selectIncentives, selectUserPositions, selectUserStakes } from "../../features/incentive/incentiveSlice";
import { useAppSelector } from "../../app/hooks";

function StakingPage() {
  const { contracts } = useWeb3Connector();
  const { address } = useWalletConnection();

  const positions = useAppSelector(selectUserPositions);
  const userStakes = useAppSelector(selectUserStakes);
  const incentives = useAppSelector(selectIncentives);

  const { allowedIncentives } = generateIncentivePositionAllowance(positions, incentives);
  const sortedIncentives = [...allowedIncentives].sort(SortIncentiveByDate);

  const stakedIncentive = incentives.filter(incentive => {
    return userStakes.some(userStake => incentive.id === userStake.incentiveId);
  });

  async function onClaim() {
    await contracts.uniswapStaker.claimReward(contracts.govToken.address, address, 0);
  }

  return (
    <MainBox>
      <div className="dialog:px-14 my-4">
        <div className="flex flex-col space-y-3">
          {sortedIncentives.map((data, index) => (
            <Fragment key={index}>
              <StakeIncentiveItem incentive={data} />
            </Fragment>
          ))
          }
          {stakedIncentive.map((data, index) => (
            <Fragment key={index}>
              <StakeIncentiveItem incentive={data} />
            </Fragment>
          ))
          }
          <button onClick={onClaim} className="bg-green-400">Claim</button>
        </div>
      </div>
    </MainBox>
  );
}

export default StakingPage;
