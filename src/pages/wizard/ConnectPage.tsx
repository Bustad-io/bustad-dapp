import { AddAccountsChangedListener } from "../../app/event-listeners";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MainBox } from "../../components/MainBox";
import { PrimaryButtonSmall } from "../../components/PrimaryButton";
import { StatusDot } from "../../components/StatusDot";
import { WhiteSection } from "../../components/WhiteSection";
import { fetchEthPriceAsync, fetchGovDistributionRateAsync, fetchMintingFeeAsync, fetchRateAsync } from "../../features/minter/minterSlice";
import { connectWalletAsync, fetchAccountAsync, fetchAllowanceAsync, fetchBalanceAsync } from "../../features/wallet/walletSlice";
import { selectChosenWallet } from "../../features/wizard/wizardSlice";
import { useWalletConnection } from "../../hooks/walletConnectionHook";
import { COINBASE_WALLET, METAMASK } from "../../providers/web3.provider";
import { useNavigate } from 'react-router-dom';
import { CopyButton } from "../../components/CopyButton";
const walletMapper = {
  coinbase: COINBASE_WALLET,
  metamask: METAMASK
}

function ConnectPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const chosenWallet = useAppSelector(selectChosenWallet);  
  const { isConnected, truncatedAddress, address } = useWalletConnection();
  
  const onConnect = async () => {  
    await dispatch(connectWalletAsync(walletMapper[chosenWallet]));
    await dispatch(fetchAccountAsync());
    await dispatch(fetchBalanceAsync());
    await dispatch(fetchAllowanceAsync());
    await dispatch(fetchRateAsync());
    await dispatch(fetchEthPriceAsync());
    await dispatch(fetchMintingFeeAsync());
    await dispatch(fetchGovDistributionRateAsync());

    AddAccountsChangedListener(dispatch);
  }

  const onContinue = () => {
    navigate('/mint/funding');
  }

  return (
    <MainBox>
      <div className="dialog:px-14 my-4">
        <h1 className="text-white font-bold text-2xl text-center mb-4">How to get a wallet</h1>
        <div className="min-h-[260px]">
          <div className="text-white font-semibold text-lg mb-3">3. Connect your wallet</div>
          <div className="space-y-3">
            <WhiteSection>
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-semibold">Status</span>
                <div className="bg-Negroni px-3 py-2 rounded-md w-fit">
                  <div className="flex items-center space-x-2">                    
                    <div className={`${isConnected ? 'bg-[#5ACE79]' : 'bg-[#707070]'} h-2 w-2 rounded-full`}></div>
                    <span className="text-sm font-semibold">{isConnected ? 'Connected' : 'Not connected'}</span>                    
                  </div>
                </div>
              </div>
            </WhiteSection>
            <WhiteSection>
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-semibold">Wallet address</span>
                <div className="bg-Negroni px-3 py-2 rounded-md w-fit flex space-x-1">
                  <span className="text-sm font-semibold">{isConnected ? truncatedAddress : 'None'}</span>
                  {address && <CopyButton content={address}/>}
                </div>
              </div>
            </WhiteSection>
          </div>
        </div>
        <PrimaryButtonSmall text={isConnected ? "Continue" : "Connect"} onClick={isConnected ? onContinue : onConnect} />
      </div>
    </MainBox>
  );
}

export default ConnectPage;
