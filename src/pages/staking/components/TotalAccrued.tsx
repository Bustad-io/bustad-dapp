import { useWeb3Connector } from '../../../hooks/web3Hook';
import { formatNumberToSpaces, toEther } from '../../../utils/format';
import { useState } from 'react';
import { useEffect } from 'react';
import { useWalletConnection } from '../../../hooks/walletConnectionHook';
import { PrimaryButtonXSmall } from '../../../components/PrimaryButton';

export function TotalAccrued() {
    const { contracts } = useWeb3Connector();
    const { isConnected, address } = useWalletConnection();
    const [accrued, setAccrued] = useState<number>(0);


    useEffect(() => {
        if (isConnected && address != null) {
            (async () => {
                const res = await toEther(await contracts.uniswapStaker.callStatic.claimReward(contracts.govToken.address, address, 0));
                setAccrued(Number(res));
            })();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected, address]);

    async function onClaim() {
        await contracts.uniswapStaker.claimReward(contracts.govToken.address, address, 0);
    }

    return (
        <div className='flex flex-row bg-white items-center rounded-lg px-[10px] py-2 space-x-5 max-w-fit'>
            <div className='space-x-1'>
                <span className='font-medium text-sm'>Total accrued:</span>
                <span className='font-semibold text-base'>{formatNumberToSpaces(accrued, 2)} EIG</span>
            </div>
            <PrimaryButtonXSmall text='Claim' onClick={onClaim} disabled={accrued === 0} />                
        </div>)


}