import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MainBox } from "../../components/MainBox";
import { PrimaryButtonSmall } from "../../components/PrimaryButton";
import { WhiteSection } from "../../components/WhiteSection";
import { useNavigate } from 'react-router-dom';
import { fetchBalanceAsync, selectBalanceLoading, selectNetwork, selectWalletBalance } from "../../features/wallet/walletSlice";
import { RampInstantSDK, RampInstantEventTypes } from "@ramp-network/ramp-instant-sdk";
import { useWalletConnection } from "../../hooks/walletConnectionHook";
import { useEffect } from "react";
import { LoadingTextComponent } from "../../components/LoadingTextComponent";
import RefreshIcon from "../../assets/icons/refresh.png";
import ReactGA from "react-ga";
import { WizardWrapper } from "./components/WizardWrapper";


function FundingPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const network = useAppSelector(selectNetwork);

  const walletBalance = useAppSelector(selectWalletBalance);
  const balanceLoading = useAppSelector(selectBalanceLoading);

  const { address, isConnected } = useWalletConnection();

  const onContinue = () => {
    navigate({pathname: '/mint', search: '?showProgress=true'});
  }

  useEffect(() => {
    if (!isConnected) {
      navigate('/mint/connect');
    }
  }, [isConnected, navigate]);

  const showOnRamp = () => {

    if (network !== "mainnet") {
      new RampInstantSDK({
        hostAppName: 'Bustad',
        hostLogoUrl: 'https://app.bustad.io/logo/bustad_orange.png',
        url: 'https://ri-widget-staging.firebaseapp.com/',
        swapAsset: 'GOERLI_ETH',
        userAddress: address!
      })
        .on(RampInstantEventTypes.WIDGET_CLOSE, (e) => ReactGA.event({ category: 'On ramp', action: 'Widget close' }))
        .on(RampInstantEventTypes.PURCHASE_CREATED, (e) => ReactGA.event({ category: 'On ramp', action: 'Purchase created' }))
        .show();
    } else {
      new RampInstantSDK({
        hostAppName: 'Bustad',
        hostLogoUrl: 'https://app.bustad.io/logo/bustad_orange.png',
        swapAsset: 'ETH_ETH',
        userAddress: address!
      })
        .on(RampInstantEventTypes.WIDGET_CLOSE, (e) => ReactGA.event({ category: 'On ramp', action: 'Widget close' }))
        .on(RampInstantEventTypes.PURCHASE_CREATED, (e) => ReactGA.event({ category: 'On ramp', action: 'Purchase created' }))
        .show();
    }

    ReactGA.event({
      category: 'On ramp',
      action: 'Widget open'
    });
  }

  const onRefreshBalance = async () => {
    ReactGA.event({
      category: 'Wallet',
      action: 'Refresh balance'
    });
    await dispatch(fetchBalanceAsync());
  }

  return (
    <MainBox>
      <div className="dialog:px-14 my-4">
        <WizardWrapper>
          <>
            <div className="min-h-[260px] flex flex-col">
              <span className="text-white text-sm pl-2 te mb-2">To mint Bustad coins, you'll need to use ETH.</span>
              <button className="w-fit bg-Tuscanyapprox text-white text-sm font-semibold px-5 py-2 rounded-md mb-7" onClick={showOnRamp}>
                Buy ETH
              </button>
              <WhiteSection>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-semibold">Your ETH balance</span>
                  <div className="bg-Negroni px-3 py-2 rounded-md w-fit cursor-pointer" onClick={onRefreshBalance}>
                    <div className="flex items-center space-x-2">
                      <img className="h-4" src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022" alt="" />
                      <LoadingTextComponent loading={balanceLoading} useSpinner>
                        <span className="text-sm font-semibold">{walletBalance.eth.toPrecision(3)}</span>
                      </LoadingTextComponent>
                      <img className="h-4" src={RefreshIcon} alt="" />
                    </div>
                  </div>
                </div>
              </WhiteSection>
            </div>
            <PrimaryButtonSmall disabled={walletBalance.eth === 0} text={"Continue"} onClick={onContinue} />
          </>
        </WizardWrapper>
      </div>
    </MainBox>
  );
}

export default FundingPage;
