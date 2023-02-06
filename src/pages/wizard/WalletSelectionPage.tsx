import { useState } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { MainBox } from "../../components/MainBox";
import { WalletSelectorButton } from "../../components/WalletSelectorButton";
import GooglePlay from './../../assets/icons/GooglePlayLogo.png';
import AppStore from './../../assets/icons/AppStoreLogo.png';
import { Checkbox } from '../../components/Checkbox';
import { PrimaryButtonSmall } from "../../components/PrimaryButton";
import { BrowserView, MobileView, CustomView, isIOS, isMobile } from 'react-device-detect';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectChosenWallet, setChosenWallet } from "../../features/wizard/wizardSlice";
import { coinbaseAndroidUrl, coinbaseIosUrl } from "../../config";
import ReactGA from 'react-ga';
import { WizardWrapper } from "./components/WizardWrapper";

function WalletSelectionPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [confirmed, setConfirmed] = useState(false);
  const chosenWallet = useAppSelector(selectChosenWallet);

  const isCoinbase = chosenWallet === "coinbase";
  const isMetaMask = chosenWallet === "metamask";

  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost';

  const onContinue = () => {
    ReactGA.event({
      category: 'Wizard',
      action: 'Chosen wallet',
      label: chosenWallet
    });
    navigate('/mint/connect');
  }

  return (
    <MainBox>
      <div className="dialog:px-14 my-4">
        <WizardWrapper>
          <>
            <div className="min-h-[260px]">
              <div className="text-white font-semibold text-sm mb-2">Choose a wallet</div>
              <div className="flex mb-7 space-x-2">
                <WalletSelectorButton onClick={() => {
                  dispatch(setChosenWallet("coinbase"));
                  setConfirmed(false);
                }} walletLabel="Coinbase Wallet" isActive={isCoinbase} logoPath={require('../../assets/icons/coinbase.png')} />
                <WalletSelectorButton onClick={() => {
                  dispatch(setChosenWallet("metamask"));
                  setConfirmed(false);
                }} walletLabel="MetaMask" isActive={!isCoinbase} logoPath={require('../../assets/icons/metamask.png')} />
              </div>
              <div className="text-white font-semibold text-sm">Download and configure {isCoinbase ? 'Coinbase Wallet' : 'MetaMask'}</div>
              {isCoinbase ? (
                <div className="">
                  <div className="text-white text-xs mb-2">Get the app on your phone</div>
                  <BrowserView>
                    {
                      isLocalhost ? (
                        <QRCode value={`http://localhost:3000/mint/app-store-redirect`} size={75} bgColor={'#FF9649'} fgColor={'#FFFFFF'} />
                      ) : (
                        <QRCode value='https://bustad-dapp-dev.azurewebsites.net/mint/app-store-redirect' size={75} bgColor={'#FF9649'} fgColor={'#FFFFFF'} />
                      )
                    }

                  </BrowserView>
                  <MobileView>
                    <CustomView condition={isIOS}>
                      <a href={coinbaseIosUrl}>
                        <img className="w-[125px]" src={AppStore} alt="" />
                      </a>
                    </CustomView>
                    <CustomView condition={!isIOS}>
                      <a href={coinbaseAndroidUrl}>
                        <img className="w-[125px]" src={GooglePlay} alt="" />
                      </a>
                    </CustomView>
                  </MobileView>
                </div>) : (
                <div>
                  <BrowserView>
                    <a href="https://metamask.io/" target="_blank" className="text-white underline text-sm font-bold mt-1 block" rel="noreferrer noopener">Go to MetaMask.io</a>
                  </BrowserView>
                  <MobileView>
                    <div className="text-sm font-semibold mt-1">MetaMask plugin is only available on desktop</div>
                  </MobileView>
                </div>
              )}
            </div>
            <div className="mb-2">
              <Checkbox checked={confirmed} onClick={() => setConfirmed(prev => !prev)} label={`I have downloaded and configured ${isCoinbase ? 'Coinbase Wallet' : 'MetaMask'}`} />
            </div>
            <PrimaryButtonSmall disabled={!confirmed || (isMobile && isMetaMask)} text="Continue" onClick={onContinue} />
          </>
        </WizardWrapper>
      </div>
    </MainBox>
  );
}

export default WalletSelectionPage;
