export interface LoadingComponentProps {
    children: JSX.Element;
    loading: boolean;
}

export function LoadingTextComponent({ children, loading }: LoadingComponentProps) {
    return loading ?
        <span className='animate-pulse text-l'>
            ~
        </span>
        :
        children
}