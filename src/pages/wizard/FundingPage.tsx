import { useAppSelector } from "../../app/hooks";
import { MainBox } from "../../components/MainBox";
import { PrimaryButtonSmall } from "../../components/PrimaryButton";
import { WhiteSection } from "../../components/WhiteSection";
import { useNavigate } from 'react-router-dom';
import { selectWalletBalance } from "../../features/wallet/walletSlice";


function FundingPage() {  
  const navigate = useNavigate();

  const walletBalance = useAppSelector(selectWalletBalance);

  const onContinue = () => {
    navigate('/mint');
  }

  return (
    <MainBox>
      <div className="dialog:px-14 my-4">
        <h1 className="text-white font-bold text-2xl text-center mb-4">How to get a wallet</h1>
        <div className="min-h-[260px] flex flex-col">
          <div className="text-white font-semibold text-lg">4. Fund your wallet with ETH</div>
          <span className="text-white text-xs pl-2 te mb-4">To mint Bustad coins, you'll need to use ETH.</span>
          <button className="w-fit bg-Tuscanyapprox text-white text-sm font-semibold px-5 py-2 rounded-md mb-7">Buy ETH</button>
          <WhiteSection>
            <div className="flex flex-col space-y-2">
              <span className="text-sm font-semibold">Your ETH balance</span>
              <div className="bg-Negroni px-3 py-2 rounded-md w-fit">
                <div className="flex items-center space-x-2">
                  <img className="h-4" src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022" alt="" />
                  <span className="text-sm font-semibold">{walletBalance.eth.toPrecision(3)}</span>
                </div>
              </div>
            </div>
          </WhiteSection>
        </div>
        <PrimaryButtonSmall disabled={walletBalance.eth === 0} text={"Continue"} onClick={onContinue} />
      </div>
    </MainBox>
  );
}

export default FundingPage;
