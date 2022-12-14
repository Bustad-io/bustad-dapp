import { ReactComponent as Spinner } from '../assets/icons/SpinnerSmallWide.svg';

export interface LoadingComponentProps {
    children: JSX.Element;
    loading: boolean;
    useSpinner?: boolean;
}

export function LoadingTextComponent({ children, loading, useSpinner }: LoadingComponentProps) {
    if (useSpinner) {
        return loading ? <Spinner className='animate-spin w-4 h-[20px] mr-2' /> : children
    }

    return loading ? <span className='animate-pulse text-l'>~</span> : children
}