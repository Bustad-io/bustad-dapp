import { useNavigate } from "react-router-dom";
import { MainBox } from "../../components/MainBox";
import { PrimaryButtonSmall } from '../../components/PrimaryButton';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useAppSelector } from "../../app/hooks";
import { selectNetwork } from "../../features/wallet/walletSlice";
import { GetContractConfig } from "../../config";
import { useWalletConnection } from "../../hooks/walletConnectionHook";
import { selectCreateInsentiveForm, setCreateIncentiveForm } from "../../features/admin/adminSlice";
import { deepCopy } from "../../utils/helper";
import { ethers } from "ethers";
import { getContracts } from "../../providers/web3.provider";
import { fromEther } from "../../utils/format";

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
    console.log(Date.parse(createInsentiveForm.startTime))
    await contracts.uniswapStaker.createIncentive({
      rewardToken: createInsentiveForm.rewardToken.value,
      pool: createInsentiveForm.pool.value,
      startTime: Date.parse(createInsentiveForm.startTime) / 1000,
      endTime: Date.parse(createInsentiveForm.endTime) / 1000,
      refundee: createInsentiveForm.refundee
    }, fromEther(1000));
  }

  return (
    <MainBox title="Admin Create LP Incentive">
      <div className="space-y-2">
        <div>
          <span>startTime</span>
          <input type="datetime-local" className="block" onChange={e => setStartTime(e.target.value)} value={createInsentiveForm.startTime} />
          {new Date(Date.now()) >= new Date(createInsentiveForm.startTime) && <span className="text-red-700">Must be in the future</span>}
        </div>
        <div>
          <span>endTime</span>
          <input type="datetime-local" className="block" onChange={e => setEndTime(e.target.value)} value={createInsentiveForm.endTime} />
          {new Date(Date.now()) >= new Date(createInsentiveForm.endTime) && <div className="text-red-700">Must be in the future</div>}
          {new Date(createInsentiveForm.startTime) >= new Date(createInsentiveForm.endTime) && <div className="text-red-700">Must after startTime</div>}
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
        <PrimaryButtonSmall text={"Create"} onClick={onCreate}></PrimaryButtonSmall>
      </div>
    </MainBox>
  );
}
