import { ReactComponent as Spinner } from '../../assets/icons/SpinnerSmallWide.svg';
import { explorerBaseUri } from '../../config';

interface PendingStatusProps {  
  txHash: string;
  type: string;
}

export default function PendingStatus({ txHash, type }: PendingStatusProps) {
  return (
    <div className="flex bg-Negroni rounded-md py-1 sm:py-2 items-center px-4">
      <Spinner className='animate-spin w-4 h-6 mr-2' />
      <div className='flex justify-between grow items-center'>
        <span className='font-semibold text-sm'>Pending transaction: {type.toUpperCase()}</span>
        <a href={`${explorerBaseUri}/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className='text-sm underline text-blue-700'>View on explorer</a>
      </div>
    </div>
  )
}
