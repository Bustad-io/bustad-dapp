import { WizardProgressTracker } from "./WizardProgressTracker"

export interface WizardWrapperProps {
    children: JSX.Element
}

export function WizardWrapper({ children }: WizardWrapperProps) {
    return (
        <>
            <div className="mb-8">
                <WizardProgressTracker />
            </div>            
            {children}
        </>
    )
}