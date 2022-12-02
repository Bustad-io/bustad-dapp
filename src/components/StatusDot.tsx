
interface Props {
    color: string;
}

export function StatusDot({color}: Props) {
    return <div className={`bg-[${color}] h-2 w-2 rounded-full`}></div>;
}