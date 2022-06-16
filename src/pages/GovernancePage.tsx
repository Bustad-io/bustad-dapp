import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Minter } from "../features/minter/minter";
import { connectWalletAsync, fetchBalanceAsync, fetchGovernanceDistributorShareAsync, selectAccount, selectWalletBalance, selectWalletGovernanceDistributionShare, selectWalletStatus } from "../features/wallet/walletSlice";
import { useEffect } from 'react';
import { useWeb3Connector } from "../hooks/web3Hook";

function GovernancePage() {
  const walletGovernanceDistributionShare = useAppSelector(selectWalletGovernanceDistributionShare);
  const walletStatus = useAppSelector(selectWalletStatus);
  const walletBalance = useAppSelector(selectWalletBalance);

  const { contracts } = useWeb3Connector();

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
      <span className="text-xl mb-6">Governance tokens to claim: {walletGovernanceDistributionShare}</span>
      <span className="text-xl mb-6">Governance tokens balance: {walletBalance.govToken}</span>
      <button onClick={onClickClaim} className="border bg-blue-300">Claim now!</button>
    </div>
  );
}

export default GovernancePage;
