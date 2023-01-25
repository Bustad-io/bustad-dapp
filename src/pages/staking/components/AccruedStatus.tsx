import { Incentive } from '../../../types/IncentiveType';
import { StringToEpoch } from '../../../utils/date';
import { useWeb3Connector } from '../../../hooks/web3Hook';
import { useUserStakes } from '../../../hooks/userStakesHook';
import { toEther } from '../../../utils/format';
import { useState } from 'react';
import { useEffect } from 'react';
import { useWalletConnection } from '../../../hooks/walletConnectionHook';

interface Props {
    incentive: Incentive
}

export function AccruedStatus({ incentive }: Props) {
    const { contracts } = useWeb3Connector();
    const { userStakes } = useUserStakes();
    const { isConnected, address } = useWalletConnection();
    const staked = userStakes.find(x => x.incentiveId === Number(incentive.id));
    const [accrued, setAccrued] = useState<number>(0);

    useEffect(() => {
        if (isConnected && address != null && staked) {
            (async () => {
                const startTimeEpoch = StringToEpoch(incentive?.startTime!);
                const endTimeEpoch = StringToEpoch(incentive?.endTime!);

                const a = await contracts.uniswapStaker.getRewardInfo({
                    rewardToken: incentive?.rewardTokenAddress,
                    pool: incentive?.poolAddress,
                    startTime: startTimeEpoch,
                    endTime: endTimeEpoch,
                    refundee: incentive?.refundeeAddress
                }, Number(staked?.tokenId));
                setAccrued(Number(toEther(a.reward)));
            })();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected, address, staked]);

    if(accrued > 0) {
        return (
            <div className='flex space-x-2'>
                <span className='text-[#40B66B] font-semibold text-xs'>Accrued</span>
                <div className='bg-[#40B66B] text-white font-semibold text-xs flex items-center px-2 rounded-lg'>{(accrued / 1000).toFixed(1)}K</div>
            </div>
        );
    }
    return <></>;
}