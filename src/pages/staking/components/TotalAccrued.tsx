import { useWeb3Connector } from '../../../hooks/web3Hook';
import { formatNumberToSpaces } from '../../../utils/format';
import { useWalletConnection } from '../../../hooks/walletConnectionHook';
import { PrimaryButtonXSmall } from '../../../components/PrimaryButton';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addPendingTransaction, hideAwaitingModal, removePendingTransaction, showAwaitingModal, showConfirmedModal, showRejectedModal, showSubmittedModal } from '../../../features/dialog/dialogSlice';
import { fetchTotalAccruedAsync, selectTotalAccrued } from '../../../features/incentive/incentiveSlice';

export function TotalAccrued() {
    const { contracts } = useWeb3Connector();
    const { address } = useWalletConnection();    
    const dispatch = useAppDispatch();
    const totalAccrued = useAppSelector(selectTotalAccrued);
    

    async function onClaim() {
        let tx;

        dispatch(showAwaitingModal(`Claim ${formatNumberToSpaces(totalAccrued, 2)} EIG`));

        try {
            tx = await contracts.uniswapStaker.claimReward(contracts.govToken.address, address, 0);
        } catch(e) {
            dispatch(hideAwaitingModal());
            dispatch(showRejectedModal());
        }

        dispatch(hideAwaitingModal());
        dispatch(showSubmittedModal({ txHash: tx.hash }));
        dispatch(addPendingTransaction({txHash: tx.hash, type: 'claim'}));

        try {
            await tx.wait();
        } catch(e) {
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
            <div className='space-x-1'>
                <span className='font-medium text-sm'>Total accrued:</span>
                <span className='font-semibold text-base'>{formatNumberToSpaces(totalAccrued, 2)} EIG</span>
            </div>
            <PrimaryButtonXSmall text='Claim' onClick={onClaim} disabled={totalAccrued === 0} />                
        </div>)


}