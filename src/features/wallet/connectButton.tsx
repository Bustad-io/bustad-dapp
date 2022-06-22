import { useAppDispatch } from '../../app/hooks';
import { fetchEthPriceAsync, fetchGovDistributionRateAsync, fetchMintingFeeAsync, fetchRateAsync } from '../minter/minterSlice';
import { connectWalletAsync, fetchBalanceAsync, fetchAllowanceAsync, fetchAccountAsync } from './walletSlice';
import { ReactComponent as WalletIcon } from '../../assets/icons/Wallet.svg';
import { AddAccountsChangedListener } from '../../app/event-listeners';
import { useWalletConnection } from '../../hooks/walletConnectionHook';

export interface ConnectButtonProp {
  wrapperClass?: string;
  buttonClass?: string;
  showIcon?: boolean;
}

export function ConnectButton({ wrapperClass = '', buttonClass = '', showIcon = false }: ConnectButtonProp) {
  const dispatch = useAppDispatch();
  const { isConnected } = useWalletConnection();

  const onClick = async () => {
    await dispatch(connectWalletAsync());

    if (isConnected) {
      await dispatch(fetchAccountAsync());
      await dispatch(fetchBalanceAsync());
      await dispatch(fetchAllowanceAsync());
      await dispatch(fetchRateAsync());
      await dispatch(fetchEthPriceAsync());
      await dispatch(fetchMintingFeeAsync());
      await dispatch(fetchGovDistributionRateAsync());

      AddAccountsChangedListener(dispatch);
    }
  }

  return (
    <div onClick={onClick} className={wrapperClass}>
      <button className={buttonClass}>Connect wallet</button>
      {showIcon && <WalletIcon />}
    </div>
  );
}
