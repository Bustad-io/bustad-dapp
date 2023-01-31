export interface MainBoxProp {
    title?: string;
    children: JSX.Element
}

export function MainBox({ title, children }: MainBoxProp) {
    return (
        <div className="flex flex-col bg-Coral rounded-2xl py-4 px-5 min-h-[445px] dialog:min-w-[520px] w-full">
            {title && <h1 className="text-left text-2xl text-white font-bold mb-5">
                {title}
            </h1>}
            {children}
        </div>
    )
}