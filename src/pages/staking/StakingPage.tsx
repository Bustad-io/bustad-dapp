import { MainBox } from "../../components/MainBox";
import { useWeb3Connector } from "../../hooks/web3Hook";
import { Fragment } from 'react';
import { useWalletConnection } from "../../hooks/walletConnectionHook";
import { useIncentive } from "../../hooks/incentiveHook";
import { StakeIncentiveItem } from "./components/StakeIncentiveItem";
import { SortIncentiveByDate } from "../../features/incentive/utils";
import { UseLpPositions } from "../../hooks/UseLpPositionsHook";
import { generateIncentivePositionAllowance } from "./helpers";

function StakingPage() {
  const { contracts } = useWeb3Connector();
  const { address } = useWalletConnection();

  const { incentives } = useIncentive();
  const { positions } = UseLpPositions();    

  const {allowedIncentives} = generateIncentivePositionAllowance(positions, incentives);
  const sortedIncentives = [...allowedIncentives].sort(SortIncentiveByDate);  

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

          {/* {positions.map((data, index) => (
            <button onClick={() => onClick(data.tokenId)} className="bg-white" key={index}>{`${data.token0Label}/${data.token1Label} ${data.fee}% - ${data.tokenId}`}</button>
          ))}  */}
          <button onClick={onClaim} className="bg-green-400">Claim</button>
        </div>
      </div>
    </MainBox>
  );
}

export default StakingPage;
