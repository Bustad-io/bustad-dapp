import { Navigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { MainBox } from "../../../components/MainBox";
import { PrimaryButtonSmall } from "../../../components/PrimaryButton";
import { endIncentiveAsync, selectIncentives } from "../../../features/incentive/incentiveSlice";
import { useContractConfig } from "../../../hooks/contractConfigHook";
import { useWeb3Connector } from "../../../hooks/web3Hook";
import { StringToEpoch } from "../../../utils/date";

export function AdminIncentiveDetailPage() {
  const { id } = useParams();
  const incentives = useAppSelector(selectIncentives);
  const { getContractByAddress } = useContractConfig();  
  const { contracts } = useWeb3Connector();
  const dispatch = useAppDispatch();

  const incentive = incentives.find(x => Number(x.id) === Number(id));

  if (!incentive) {
    return <Navigate to={"/"} replace></Navigate>
  }

  const incentivePoolLabel = getContractByAddress(incentive?.poolAddress)?.label;

  const startTimeFormatted = `${new Date(incentive?.startTime).toLocaleDateString()} ${new Date(incentive?.startTime).toLocaleTimeString([], { timeStyle: 'short' })}`
  const endTimeFormatted = `${new Date(incentive?.endTime).toLocaleDateString()} ${new Date(incentive.endTime).toLocaleTimeString([], { timeStyle: 'short' })}`

  const startTimeEpoch = StringToEpoch(incentive?.startTime!);
  const endTimeEpoch = StringToEpoch(incentive?.endTime!);

  async function onEnd() {    
    await contracts.uniswapStaker.endIncentive({
      rewardToken: incentive?.rewardTokenAddress,
      pool: incentive?.poolAddress,
      startTime: startTimeEpoch,
      endTime: endTimeEpoch,
      refundee: incentive?.refundeeAddress
    });
    await dispatch(endIncentiveAsync(Number(id)!));
  }

  return (
    <MainBox title="Program details">
      <div>
        {incentive.activelyEnded && <div className="text-red-500 text-lg font-semibold">Ended</div>}
        <div>{incentivePoolLabel}</div>
        <div>{startTimeFormatted}</div>
        <div>{endTimeFormatted}</div>
        <PrimaryButtonSmall disabled={endTimeEpoch > Date.now()} text={"End"} onClick={onEnd}></PrimaryButtonSmall>
      </div>
    </MainBox>
  );
}