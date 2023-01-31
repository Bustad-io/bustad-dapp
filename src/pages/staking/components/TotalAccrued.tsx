import { useWeb3Connector } from '../../../hooks/web3Hook';
import { formatNumberToSpaces } from '../../../utils/format';
import { useWalletConnection } from '../../../hooks/walletConnectionHook';
import { PrimaryButtonXSmall } from '../../../components/PrimaryButton';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addPendingTransaction, hideAwaitingModal, removePendingTransaction, showAwaitingModal, showConfirmedModal, showRejectedModal, showSubmittedModal } from '../../../features/dialog/dialogSlice';
import { fetchTotalAccruedAsync, selectAccruedPerIncentiveList, selectTotalAccrued } from '../../../features/incentive/incentiveSlice';

export function TotalAccrued() {
    const { contracts } = useWeb3Connector();
    const { address } = useWalletConnection();
    const dispatch = useAppDispatch();
    const totalAccrued = useAppSelector(selectTotalAccrued);
    const accruedPerIncentiveList = useAppSelector(selectAccruedPerIncentiveList);
    const accruedPerIncentiveSum = accruedPerIncentiveList.reduce((acc, currrent) => currrent.accrued + acc, 0);


    

    async function onClaim() {
        let tx;

        dispatch(showAwaitingModal(`Claim ${formatNumberToSpaces(totalAccrued, 2)} EIG`));

        try {
            tx = await contracts.uniswapStaker.claimReward(contracts.govToken.address, address, 0);
        } catch (e) {
            dispatch(hideAwaitingModal());
            dispatch(showRejectedModal());
        }

        dispatch(hideAwaitingModal());
        dispatch(showSubmittedModal({ txHash: tx.hash }));
        dispatch(addPendingTransaction({ txHash: tx.hash, type: 'claim' }));

        try {
            await tx.wait();
        } catch (e) {
            dispatch(removePendingTransaction(tx.hash));
            dispatch(showRejectedModal());
            return;
        }

        dispatch(removePendingTransaction(tx.hash));
        dispatch(showConfirmedModal());

        await dispatch(fetchTotalAccruedAsync());
    }

    return (
        <div className='flex flex-row bg-white items-center rounded-lg px-[10px] py-2 space-x-5 max-w-fit'>
            <div className='flex flex-col'>
                <span className='text-xs text-[#626262]'>Total staked: {formatNumberToSpaces(accruedPerIncentiveSum, 2)} EIG</span>
                <div className='space-x-1'>
                    <span className='font-medium text-sm'>Total unstaked:</span>
                    <span className='font-semibold text-base'>{formatNumberToSpaces(totalAccrued, 0)} EIG</span>
                </div>
            </div>
            <PrimaryButtonXSmall text='Claim' onClick={onClaim} disabled={totalAccrued === 0} />
        </div>)


}