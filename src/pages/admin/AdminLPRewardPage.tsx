import { useNavigate } from "react-router-dom";
import { MainBox } from "../../components/MainBox";
import { PrimaryButtonSmall } from '../../components/PrimaryButton';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useAppSelector } from "../../app/hooks";
import { selectNetwork } from "../../features/wallet/walletSlice";
import { GetContractConfig } from "../../config";
import { useWalletConnection } from "../../hooks/walletConnectionHook";
import { selectCreateInsentiveForm, selectGeneratedIncentiveId, setCreateIncentiveForm, setGeneratedIncentiveId } from "../../features/admin/adminSlice";
import { deepCopy } from "../../utils/helper";
import { ethers, utils } from "ethers";
import { getContracts } from "../../providers/web3.provider";
import { fromEther, parseToNumber } from "../../utils/format";

export function AdminLPRewardPage() {
  const navigate = useNavigate();
  return (
    <MainBox>
      <div className="">
        <h1>Admin LP Reward</h1>
        <PrimaryButtonSmall text={"Create program"} onClick={() => {
          navigate('/admin/reward/create');
        }}></PrimaryButtonSmall>
      </div>
    </MainBox>
  );
}

export function AdminCreateLPRewardPage() {
  const dispatch = useDispatch();
  const network = useAppSelector(selectNetwork);
  const incentiveId = useAppSelector(selectGeneratedIncentiveId);
  const contractConfig = GetContractConfig(network);
  const contracts = getContracts(network, true);
  const { address } = useWalletConnection();
  const createInsentiveForm = useAppSelector(selectCreateInsentiveForm);

  useEffect(() => {
    const formCopy = deepCopy(createInsentiveForm);

    formCopy.rewardToken.value = contractConfig.GovToken.address;
    formCopy.rewardToken.label = contractConfig.GovToken.label;
    formCopy.pool.value = contractConfig.UniswapPoolEthEig.address;
    formCopy.pool.label = contractConfig.UniswapPoolEthEig.label;
    formCopy.refundee = address;

    dispatch(setCreateIncentiveForm(formCopy));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  function setStartTime(value: string) {
    const formCopy = deepCopy(createInsentiveForm);

    formCopy.startTime = value;
    dispatch(setCreateIncentiveForm(formCopy));
  }

  function setEndTime(value: string) {
    const formCopy = deepCopy(createInsentiveForm);

    formCopy.endTime = value;
    dispatch(setCreateIncentiveForm(formCopy));
  }

  function setRefundee(value: string) {
    const formCopy = deepCopy(createInsentiveForm);

    formCopy.refundee = value;
    dispatch(setCreateIncentiveForm(formCopy));
  }

  async function onCreate() {
    const startTimeEpoch = Date.parse(createInsentiveForm.startTime) / 1000;
    const endTimeEpoch = Date.parse(createInsentiveForm.endTime) / 1000;

    await contracts.uniswapStaker.createIncentive({
      rewardToken: createInsentiveForm.rewardToken.value,
      pool: createInsentiveForm.pool.value,
      startTime: startTimeEpoch,
      endTime: endTimeEpoch,
      refundee: createInsentiveForm.refundee
    }, fromEther(1000));

    const incentiveId = await generateIncentiveId([createInsentiveForm.rewardToken.value, createInsentiveForm.pool.value, startTimeEpoch, endTimeEpoch, createInsentiveForm.refundee]);
    //dispatch(setGeneratedIncentiveId(incentiveId));
    console.log(incentiveId);
  }

  async function onEnd() {
    const startTimeEpoch = Date.parse(createInsentiveForm.startTime) / 1000;
    const endTimeEpoch = Date.parse(createInsentiveForm.endTime) / 1000;

    await contracts.uniswapStaker.endIncentive({
      rewardToken: createInsentiveForm.rewardToken.value,
      pool: createInsentiveForm.pool.value,
      startTime: startTimeEpoch,
      endTime: endTimeEpoch,
      refundee: createInsentiveForm.refundee
    });
  }

  async function generateIncentiveId(arr: [string, string, number, number, string]) {
    return utils.defaultAbiCoder.encode(["address", "address", "uint", "uint", "address"], arr);
  }

  async function getRewardInfo() {
    const startTimeEpoch = Date.parse(createInsentiveForm.startTime) / 1000;
    const endTimeEpoch = Date.parse(createInsentiveForm.endTime) / 1000;

    const a = await contracts.uniswapStaker.getRewardInfo({
      rewardToken: createInsentiveForm.rewardToken.value,
      pool: createInsentiveForm.pool.value,
      startTime: startTimeEpoch,
      endTime: endTimeEpoch,
      refundee: createInsentiveForm.refundee
    }, 49451);

    console.log(parseToNumber(a.reward));
    console.log(parseToNumber(a.secondsInsideX128));
    console.log(a);
  }

  async function unStake() {
    const startTimeEpoch = Date.parse(createInsentiveForm.startTime) / 1000;
    const endTimeEpoch = Date.parse(createInsentiveForm.endTime) / 1000;

    const encodedUnstakeFunc = contracts.uniswapStaker.interface.encodeFunctionData("unstakeToken", [{
      rewardToken: createInsentiveForm.rewardToken.value,
      pool: createInsentiveForm.pool.value,
      startTime: startTimeEpoch,
      endTime: endTimeEpoch,
      refundee: createInsentiveForm.refundee
    }, 49451]);

    const encodedWithdrawFunc = contracts.uniswapStaker.interface.encodeFunctionData("withdrawToken", [49451, createInsentiveForm.refundee, []]);

    const calls = [
      utils.arrayify(encodedUnstakeFunc),
      utils.arrayify(encodedWithdrawFunc)
    ];

    await contracts.uniswapStaker.multicall(calls);
  }

  return (
    <MainBox title="Admin Create LP Incentive">
      <div className="space-y-2">
        <div>
          <span>startTime</span>
          <input type="datetime-local" className="block" onChange={e => setStartTime(e.target.value)} value={createInsentiveForm.startTime} />          
        </div>
        <div>
          <span>endTime</span>
          <input type="datetime-local" className="block" onChange={e => setEndTime(e.target.value)} value={createInsentiveForm.endTime} />          
        </div>
        <div>
          <span>refundee</span>
          <input type="text" className="block" value={createInsentiveForm.refundee} onChange={e => setRefundee(e.target.value)} />
          {!ethers.utils.isAddress(createInsentiveForm.refundee) && <div className="text-red-700">Invalid address</div>}
        </div>
        <div>
          <span>rewardToken</span>
          <input type="text" className="block" value={createInsentiveForm.rewardToken.label} readOnly />
        </div>
        <div>
          <span>pool</span>
          <input type="text" className="block" value={createInsentiveForm.pool.label} readOnly />
        </div>
        <div className="flex space-x-2">
          <PrimaryButtonSmall text={"Create"} onClick={onCreate}></PrimaryButtonSmall>
          <PrimaryButtonSmall text={"End"} onClick={onEnd}></PrimaryButtonSmall>
          <PrimaryButtonSmall text={"Get Reward info"} onClick={getRewardInfo}></PrimaryButtonSmall>
          <PrimaryButtonSmall text={"Unstake"} onClick={unStake}></PrimaryButtonSmall>
        </div>
        {!!incentiveId && incentiveId}
      </div>
    </MainBox>
  );
}