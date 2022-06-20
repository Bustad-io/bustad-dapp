import { AddWeb3EventListeners } from '../../app/event-listeners';
import { useAppDispatch } from '../../app/hooks';
import { fetchEthPriceAsync, fetchMintingFeeAsync, fetchRateAsync } from '../minter/minterSlice';
import { connectWalletAsync, fetchBalanceAsync, fetchAllowanceAsync, fetchAccountAsync } from './walletSlice';

export interface ConnectButtonProp {
  wrapperClass?: string;
  buttonClass?: string
}

export function ConnectButton({wrapperClass = '', buttonClass = ''}: ConnectButtonProp) {
  const dispatch = useAppDispatch();

  const onClick = async () => {
    await dispatch(connectWalletAsync());
    await dispatch(fetchAccountAsync());
    await dispatch(fetchBalanceAsync());
    await dispatch(fetchAllowanceAsync());
    await dispatch(fetchRateAsync());
    await dispatch(fetchEthPriceAsync());
    await dispatch(fetchMintingFeeAsync());

    AddWeb3EventListeners(dispatch);
  }

  return (
    <div onClick={onClick} className={wrapperClass}>
      <button className={buttonClass}>Connect wallet</button>
    </div>
  );
}
