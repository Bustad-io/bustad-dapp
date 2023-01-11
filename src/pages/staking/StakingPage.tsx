import { useAppSelector } from "../../app/hooks";
import { MainBox } from "../../components/MainBox";
import { selectNetwork } from "../../features/wallet/walletSlice";
import { useWeb3Connector } from "../../hooks/web3Hook";
import { useEffect, useState } from 'react';
import { isConstructorTypeNode } from "typescript";
import { formatUnitToNumber, parseToNumber } from "../../utils/format";
import { ethers, utils } from "ethers";
import { useWalletConnection } from "../../hooks/walletConnectionHook";
import { useContractConfig } from "../../hooks/contractConfigHook";
import { PositionView } from "../../types/StakingTypes";

function StakingPage() {
  const network = useAppSelector(selectNetwork);
  const { contracts } = useWeb3Connector();
  const { isConnected, address } = useWalletConnection();
  const { getContractByAddress } = useContractConfig();
  const [positions, setPositions] = useState<PositionView[]>([]);  

  useEffect(() => {
    const asyncCall = async () => {      
      const numberOfNFT = formatUnitToNumber(await contracts.uniswapLpNft.balanceOf('0x7D026BEf6541C933D20ad4156912B97e1c86bbec'));

      const pos: any = await Promise
        .all(Array(numberOfNFT)
          .fill('')
          .map(async (_, index) => {
            const tokenId = formatUnitToNumber(await contracts.uniswapLpNft.tokenOfOwnerByIndex('0x7D026BEf6541C933D20ad4156912B97e1c86bbec', index));
            const position = await contracts.uniswapLpNft.positions(tokenId);
            console.log(position);

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

    if (isConnected) {
      asyncCall();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  const onClick = async (tokenId: number) => {
    //console.log(utils.defaultAbiCoder.encode(["bytes32"], ["0x206cd2809da6c5ca1cc8f6a07fbb77879360e166637c391825561bcc51340ba0"]));
    await contracts.uniswapLpNft["safeTransferFrom(address,address,uint256,bytes)"]("0x7D026BEf6541C933D20ad4156912B97e1c86bbec", "0xe34139463bA50bD61336E0c446Bd8C0867c6fE65", tokenId, "0x0000000000000000000000002943864be07a0f1fb2e3cb48fde09d9fc2621b070000000000000000000000004f309ba2a412d25f7db720e36c98b0e87cf1fdc40000000000000000000000000000000000000000000000000000000063bd717c0000000000000000000000000000000000000000000000000000000063bd7d700000000000000000000000007d026bef6541c933d20ad4156912b97e1c86bbec");
  }

  async function onClaim() {
    await contracts.uniswapStaker.claimReward(contracts.govToken.address, address, 0);
  }

  return (
    <MainBox>
      <div className="dialog:px-14 my-4">
        <div className="flex flex-col space-y-3">
          {positions.map((data, index) => (
            <button onClick={() => onClick(data.tokenId)} className="bg-white" key={index}>{`${data.token0Label}/${data.token1Label} ${data.fee}% - ${data.tokenId}`}</button>
          ))} 
          <button onClick={onClaim} className="bg-green-400">Claim</button>         
        </div>
      </div>
    </MainBox>
  );
}

export default StakingPage;
