import { useState } from "react";

export interface Props {
    label?: string;
    checked?: boolean;
    onClick: () => void;
}

export function Checkbox({ label, checked, onClick }: Props) {
    return (
        <div onClick={onClick} className="flex cursor-pointer">
            <div className="relative border-2 rounded-sm border-white h-4 w-4 mr-1.5 mb-1">
                {checked && <div className="absolute -top-[0.05em] left-[0.15em] h-[9px] w-[7px] border-white border-l-0 border-2 border-t-0 rotate-45"></div>}
            </div>
            {label && <span className="relative text-xs text-white cursor-pointer">{label}</span>}
        </div>
    );
}