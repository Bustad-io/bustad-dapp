import { PrimaryButtonXSmall } from '../../../components/PrimaryButton';
import { useContractConfig } from '../../../hooks/contractConfigHook';
import { Incentive } from '../../../types/IncentiveType';
import { FormateDateString, StringToEpoch } from '../../../utils/date';
import { PoolLogoLabel } from './PoolLogoLabel';
import { ProgramActiveStatus } from './ProgramActiveStatus';
import { Disclosure, Transition } from '@headlessui/react';
import { useWeb3Connector } from '../../../hooks/web3Hook';
import { getPositionByIncentive } from '../helpers';
import { useLpPositions } from '../../../hooks/lpPositionsHook';
import { useAppDispatch } from '../../../app/hooks';
import { postUnstakedAsync, postUserStakeAsync } from '../../../features/incentive/incentiveSlice';
import { useWalletConnection } from '../../../hooks/walletConnectionHook';
import { useUserStakes } from '../../../hooks/userStakesHook';
import { AccruedStatus } from './AccruedStatus';
import { utils } from 'ethers';

interface Props {
    incentive: Incentive,

}

export function RewardProgramItems({ incentive }: Props) {
    const { contracts } = useWeb3Connector();
    const { address } = useWalletConnection();
    const { positions } = useLpPositions();
    const { userStakes } = useUserStakes();
    const { getContractByAddress } = useContractConfig();
    const dispatch = useAppDispatch();

    const poolContract = getContractByAddress(incentive.poolAddress);
    const position = getPositionByIncentive(incentive!, positions);
    const staked = userStakes.find(x => x.incentiveId === Number(incentive.id));

    const stakingContractAddress = contracts.uniswapStaker.address;

    async function onStake() {
        await contracts.uniswapLpNft["safeTransferFrom(address,address,uint256,bytes)"](address, stakingContractAddress, position?.tokenId, incentive?.onChainIncentiveId);

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

        const encodedWithdrawFunc = contracts.uniswapStaker.interface.encodeFunctionData("withdrawToken", [staked?.tokenId, incentive?.refundeeAddress, []]);

        const calls = [
            utils.arrayify(encodedUnstakeFunc),
            utils.arrayify(encodedWithdrawFunc)
        ];

        await contracts.uniswapStaker.multicall(calls);
        await dispatch(postUnstakedAsync({ tokenId: Number(staked?.tokenId), incentiveId: Number(incentive.id) }));
    }

    return (
        <div className='bg-white rounded-lg p-3'>
            <Disclosure as='div'>
                {({ open }) => (
                    <>
                        <Disclosure.Button as="div" className="flex flex-row justify-between items-center cursor-pointer">
                            <div className='flex flex-col space-y-1'>
                                <AccruedStatus incentive={incentive} />
                                <PoolLogoLabel poolLabel={poolContract?.label ?? ''} />
                            </div>
                            <div className='flex flex-col items-end space-y-1'>
                                <ProgramActiveStatus startDate={incentive.startTime} endDate={incentive.endTime} isActivelyEnded={incentive.activelyEnded} />
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
                            <Disclosure.Panel as="div" className='flex flex-row space-x-2 max-w-[235px] mt-5' static>
                                <PrimaryButtonXSmall disabled={!!staked} onClick={onStake} text='Stake' />
                                <PrimaryButtonXSmall disabled={!!!staked} onClick={onUnstake} text='Unstake' />                                
                            </Disclosure.Panel>
                        </Transition>
                    </>
                )}
            </Disclosure>
        </div>
    );
}