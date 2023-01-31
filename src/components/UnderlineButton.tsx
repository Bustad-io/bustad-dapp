export interface UnderlineButtonProp {
    text: string;
    onClick: () => void;
    disabled?: boolean;
}

export function UnderlineButton({ text, onClick, disabled = false }: UnderlineButtonProp) {    
    return (
        <button disabled={disabled} onClick={onClick} className='disabled:opacity-40 disabled:cursor-default cursor-pointer text-center underline font-semibold text-sm'>
            {text}            
        </button>
    )
}
