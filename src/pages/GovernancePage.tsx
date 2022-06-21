import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchBalanceAsync, fetchGovernanceDistributorShareAsync, selectWalletBalance, selectWalletGovernanceDistributionShare, selectWalletStatus } from "../features/wallet/walletSlice";
import { useEffect } from 'react';
import { useWeb3Connector } from "../hooks/web3Hook";
import { hidePendingModal, showPendingModal, showRejectedModal, showSubmittedModal } from "../features/dialog/dialogSlice";
import { ConnectButton } from '../features/wallet/connectButton';
import { useWalletConnection } from "../hooks/walletConnectionHook";
import { MainBox } from "../components/MainBox";
import { PrimaryButton } from "../components/PrimaryButton";

function GovernancePage() {
  const walletGovernanceDistributionShare = useAppSelector(selectWalletGovernanceDistributionShare);
  const walletStatus = useAppSelector(selectWalletStatus);
  const walletBalance = useAppSelector(selectWalletBalance);
  const { isConnected } = useWalletConnection();

  const dispatch = useAppDispatch();

  const { contracts } = useWeb3Connector();

  /* const votingPower = (walletBalance.govToken / 100000000 * 100).toFixed(5); */
  const canClaim = walletGovernanceDistributionShare > 0;

  useEffect(() => {
    const runAsync = async () => {
      if (walletStatus !== "connected") return;
      await dispatch(fetchGovernanceDistributorShareAsync());
      await dispatch(fetchBalanceAsync());
    }
    runAsync();
  }, [dispatch, walletStatus]);

  const onClickClaim = async () => {
    let tx;

    dispatch(showPendingModal(`Confirm to claim your governance tokens`));

    try {
      tx = await contracts.govDist.withdraw();
    } catch (e) {
      await dispatch(hidePendingModal());
      await dispatch(showRejectedModal());
      return;
    }

    await dispatch(hidePendingModal());
    await dispatch(showSubmittedModal(tx.hash));

    await tx.wait();
    alert('success');
    await dispatch(fetchGovernanceDistributorShareAsync());
    await dispatch(fetchBalanceAsync());
  }

  return isConnected ?
    (
      <MainBox title="Governance">
        <div className="flex flex-col">
          <span className="text-xl mb-6">Governance tokens balance: {walletBalance.govToken}</span>
          {/* <span className="text-xl mb-6">Your voting power: {votingPower} %</span> */}
          <span className="text-xl mb-6">Governance tokens to claim: {walletGovernanceDistributionShare}</span>        
          <PrimaryButton text="Claim" disabled={!canClaim} onClick={onClickClaim} />
        </div>
      </MainBox>      
    ) : (<ConnectButton />);
}

export default GovernancePage;
