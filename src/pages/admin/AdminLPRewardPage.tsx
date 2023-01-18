import { useNavigate } from "react-router-dom";
import { MainBox } from "../../components/MainBox";
import { PrimaryButtonSmall } from '../../components/PrimaryButton';
import { useEffect, Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectNetwork } from "../../features/wallet/walletSlice";
import { GetContractConfig } from "../../config";
import { useWalletConnection } from "../../hooks/walletConnectionHook";
import { CreateIncentiveForm, selectCreateInsentiveForm, setCreateIncentiveForm } from "../../features/admin/adminSlice";
import { deepCopy } from "../../utils/helper";
import { BigNumberish, ethers, utils } from "ethers";
import { getContracts } from "../../providers/web3.provider";
import { fromEther, toEther } from "../../utils/format";
import { fetchCreatedIncentivesAsync, postIncentiveAsync, selectIncentives } from "../../features/incentive/incentiveSlice";
import { IncentiveItem } from "./components/IncentiveItem";
import { StringToEpoch } from "../../utils/date";
import { SortIncentiveByDate } from "../../features/incentive/utils";
import RefreshIcon from "../../assets/icons/refresh.png";

export function AdminLPRewardPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const incentives = useAppSelector(selectIncentives);

  useEffect(() => {
    if (incentives.length === 0) {
      dispatch(fetchCreatedIncentivesAsync());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const incentivePoolList = [...incentives].sort(SortIncentiveByDate).map((data, i) => (
    <Fragment key={i}>
      <IncentiveItem incentive={data} />
    </Fragment>
  ));

  return (
    <MainBox title="LP Reward Program">
      <div>
        <h1 className="text-lg font-semibold mb-4">Active programs</h1>
        <div className="flex flex-col space-y-2 mb-4">
          {incentivePoolList}
        </div>
        <PrimaryButtonSmall text={"Create program"} onClick={() => {
          navigate('/admin/reward/create');
        }}></PrimaryButtonSmall>
      </div>
    </MainBox>
  );
}

export function AdminCreateLPRewardPage() {
  const dispatch = useAppDispatch();
  const network = useAppSelector(selectNetwork);  
  const contractConfig = GetContractConfig(network);
  const contracts = getContracts(network, true);
  const { address } = useWalletConnection();
  const createInsentiveForm = useAppSelector(selectCreateInsentiveForm);
  const [stakingContractEigAllowance, setStakingContractEigAllowance] = useState(0);

  useEffect(() => {
    contracts.govToken.allowance(address, contracts.uniswapStaker.address).then((allowance: BigNumberish) => {
      setStakingContractEigAllowance(Number(toEther(allowance)));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

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

  function setRewardAmount(value: string) {
    const formCopy: CreateIncentiveForm = deepCopy(createInsentiveForm);

    formCopy.rewardAmount = Number(value);
    dispatch(setCreateIncentiveForm(formCopy));
  }

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
    const startTimeEpoch = StringToEpoch(createInsentiveForm.startTime);
    const endTimeEpoch = StringToEpoch(createInsentiveForm.endTime);    

    await contracts.uniswapStaker.createIncentive({
      rewardToken: createInsentiveForm.rewardToken.value,
      pool: createInsentiveForm.pool.value,
      startTime: startTimeEpoch,
      endTime: endTimeEpoch,
      refundee: createInsentiveForm.refundee
    }, fromEther(createInsentiveForm.rewardAmount));

    const incentiveId = await generateIncentiveId([createInsentiveForm.rewardToken.value, createInsentiveForm.pool.value, startTimeEpoch, endTimeEpoch, createInsentiveForm.refundee]);    
    
    await dispatch(postIncentiveAsync({
      startTime: createInsentiveForm.startTime,
      endTime: createInsentiveForm.endTime,
      poolAddress: createInsentiveForm.pool.value,
      refundeeAddress: createInsentiveForm.refundee,
      rewardTokenAddress: createInsentiveForm.rewardToken.value,
      activelyEnded: false,
      onChainIncentiveId: incentiveId,
      rewardAmount: createInsentiveForm.rewardAmount
    }))    
  }

  async function onAllow() {
    await contracts.govToken.approve(contracts.uniswapStaker.address, fromEther(createInsentiveForm.rewardAmount));
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

  async function onRefreshAllowance() {
    const allowance = await contracts.govToken.allowance(address, contracts.uniswapStaker.address);
    setStakingContractEigAllowance(Number(toEther(allowance)));
  }

  return (
    <MainBox title="Admin Create LP Incentive">
      <div className="space-y-2">
        <div>
          <span>Amount</span>
          <div className="flex items-center">
            <input type="text" className="block" onChange={e => setRewardAmount(e.target.value)} value={createInsentiveForm.rewardAmount} />
            <img className="h-5 ml-2 cursor-pointer" src={RefreshIcon} onClick={onRefreshAllowance} alt="" />
          </div>
        </div>
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
          <PrimaryButtonSmall disabled={stakingContractEigAllowance >= createInsentiveForm.rewardAmount} text={"Allow"} onClick={onAllow}></PrimaryButtonSmall>
          <PrimaryButtonSmall disabled={stakingContractEigAllowance < createInsentiveForm.rewardAmount} text={"Create"} onClick={onCreate}></PrimaryButtonSmall>
          {/* <PrimaryButtonSmall text={"End"} onClick={onEnd}></PrimaryButtonSmall>
          <PrimaryButtonSmall text={"Get Reward info"} onClick={getRewardInfo}></PrimaryButtonSmall>
          <PrimaryButtonSmall text={"Unstake"} onClick={unStake}></PrimaryButtonSmall> */}
        </div>        
      </div>
    </MainBox>
  );
}