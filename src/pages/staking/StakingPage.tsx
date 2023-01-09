import { useAppSelector } from "../../app/hooks";
import { MainBox } from "../../components/MainBox";
import { selectNetwork } from "../../features/wallet/walletSlice";
import { useWeb3Connector } from "../../hooks/web3Hook";
import { useEffect } from 'react';
import { isConstructorTypeNode } from "typescript";
import { formatUnitToNumber, parseToNumber } from "../../utils/format";
import { ethers } from "ethers";

function StakingPage() {
  const network = useAppSelector(selectNetwork);
  const { contracts } = useWeb3Connector();

  async function computeKeccak256() {
    const abiCoder = ethers.utils.defaultAbiCoder;

    console.log(ethers.utils.keccak256(abiCoder.encode(["address", "address", "uint", "uint", "address"],["0x2943864BE07a0F1Fb2E3CB48fDe09d9FC2621B07","0x4F309ba2a412d25F7dB720E36C98B0E87Cf1Fdc4", 1673257207, 1673264407,"0x7D026BEf6541C933D20ad4156912B97e1c86bbec"])));
  }

  const asyncCall = async () => {
    await computeKeccak256();

    /* const numberOfNFT = formatUnitToNumber(await contracts.uniswapLpNft.balanceOf('0x7D026BEf6541C933D20ad4156912B97e1c86bbec'));

    const positions: any = await Promise
      .all(Array(numberOfNFT)
        .fill('')
        .map(async (_, index) => {
          const tokenId = formatUnitToNumber(await contracts.uniswapLpNft.tokenOfOwnerByIndex('0x7D026BEf6541C933D20ad4156912B97e1c86bbec', index));
          const position = await contracts.uniswapLpNft.positions(tokenId);
          return { tokenId, position };
        }));

    console.log(positions[0].position.token1);
    console.log(positions[0].position.token0); */
  }

  return (
    <MainBox>
      <div className="dialog:px-14 my-4">
        <h1>{contracts.uniswapLpNft.address}</h1>
        <button onClick={asyncCall}>Click me!</button>
      </div>
    </MainBox>
  );
}

export default StakingPage;
