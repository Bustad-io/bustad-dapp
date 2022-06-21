export interface IconLabelElementProps {
    label: string;
    children: JSX.Element;
}

export function IconLabelElement({ label, children }: IconLabelElementProps) {
    return (
        <div className="inline-block bg-Negroni rounded-md px-2 py-1">
            <div className="flex items-center">
                <div className="mr-2">{children}</div>
                <span className="text-xl font-medium">{label}</span>
            </div>
        </div>
    );
}