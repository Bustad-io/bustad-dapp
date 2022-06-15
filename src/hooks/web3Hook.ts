import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { CrowdsaleAddress, BustadTokenAddress } from "../config";
import { getProvider, getSigner } from "../features/wallet/walletAPI";
import { selectWalletStatus } from "../features/wallet/walletSlice";

import CrowdsaleDef from '../contracts/Crowdsale.sol/Crowdsale.json';
import BustadTokenDef from '../contracts/BustadToken.sol/BustadToken.json';

export function useWeb3Connector() {
    const [crowdsale, setCrowdsale] = useState<Contract>();
    const [bustadToken, setBustadToken] = useState<Contract>();

    const walletStatus = useAppSelector(selectWalletStatus);

    useEffect(() => {
        if (walletStatus === "connected") {
            const signer = getSigner();

            const crowdsaleContract = new ethers.Contract(CrowdsaleAddress, CrowdsaleDef.abi, signer);
            const bustadTokenContract = new ethers.Contract(BustadTokenAddress, BustadTokenDef.abi, signer);

            setCrowdsale(crowdsaleContract);
            setBustadToken(bustadTokenContract);
        } else {
            const provider = getProvider();
            const crowdsaleContract = new ethers.Contract(CrowdsaleAddress, CrowdsaleDef.abi, provider);
            const bustadTokenContract = new ethers.Contract(BustadTokenAddress, BustadTokenDef.abi, provider);        

            setCrowdsale(crowdsaleContract);
            setBustadToken(bustadTokenContract);
        };

    }, [walletStatus]);

    return {
        crowdsale,
        bustadToken
    }
}