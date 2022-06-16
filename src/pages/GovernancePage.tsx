import { useAppDispatch, useAppSelector } from "../app/hooks";
import { connectWalletAsync, fetchBalanceAsync, fetchGovernanceDistributorShareAsync, selectWalletBalance, selectWalletGovernanceDistributionShare, selectWalletStatus } from "../features/wallet/walletSlice";
import { useEffect } from 'react';
import { useWeb3Connector } from "../hooks/web3Hook";

function GovernancePage() {
  const walletGovernanceDistributionShare = useAppSelector(selectWalletGovernanceDistributionShare);
  const walletStatus = useAppSelector(selectWalletStatus);
  const walletBalance = useAppSelector(selectWalletBalance);  

  const { contracts } = useWeb3Connector();

  const votingPower = (walletBalance.govToken/100000000 * 100).toFixed(5);

  const canClaim = walletGovernanceDistributionShare > 0;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const runAsync = async () => {
      if(walletStatus !== "connected") {
        await dispatch(connectWalletAsync());  
      }
      await dispatch(fetchGovernanceDistributorShareAsync());
      await dispatch(fetchBalanceAsync());
    }
    runAsync();
  }, []);

  const onClickClaim = async () => {
    const tx = await contracts.govDist.withdraw();
    await tx.wait();
    alert('success');
    await dispatch(fetchGovernanceDistributorShareAsync());
    await dispatch(fetchBalanceAsync());
  }

  return (
    <div className="flex flex-col">       
      <span className="text-xl mb-6">Governance tokens balance: {walletBalance.govToken}</span>
      <span className="text-xl mb-6">Your voting power: {votingPower} %</span>
      <span className="text-xl mb-6">Governance tokens to claim: {walletGovernanceDistributionShare}</span>
      <button disabled={!canClaim} onClick={onClickClaim} className="border bg-blue-300 disabled:opacity-40">Claim now!</button>
    </div>
  );
}

export default GovernancePage;
