import { AddWeb3EventListeners } from '../../app/event-listeners';
import { useAppDispatch } from '../../app/hooks';
import { fetchEthPriceAsync, fetchMintingFeeAsync, fetchRateAsync } from '../minter/minterSlice';
import { connectWalletAsync, fetchBalanceAsync, fetchAllowanceAsync, fetchAccountAsync } from './walletSlice';

export function ConnectButton() {
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
    <div>
      <button onClick={onClick} className='bg-blue-400'>Connect wallet</button>
    </div>
  );
}
