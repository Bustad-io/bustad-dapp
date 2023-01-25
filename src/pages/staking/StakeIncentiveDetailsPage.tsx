import { useParams } from "react-router-dom";
import { MainBox } from "../../components/MainBox";
import { useIncentive } from "../../hooks/incentiveHook";
import { useWeb3Connector } from "../../hooks/web3Hook";
import { useWalletConnection } from '../../hooks/walletConnectionHook';
import { useLpPositions } from "../../hooks/lpPositionsHook";
import { getPositionByIncentive } from "./helpers";
import { postUnstakedAsync, postUserStakeAsync, selectUserStakes } from "../../features/incentive/incentiveSlice";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { StringToEpoch } from "../../utils/date";
import { utils } from "ethers";
import { toEther } from "../../utils/format";

function StakeIncentiveDetailsPage() {
  const { contracts } = useWeb3Connector();
  const { address } = useWalletConnection();
  const { incentives } = useIncentive();
  const { positions } = useLpPositions();
  const userStakes = useAppSelector(selectUserStakes);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const incentive = incentives.find(x => Number(x.id) === Number(id));
  const stakingContractAddress = contracts.uniswapStaker.address;
  const staked = userStakes.find(x => x.incentiveId === Number(id));
  const position = getPositionByIncentive(incentive!, positions);

  async function onStake() {
    await contracts.uniswapLpNft["safeTransferFrom(address,address,uint256,bytes)"](address, stakingContractAddress, position?.tokenId, incentive?.onChainIncentiveId);

    await dispatch(postUserStakeAsync({
      incentiveId: Number(id),
      tokenId: Number(position?.tokenId),
      userAddress: address!
    }));
  }

  async function onUnStake() {    
    const startTimeEpoch = StringToEpoch(incentive?.startTime!);
    const endTimeEpoch = StringToEpoch(incentive?.endTime!);

    const encodedUnstakeFunc = contracts.uniswapStaker.interface.encodeFunctionData("unstakeToken", [{
      rewardToken: incentive?.rewardTokenAddress,
      pool: incentive?.poolAddress,
      startTime: startTimeEpoch,
      endTime: endTimeEpoch,
      refundee: incentive?.refundeeAddress
    }, staked?.tokenId]);

    const encodedWithdrawFunc = contracts.uniswapStaker.interface.encodeFunctionData("withdrawToken", [staked?.tokenId, incentive?.refundeeAddress, []]);

    const calls = [
      utils.arrayify(encodedUnstakeFunc),
      utils.arrayify(encodedWithdrawFunc)
    ];

    await contracts.uniswapStaker.multicall(calls);    
    await dispatch(postUnstakedAsync({tokenId: Number(staked?.tokenId), incentiveId: Number(id)}));
  }

  async function onClaim() {
    await console.log(toEther(await contracts.uniswapStaker.callStatic.claimReward(contracts.govToken.address, address, 0)));
    await contracts.uniswapStaker.claimReward(contracts.govToken.address, address, 0);    
  }

  async function onReadEarned() {
    const startTimeEpoch = StringToEpoch(incentive?.startTime!);
    const endTimeEpoch = StringToEpoch(incentive?.endTime!);

    const a = await contracts.uniswapStaker.getRewardInfo({
      rewardToken: incentive?.rewardTokenAddress,
      pool: incentive?.poolAddress,
      startTime: startTimeEpoch,
      endTime: endTimeEpoch,
      refundee: incentive?.refundeeAddress
    }, Number(staked?.tokenId));
    console.log(toEther(a.reward));
  }

  return (
    <MainBox>
      <div className="dialog:px-14 my-4">
        <h1>Stake inventive details</h1>
        <div>{incentive?.poolAddress}</div>
        {!!staked ? <button onClick={onUnStake} className="bg-yellow-300 px-4 py-1 rounded">Un-stake</button> : <button onClick={onStake} className="bg-green-500 px-4 py-1 rounded">Stake</button>}
        <button onClick={onClaim} className="bg-green-500 px-4 py-1 rounded">Claim</button>
        <button onClick={onReadEarned} className="bg-blue-500 px-4 py-1 rounded">REad</button>
      </div>
    </MainBox>
  );
}

export default StakeIncentiveDetailsPage;