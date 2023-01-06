import { useAppSelector } from "../../app/hooks";
import { MainBox } from "../../components/MainBox";
import { selectNetwork } from "../../features/wallet/walletSlice";
import { useWeb3Connector } from "../../hooks/web3Hook";
import { useEffect } from 'react';
import { isConstructorTypeNode } from "typescript";
import { formatUnitToNumber, parseToNumber } from "../../utils/format";

function StakingPage() {
  const network = useAppSelector(selectNetwork);
  const { contracts } = useWeb3Connector();

  const asyncCall = async () => {
    const numberOfNFT = formatUnitToNumber(await contracts.uniswapLpNft.balanceOf('0x7D026BEf6541C933D20ad4156912B97e1c86bbec'));

    const positions: any = await Promise
      .all(Array(numberOfNFT)
        .fill('')
        .map(async (_, index) => {
          const tokenId = formatUnitToNumber(await contracts.uniswapLpNft.tokenOfOwnerByIndex('0x7D026BEf6541C933D20ad4156912B97e1c86bbec', index));
          const position = await contracts.uniswapLpNft.positions(tokenId);
          return { tokenId, position };
        }));

    console.log(positions[0].position.token1);
    console.log(positions[0].position.token0);
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
