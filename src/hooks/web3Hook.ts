import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { CrowdsaleAddress } from "../config";
import { getProvider, getSigner } from "../features/wallet/walletAPI";
import { selectWalletStatus } from "../features/wallet/walletSlice";

import CrowdsaleDef from '../contracts/Crowdsale.sol/Crowdsale.json';

export function useWeb3Connector() {
    const [crowdsale, setCrowdsale] = useState<Contract>();
    const walletStatus = useAppSelector(selectWalletStatus);

    useEffect(() => {
        if (walletStatus === "connected") {
            const signer = getSigner();
            const crowdsaleContract = new ethers.Contract(CrowdsaleAddress, CrowdsaleDef.abi, signer);
            setCrowdsale(crowdsaleContract);
        } else {
            const provider = getProvider();
            const crowdsaleContract = new ethers.Contract(CrowdsaleAddress, CrowdsaleDef.abi, provider);
            setCrowdsale(crowdsaleContract);
        };

    }, [walletStatus]);

    return {
        crowdsale
    }
}