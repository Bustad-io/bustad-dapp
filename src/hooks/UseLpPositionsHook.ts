import { useEffect, useState } from "react";
import { PositionView } from "../types/StakingTypes";
import { formatUnitToNumber } from "../utils/format";
import { useContractConfig } from "./contractConfigHook";
import { useWalletConnection } from "./walletConnectionHook";
import { useWeb3Connector } from "./web3Hook";

export function UseLpPositions() {
    const { contracts } = useWeb3Connector();
    const { isConnected, address } = useWalletConnection();
    const { getContractByAddress } = useContractConfig();

    const [positions, setPositions] = useState<PositionView[]>([]);

    useEffect(() => {
    const asyncCall = async () => {      
      const numberOfNFT = formatUnitToNumber(await contracts.uniswapLpNft.balanceOf(address));

      const pos: any = await Promise
        .all(Array(numberOfNFT)
          .fill('')
          .map(async (_, index) => {
            const tokenId = formatUnitToNumber(await contracts.uniswapLpNft.tokenOfOwnerByIndex(address, index));
            const position = await contracts.uniswapLpNft.positions(tokenId);            

            const res: PositionView = {
              tokenId,
              fee: position.fee / 10000,
              token0Label: getContractByAddress(position.token0)?.label ?? '',
              token1Label: getContractByAddress(position.token1)?.label ?? '',
              token0Address: position.token0,
              token1Address: position.token1
            }
            return res;
          }));
  
      setPositions(pos);
    }

    if (isConnected && address != null) {
      asyncCall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address]);  

    return {
        positions
    }
}
