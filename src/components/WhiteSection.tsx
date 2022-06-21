export interface WhiteSectionProps {
    children: JSX.Element;
}

export function WhiteSection({ children }: WhiteSectionProps) {
    return (
        <div className="bg-white rounded-2xl py-3 px-5">
            {children}
        </div>
    );
}