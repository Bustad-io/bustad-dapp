import { useAppSelector } from '../../app/hooks';
import { ReactComponent as Spinner } from '../../assets/icons/SpinnerSmallWide.svg';
import { explorerBaseUri, testExplorerBaseUri } from '../../config';
import { selectNetwork } from '../wallet/walletSlice';

interface PendingStatusProps {  
  txHash: string;
  type: string;
}

export default function PendingStatus({ txHash, type }: PendingStatusProps) {
  const network = useAppSelector(selectNetwork);

  const explorerUri = network === 'mainnet' ? explorerBaseUri : testExplorerBaseUri;

  return (
    <div className="flex bg-Negroni rounded-md py-1 sm:py-2 items-center px-4">
      <Spinner className='animate-spin w-4 h-6 mr-2' />
      <div className='flex justify-between grow items-center'>
        <span className='font-semibold text-sm'>Pending transaction: {type.toUpperCase()}</span>
        <a href={`${explorerUri}/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className='text-sm underline text-blue-700'>View on explorer</a>
      </div>
    </div>
  )
}
