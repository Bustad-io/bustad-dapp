export interface Props {
    walletLabel: string;
    isActive?: boolean;
    logoPath: string;
    onClick: () => void;
}

export function WalletSelectorButton({ walletLabel, isActive, logoPath, onClick }: Props) {
    return (
        <div onClick={onClick} className={`${isActive && 'outline outline-white outline-2'} inline-flex justify-center bg-Tuscanyapprox py-2 rounded-md cursor-pointer items-center w-full`}>
            <img className='h-6 w-6 mr-1' src={logoPath} alt="" />
            <span className='text-white font-semibold text-[0.65rem] dialog:text-base'>{walletLabel}</span>
        </div>

    )
}