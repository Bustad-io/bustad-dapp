import { useState } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { MainBox } from "../../components/MainBox";
import { WalletSelectorButton } from "../../components/WalletSelectorButton";
import { ReactComponent as AppStore } from './../../assets/icons/AppStoreLogo.svg';
import GooglePlay from './../../assets/icons/GooglePlayLogo.png';
import { Checkbox } from '../../components/Checkbox';
import { PrimaryButtonSmall } from "../../components/PrimaryButton";
import { BrowserView, MobileView, CustomView, isIOS, isMobile } from 'react-device-detect';


const COINBASE = 'coinbase';
const METAMASK = 'metamask';

function WalletSelectionPage() {
  const navigate = useNavigate();
  const [walletChoice, setWalletChoice] = useState(COINBASE)
  const [confirmed, setConfirmed] = useState(false);

  const isCoinbase = walletChoice === COINBASE;
  const isMetaMask = walletChoice === METAMASK;

  return (
    <MainBox>
      <div className="px-16 my-5">
        <h1 className="text-white font-bold text-2xl text-center mb-4">How to get a wallet</h1>
        <div className="text-white font-semibold text-lg mb-3">1. Choose a wallet</div>
        <div className="flex mb-5">
          <div className="mr-2">
            <WalletSelectorButton onClick={() => {
              setWalletChoice(COINBASE);
              setConfirmed(false);
              }} walletLabel="Coinbase Wallet" isActive={isCoinbase} logoPath={require('../../assets/icons/coinbase.png')} />
          </div>
          <div>
            <WalletSelectorButton onClick={() => {
              setWalletChoice(METAMASK);
              setConfirmed(false);
              }} walletLabel="MetaMask" isActive={!isCoinbase} logoPath={require('../../assets/icons/metamask.png')} />
          </div>
        </div>
        <div className="text-white font-semibold text-lg max-w-xs">2. Download and configure {isCoinbase ? 'Coinbase Wallet' : 'MetaMask'}</div>
        {isCoinbase ? (
          <div className="mb-5">
            <div className="text-white text-xs mb-2">Get the app on your phone</div>
            <BrowserView>
              <QRCode value="http://192.168.128.76:3000/app-store-redirect" size={75} bgColor={'#FF9649'} fgColor={'#FFFFFF'} />
            </BrowserView>
            <MobileView>
              <CustomView condition={isIOS}>
                <a href="https://apps.apple.com/us/app/coinbase-wallet-nfts-crypto/id1278383455">
                  <AppStore />
                </a>
              </CustomView>
              <CustomView condition={!isIOS}>
                <a href="https://play.google.com/store/apps/details?id=org.toshi">
                  <img className="w-[105px]" src={GooglePlay} alt="" />
                </a>
              </CustomView>
            </MobileView>
          </div>) : (
            <div>
              <BrowserView>
              <a href="https://metamask.io/" target="_blank" className="underline text-sm font-bold mb-10 mt-1 block" rel="noreferrer noopener">Go to MetaMask.io</a>
            </BrowserView>
            <MobileView>
              <div className="text-sm font-semibold mb-10 mt-1">MetaMask plugin is only available on desktop</div>
            </MobileView>              
            </div>
        )}
        <div className="mb-2">
          <Checkbox checked={confirmed} onClick={() => setConfirmed(prev => !prev)} label={`I have downloaded and configured ${isCoinbase ? 'Coinbase Wallet' : 'MetaMask'}`} />
        </div>
        <PrimaryButtonSmall disabled={!confirmed || (isMobile && isMetaMask)} text="Continue" onClick={() => navigate('/mint')} />
      </div>
    </MainBox>
  );
}

export default WalletSelectionPage;
