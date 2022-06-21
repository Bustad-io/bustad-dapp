import { AddWeb3EventListeners } from '../../app/event-listeners';
import { useAppDispatch } from '../../app/hooks';
import { fetchEthPriceAsync, fetchGovDistributionRateAsync, fetchMintingFeeAsync, fetchRateAsync } from '../minter/minterSlice';
import { connectWalletAsync, fetchBalanceAsync, fetchAllowanceAsync, fetchAccountAsync } from './walletSlice';
import { ReactComponent as WalletIcon } from '../../assets/icons/Wallet.svg';

export interface ConnectButtonProp {
  wrapperClass?: string;
  buttonClass?: string;
  showIcon?: boolean;
}

export function ConnectButton({wrapperClass = '', buttonClass = '', showIcon = false}: ConnectButtonProp) {
  const dispatch = useAppDispatch();

  const onClick = async () => {  
    await dispatch(connectWalletAsync());
    await dispatch(fetchAccountAsync());
    await dispatch(fetchBalanceAsync());
    await dispatch(fetchAllowanceAsync());
    await dispatch(fetchRateAsync());
    await dispatch(fetchEthPriceAsync());
    await dispatch(fetchMintingFeeAsync());
    await dispatch(fetchGovDistributionRateAsync());    
  }

  return (
    <div onClick={onClick} className={wrapperClass}>
      <button className={buttonClass}>Connect wallet</button>
      {showIcon && <WalletIcon/>}
    </div>
  );
}
