import { Navigate } from "react-router-dom";
import { useWalletConnection } from "../hooks/walletConnectionHook";

interface Props {
    children: JSX.Element;    
}

function RestrictedPage({ children }: Props) {
    const { isAdmin } = useWalletConnection();    

    if(!isAdmin) {
        return <Navigate to={"/"} replace></Navigate>
    }

    return children;
}

export default RestrictedPage;
