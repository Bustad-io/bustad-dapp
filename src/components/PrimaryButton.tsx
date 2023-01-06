export interface PrimaryButtonProp {
    text: string;
    onClick: () => void;
    disabled?: boolean;
}

export function PrimaryButton({ text, onClick, disabled = false }: PrimaryButtonProp) {    
    return (
        <button disabled={disabled} onClick={onClick} className='disabled:opacity-40 disabled:cursor-default cursor-pointer py-4 rounded-2xl bg-Tuscanyapprox text-center text-white font-bold text-2xl w-full'>
            {text}            
        </button>
    )
}
