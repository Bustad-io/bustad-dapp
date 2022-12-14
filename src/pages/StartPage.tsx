import { useNavigate } from "react-router-dom";
import { MainBox } from "../components/MainBox";
import { PrimaryButton } from "../components/PrimaryButton";
import { ReactComponent as BustadIcon } from './../assets/coin/bustad_coin.svg';

function StartPage() {
  const navigate = useNavigate();


  return (
    <MainBox>
      <div className="flex flex-col items-center pt-10">
        <BustadIcon className="h-36 mb-10"></BustadIcon>
        <div className="max-w-sm w-full space-y-5">
          <PrimaryButton text="Connect wallet" onClick={() => navigate('/mint')} />          
          <PrimaryButton text="I don't have a wallet" onClick={() => navigate('/mint/wallet-selection')} />
        </div>
      </div>
    </MainBox>
  );
}

export default StartPage;
