import { useAppDispatch } from '../../app/hooks';
import { connectWalletAsync, fetchBalanceAsync } from './walletSlice';

export function ConnectButton() {
  const dispatch = useAppDispatch();  

  const onClick = async  () => {    
    await dispatch(connectWalletAsync());
    await dispatch(fetchBalanceAsync());
  }

  return (
    <div>
      <button onClick={onClick} className='bg-blue-400'>Connect wallet</button>
    </div>
  );
}
