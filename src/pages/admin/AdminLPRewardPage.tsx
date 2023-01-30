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
import { BigNumberish, ethers } from "ethers";
import { getContracts } from "../../providers/web3.provider";
import { fromEther, toEther } from "../../utils/format";
import { fetchCreatedIncentivesAsync, postIncentiveAsync, selectIncentives } from "../../features/incentive/incentiveSlice";
import { IncentiveItem } from "./components/IncentiveItem";
import { StringToEpoch } from "../../utils/date";
import { generateIncentiveId, SortIncentiveByDate } from "../../features/incentive/utils";
import RefreshIcon from "../../assets/icons/refresh.png";
import { useWeb3Connector } from "../../hooks/web3Hook";
import UniswapV3PoolDef from '../../contracts/UniswapV3Pool.sol/UniswapV3Pool.json';
import { useContractConfig } from "../../hooks/contractConfigHook";
import { addPendingTransaction, hideAwaitingModal, removePendingTransaction, showAwaitingModal, showConfirmedModal, showRejectedModal, showSubmittedModal } from "../../features/dialog/dialogSlice";

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
  const { connectContractInstance } = useWeb3Connector();
  const { getContractByAddress } = useContractConfig();

  useEffect(() => {
    contracts.govToken.allowance(address, contracts.uniswapStaker.address).then((allowance: BigNumberish) => {
      setStakingContractEigAllowance(Number(toEther(allowance)));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    const formCopy = deepCopy(createInsentiveForm);

    formCopy.rewardToken = contractConfig.GovToken.address;
    formCopy.pool = contractConfig.UniswapPoolEthEig.address;
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

  function onChangePool(value: string) {
    const formCopy = deepCopy(createInsentiveForm);

    formCopy.pool = value;
    dispatch(setCreateIncentiveForm(formCopy));
  }

  async function onCreate() {
    let tx;

    dispatch(showAwaitingModal(`Create incentive program`));

    const startTimeEpoch = StringToEpoch(createInsentiveForm.startTime);
    const endTimeEpoch = StringToEpoch(createInsentiveForm.endTime);

    try {
      tx = await contracts.uniswapStaker.createIncentive({
        rewardToken: createInsentiveForm.rewardToken,
        pool: createInsentiveForm.pool,
        startTime: startTimeEpoch,
        endTime: endTimeEpoch,
        refundee: createInsentiveForm.refundee
      }, fromEther(createInsentiveForm.rewardAmount));
    } catch (e) {
      await dispatch(hideAwaitingModal());
      await dispatch(showRejectedModal());
      return;
    }

    await dispatch(hideAwaitingModal());
    await dispatch(showSubmittedModal({ txHash: tx.hash }));
    await dispatch(addPendingTransaction({ txHash: tx.hash, type: 'create program' }));

    await tx.wait();
    await dispatch(removePendingTransaction(tx.hash));
    await dispatch(showConfirmedModal());

    const incentiveId = await generateIncentiveId([createInsentiveForm.rewardToken, createInsentiveForm.pool, startTimeEpoch, endTimeEpoch, createInsentiveForm.refundee]);

    const uniswapPoolContract = connectContractInstance(createInsentiveForm.pool, UniswapV3PoolDef.abi, true);
    const poolToken0 = await uniswapPoolContract.token0();
    const poolToken1 = await uniswapPoolContract.token1();
    const poolFee = await uniswapPoolContract.fee();

    await dispatch(postIncentiveAsync({
      startTime: createInsentiveForm.startTime,
      endTime: createInsentiveForm.endTime,
      poolAddress: createInsentiveForm.pool,
      refundeeAddress: createInsentiveForm.refundee,
      rewardTokenAddress: createInsentiveForm.rewardToken,
      activelyEnded: false,
      onChainIncentiveId: incentiveId,
      rewardAmount: createInsentiveForm.rewardAmount,
      token0: poolToken0,
      token1: poolToken1,
      poolFee
    }))
  }

  async function onAllow() {
    let tx;

    dispatch(showAwaitingModal(`Allow contract`));

    try {
      tx = await contracts.govToken.approve(contracts.uniswapStaker.address, fromEther(createInsentiveForm.rewardAmount));
    } catch (e) {
      await dispatch(hideAwaitingModal());
      await dispatch(showRejectedModal());
      return;
    }

    await dispatch(hideAwaitingModal());
    await dispatch(showSubmittedModal({ txHash: tx.hash }));
    await dispatch(addPendingTransaction({ txHash: tx.hash, type: 'allow' }));

    await tx.wait();
    await dispatch(removePendingTransaction(tx.hash));
    await dispatch(showConfirmedModal());

    await onRefreshAllowance();
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
          <input type="text" className="block" defaultValue={getContractByAddress(createInsentiveForm.rewardToken)?.label} readOnly />
        </div>
        <div>
          <span>pool</span>
          <select className="block" value={createInsentiveForm.pool} onChange={e => onChangePool(e.target.value)}>
            <option value={contractConfig.UniswapPoolEthEig.address}>{contractConfig.UniswapPoolEthEig.label}</option>
            <option value={contractConfig.UniswapPoolBuscUsdc.address}>{contractConfig.UniswapPoolBuscUsdc.label}</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <PrimaryButtonSmall disabled={stakingContractEigAllowance >= createInsentiveForm.rewardAmount} text={"Allow"} onClick={onAllow}></PrimaryButtonSmall>
          <PrimaryButtonSmall disabled={stakingContractEigAllowance < createInsentiveForm.rewardAmount || createInsentiveForm.rewardAmount === 0} text={"Create"} onClick={onCreate}></PrimaryButtonSmall>
        </div>
      </div>
    </MainBox>
  );
}