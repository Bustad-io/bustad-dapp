export interface MainBoxProp {
    title: string;
    children: JSX.Element
}

export function MainBox({ title, children }: MainBoxProp) {
    return (
        <div className="flex flex-col bg-Coral rounded-2xl py-4 px-5 min-h-[445px] sm:min-w-[520px] min-w-[375px]">
            <span className="text-left text-3xl text-white font-bold mb-10">
                {title}
            </span>
            {children}
        </div>
    )
}