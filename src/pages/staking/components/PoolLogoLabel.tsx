import { ReactComponent as USDC_BUSC_LOGO } from '../../../assets/coin/USDC_BUSC_PAIR.svg';
import { ReactComponent as ETH_EIG_LOGO } from '../../../assets/coin/ETH_EIG_PAIR.svg';

interface Props {
    poolLabel: string
}

export function PoolLogoLabel({ poolLabel }: Props) {
    const isETH_EIG = poolLabel.includes('ETH/EIG') || poolLabel.includes('EIG/ETH');
    const isUSDC_BUSC = poolLabel.includes('USDC/BUSC') || poolLabel.includes('BUSC/USDC');

    if (isETH_EIG) {
        return (
            <div className='flex space-x-1.5'>
                <ETH_EIG_LOGO />
                <span className='font-medium text-[15px]'>{poolLabel}</span>
            </div>
        );
    } else if (isUSDC_BUSC) {
        return (
            <div className='flex space-x-1.5'>
                <USDC_BUSC_LOGO />
                <span className='font-medium text-[15px]'>{poolLabel}</span>
            </div>
        );
    } else {
        return (
            <div>
                unknown
            </div>
        );
    }

}