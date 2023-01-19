import { useParams } from "react-router-dom";
import { MainBox } from "../../components/MainBox";
import { useIncentive } from "../../hooks/incentiveHook";
import { useWeb3Connector } from "../../hooks/web3Hook";
import { useEffect } from 'react';
import { useWalletConnection } from '../../hooks/walletConnectionHook';
import { UseLpPositions } from "../../hooks/UseLpPositionsHook";
import { getPositionByIncentive } from "./helpers";

function StakeIncentiveDetailsPage() {
  const { contracts } = useWeb3Connector();
  const { address } = useWalletConnection();
  const { incentives } = useIncentive();
  const { positions } = UseLpPositions();
  const { id } = useParams();

  const incentive = incentives.find(x => Number(x.id) === Number(id));
  const stakingContractAddress = contracts.uniswapStaker.address;
  
  async function onStake() {
    const position = getPositionByIncentive(incentive!, positions);
    await contracts.uniswapLpNft["safeTransferFrom(address,address,uint256,bytes)"](address, stakingContractAddress, position?.tokenId, incentive?.onChainIncentiveId);    
  }

  return (
    <MainBox>
      <div className="dialog:px-14 my-4">
        <h1>Stake inventive details</h1>
        <div>{incentive?.poolAddress}</div>
        <button onClick={onStake} className="bg-green-500 px-4 py-1 rounded">Stake</button>
      </div>
    </MainBox>
  );
}

export default StakeIncentiveDetailsPage;
