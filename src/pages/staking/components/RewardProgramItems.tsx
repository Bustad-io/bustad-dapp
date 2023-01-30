import { PrimaryButtonXSmall } from '../../../components/PrimaryButton';
import { useContractConfig } from '../../../hooks/contractConfigHook';
import { Incentive } from '../../../types/IncentiveType';
import { DateNowEpoch, FormateDateString, StringToEpoch } from '../../../utils/date';
import { PoolLogoLabel } from './PoolLogoLabel';
import { ProgramActiveStatus } from './ProgramActiveStatus';
import { Disclosure, Transition } from '@headlessui/react';
import { useWeb3Connector } from '../../../hooks/web3Hook';
import { getPositionByIncentive } from '../helpers';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { postUnstakedAsync, postUserStakeAsync, selectUserStakes, selectUserPositions, fetchUserPositionsAsync, fetchTotalAccruedAsync, fetchAccruedPerIncentiveAsync } from '../../../features/incentive/incentiveSlice';
import { useWalletConnection } from '../../../hooks/walletConnectionHook';
import { AccruedStatus } from './AccruedStatus';
import { ReactComponent as Arrow } from '../../../assets/icons/Arrow_up_right.svg';
import { utils } from 'ethers';
import { addPendingTransaction, hideAwaitingModal, removePendingTransaction, showAwaitingModal, showConfirmedModal, showRejectedModal, showSubmittedModal } from '../../../features/dialog/dialogSlice';
import { NumberPostfixFormatter } from '../../../utils/format';

interface Props {
    incentive: Incentive,
}

export function RewardProgramItems({ incentive }: Props) {
    const { contracts } = useWeb3Connector();
    const { address } = useWalletConnection();
    const positions = useAppSelector(selectUserPositions);
    const { getContractByAddress } = useContractConfig();
    const dispatch = useAppDispatch();
    const userStakes = useAppSelector(selectUserStakes);
    const poolContract = getContractByAddress(incentive.poolAddress);
    const position = getPositionByIncentive(incentive!, positions);
    const staked = userStakes.find(x => x.incentiveId === Number(incentive.id));
    
    const isActive = StringToEpoch(incentive.startTime) < DateNowEpoch() && StringToEpoch(incentive.endTime) > DateNowEpoch();
    const isComingSoon = StringToEpoch(incentive.startTime) > DateNowEpoch();
    const isEnded = StringToEpoch(incentive.endTime) < DateNowEpoch() || incentive.activelyEnded;

    const stakingContractAddress = contracts.uniswapStaker.address;

    async function onStake() {
        let tx;

        dispatch(showAwaitingModal(`Stake on ${poolContract?.label} program`));

        try {
            tx = await contracts.uniswapLpNft["safeTransferFrom(address,address,uint256,bytes)"](address, stakingContractAddress, position?.tokenId, incentive?.onChainIncentiveId);
        } catch (e) {
            await dispatch(hideAwaitingModal());
            await dispatch(showRejectedModal());
            return;
        }

        await dispatch(hideAwaitingModal());
        await dispatch(showSubmittedModal({ txHash: tx.hash }));
        await dispatch(addPendingTransaction({txHash: tx.hash, type: 'stake'}));

        try {
            await tx.wait();
        } catch(e) {            
            dispatch(removePendingTransaction(tx.hash));
            dispatch(showRejectedModal());
            return;
        }
        
        await dispatch(removePendingTransaction(tx.hash));
        await dispatch(showConfirmedModal());

        await dispatch(postUserStakeAsync({
            incentiveId: Number(incentive.id),
            tokenId: Number(position?.tokenId),
            userAddress: address!
        }));
    }

    async function onUnstake() {
        const startTimeEpoch = StringToEpoch(incentive?.startTime!);
        const endTimeEpoch = StringToEpoch(incentive?.endTime!);

        const encodedUnstakeFunc = contracts.uniswapStaker.interface.encodeFunctionData("unstakeToken", [{
            rewardToken: incentive?.rewardTokenAddress,
            pool: incentive?.poolAddress,
            startTime: startTimeEpoch,
            endTime: endTimeEpoch,
            refundee: incentive?.refundeeAddress
        }, staked?.tokenId]);

        const encodedWithdrawFunc = contracts.uniswapStaker.interface.encodeFunctionData("withdrawToken", [staked?.tokenId, address, []]);

        const calls = [
            utils.arrayify(encodedUnstakeFunc),
            utils.arrayify(encodedWithdrawFunc)
        ];

        let tx;

        dispatch(showAwaitingModal(`Unstake from ${poolContract?.label} program`));

        try {
            tx = await contracts.uniswapStaker.multicall(calls);
        } catch(e) {
            dispatch(hideAwaitingModal());
            dispatch(showRejectedModal());
        }

        dispatch(hideAwaitingModal());
        dispatch(showSubmittedModal({ txHash: tx.hash }));
        dispatch(addPendingTransaction({txHash: tx.hash, type: 'unstake'}));

        try {
            await tx.wait();
        } catch(e) {            
            dispatch(removePendingTransaction(tx.hash));
            dispatch(showRejectedModal());
            return;
        }

        dispatch(removePendingTransaction(tx.hash));
        dispatch(showConfirmedModal());

        await dispatch(postUnstakedAsync({ tokenId: Number(staked?.tokenId), incentiveId: Number(incentive.id) }));
        await dispatch(fetchUserPositionsAsync());
        await dispatch(fetchTotalAccruedAsync());
        await dispatch(fetchAccruedPerIncentiveAsync());
    }

    const uniswapLink = () => {
        const token0 = getContractByAddress(incentive.token0)?.label === "ETH" ? "ETH" : incentive.token0;
        const token1 = getContractByAddress(incentive.token1)?.label === "ETH" ? "ETH" : incentive.token1;
        return `https://app.uniswap.org/#/add/${token0}/${token1}/${incentive.poolFee}`;
    }

    return (
        <div className='bg-white rounded-lg p-3'>
            <Disclosure as='div'>
                {() => (
                    <>
                        <Disclosure.Button as="div" className="flex flex-row justify-between items-center cursor-pointer">
                            <div className='flex flex-col space-y-1'>
                                <AccruedStatus incentive={incentive} />
                                <PoolLogoLabel poolLabel={poolContract?.label ?? ''} />
                                <span className='font-normal text-xs'>Reward pool: <span className='font-semibold'>{NumberPostfixFormatter(incentive.rewardAmount)} EIG</span></span>
                            </div>
                            <div className='flex flex-col items-end space-y-1'>
                                <ProgramActiveStatus isComingSoon={isComingSoon} isEnded={isEnded} isStarted={isActive} />
                                <span className='text-xs font-medium'>{FormateDateString(incentive.startTime)} - {FormateDateString(incentive.endTime)}</span>
                            </div>
                        </Disclosure.Button>
                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel as="div" className='flex flex-row space-x-2 max-w-[235px] mt-3' static>
                                {staked
                                    ? <PrimaryButtonXSmall onClick={onUnstake} text='Unstake' />
                                    : (position ? <PrimaryButtonXSmall disabled={!!staked || !isActive} onClick={onStake} text='Stake' /> : <a href={uniswapLink()} className='flex items-center space-x-[2px] cursor-pointer' target="_blank" rel="noopener noreferrer">
                                        <span className='text-sm text-stone-800 underline'>Add liquidity on Uniswap</span>
                                        <Arrow className='-top-[2px] relative' />
                                    </a>)}
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
        </div>
    );
} 