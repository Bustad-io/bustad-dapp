import { useState } from "react";

export interface Props {
    label?: string;
    checked?: boolean;
    onClick: () => void;
}

export function Checkbox({ label, checked, onClick }: Props) {
    return (
        <div onClick={onClick} className="flex cursor-pointer">
            <div className="relative border-[1.5px] rounded-sm border-white h-3 w-3 mr-1.5">
                {checked && <div className="absolute -top-[0.05em] left-[0.2em] h-2 w-1 border-white border-l-0 border-2 border-t-0 rotate-45"></div>}
            </div>
            {label && <span className="relative text-xs -top-[0.2em] text-white cursor-pointer">{label}</span>}
        </div>
    );
}