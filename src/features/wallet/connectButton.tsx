import { useAppDispatch } from '../../app/hooks';
import { fetchEthPriceAsync, fetchGovDistributionRateAsync, fetchMintingFeeAsync, fetchRateAsync } from '../minter/minterSlice';
import { connectWalletAsync, fetchBalanceAsync, fetchAllowanceAsync, fetchAccountAsync } from './walletSlice';
import { ReactComponent as WalletIcon } from '../../assets/icons/Wallet.svg';
import { AddAccountsChangedListener } from '../../app/event-listeners';

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
    dispatch(fetchBalanceAsync());
    dispatch(fetchAllowanceAsync());
    dispatch(fetchRateAsync());
    dispatch(fetchEthPriceAsync());
    dispatch(fetchMintingFeeAsync());
    dispatch(fetchGovDistributionRateAsync());

    AddAccountsChangedListener(dispatch);
  }

  return (
    <div onClick={onClick} className={wrapperClass}>
      <button className={buttonClass}>Connect wallet</button>
      {showIcon && <WalletIcon/>}
    </div>
  );
}
