import { useAppDispatch } from '../../app/hooks';
import { connectWalletAsync } from './walletSlice';

export function ConnectButton() {
  const dispatch = useAppDispatch();  

  const onClick = () => {    
    dispatch(connectWalletAsync());
  }

  return (
    <div>
      <button onClick={onClick} className='bg-blue-400'>Connect wallet</button>
    </div>
  );
}
