import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchBalanceAsync, fetchGovernanceDistributorShareAsync, selectBalanceLoading, selectWalletBalance, selectWalletGovernanceDistributionShare, selectWalletStatus } from "../features/wallet/walletSlice";
import { useEffect } from 'react';
import { useWeb3Connector } from "../hooks/web3Hook";
import { hidePendingModal, showConfirmedModal, showPendingModal, showRejectedModal, showSubmittedModal } from "../features/dialog/dialogSlice";
import { ConnectButton } from '../features/wallet/connectButton';
import { useWalletConnection } from "../hooks/walletConnectionHook";
import { MainBox } from "../components/MainBox";
import { PrimaryButton } from "../components/PrimaryButton";
import { WhiteSection } from "../components/WhiteSection";
import { IconLabelElement } from "../components/IconLabelElement";
import { ClipboardCheckIcon } from '@heroicons/react/outline';
import { CashIcon } from '@heroicons/react/outline';
import { formatNumberToSpaces } from "../utils/format";
import { GovTokenSymbol } from "../config";

function GovernancePage() {
  const walletGovernanceDistributionShare = useAppSelector(selectWalletGovernanceDistributionShare);
  const walletStatus = useAppSelector(selectWalletStatus);
  const walletBalance = useAppSelector(selectWalletBalance);
  const balanceLoading = useAppSelector(selectBalanceLoading);
  const { isConnected, isMetaMask } = useWalletConnection();

  const dispatch = useAppDispatch();

  const { contracts } = useWeb3Connector();

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
      tx = await contracts.govDist.claim();
    } catch (e) {
      await dispatch(hidePendingModal());
      await dispatch(showRejectedModal());
      return;
    }

    await dispatch(hidePendingModal());
    await dispatch(showSubmittedModal({ txHash: tx.hash, showAddGovToWalletButton: isMetaMask }));

    await tx.wait();
    await dispatch(showConfirmedModal());
    await dispatch(fetchGovernanceDistributorShareAsync());
    await dispatch(fetchBalanceAsync());
  }

  return <MainBox title="Governance">
    {isConnected ? <div className="flex flex-col">
      <div className="mb-4">
        <WhiteSection>
          <div className="flex flex-col">
            <span className="text-sm font-semibold mb-2">{GovTokenSymbol} balance</span>
            <div>
              <IconLabelElement label={balanceLoading ? '~' : formatNumberToSpaces(walletBalance.govToken, 2)}>
                <CashIcon className="h-5" />
              </IconLabelElement>
            </div>
          </div>
        </WhiteSection>
      </div>
      <div className="mb-20">
        <WhiteSection>
          <div className="flex flex-col">
            <span className="text-sm font-semibold mb-2">{GovTokenSymbol} to claim</span>
            <div>
              <IconLabelElement label={formatNumberToSpaces(walletGovernanceDistributionShare, 2)}>
                <ClipboardCheckIcon className="h-5" />
              </IconLabelElement>
            </div>
          </div>
        </WhiteSection>
      </div>
      <PrimaryButton text="Claim" disabled={!canClaim} onClick={onClickClaim} />
    </div>
      : <ConnectButton wrapperClass='cursor-pointer py-4 rounded-2xl bg-Tuscanyapprox text-center' buttonClass='text-white font-bold text-2xl px-10' />}
  </MainBox>;
}

export default GovernancePage;
