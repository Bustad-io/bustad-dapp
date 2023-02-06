import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import MintPage from './pages/MintPage';
import GovernancePage from './pages/GovernancePage';
import { Dialog, PendingTransactionList } from './features/dialog/Dialog';
import { AccountButton } from './components/AccountButton';
import { ReactComponent as BustadIcon } from './assets/icons/BustadIcon.svg';
import { useEffect, useState } from 'react';
import CounterPage from './pages/CounterPage';
import StartPage from './pages/StartPage';
import WalletSelectionPage from './pages/wizard/WalletSelectionPage';
import MobileRedirectionPage from './pages/wizard/MobileRedirectionPage';
import ConnectPage from './pages/wizard/ConnectPage';
import FundingPage from './pages/wizard/FundingPage';
import ReactGA from 'react-ga';
import { ANALYTICS_ID, ANALYTICS_ID_TEST, IS_DEV_ENV } from './config';
import { useAppSelector } from './app/hooks';
import { selectNetwork } from './features/wallet/walletSlice';
import StakingPage from './pages/staking/StakingPage';
import RestrictedPage from './pages/RestrictedPage';
import AdminPage from './pages/admin/AdminPage';
import { AdminCreateLPRewardPage, AdminLPRewardPage } from './pages/admin/AdminLPRewardPage';
import { AdminIncentiveDetailPage } from './pages/admin/incentive/AdminIncentiveDetailPage';
import StakeIncentiveDetailsPage from './pages/staking/StakeIncentiveDetailsPage';
import RewardPage from './pages/staking/RewardPage';
import { NavigationBar } from './components/NavigationBar';
import 'react-loading-skeleton/dist/skeleton.css';
import { changeBaseUrl } from './api/instance';

function App() {
  const location = useLocation();
  const [, setShowNavigationTab] = useState(true);
  const network = useAppSelector(selectNetwork);

  console.log('secret key',process.env.REACT_APP_MY_SUPER_SECRET_KEY);

  useEffect(() => {
    if (IS_DEV_ENV) {
      ReactGA.initialize(ANALYTICS_ID_TEST, { debug: false });
    } else {
      ReactGA.initialize(ANALYTICS_ID);
    }
    if (location.pathname === '/counter') {
      setShowNavigationTab(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    ReactGA.pageview(location.pathname);

    if (location.pathname === '/counter') {
      setShowNavigationTab(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    changeBaseUrl(network);    
  }, [network]);

  return (
    <>
      <div className='flex flex-col bg-orange-100 dark:bg-gradient-to-br dark:from-DarkPaleBlue dark:to-DarkPaleBlueDarker h-full'>
        <header className='flex px-2 pt-5 mb-14 justify-between'>
          <div className='flex items-center space-x-9 sm:space-x-16'>
            <a href="https://bustad.io" className='w-6 sm:w-9 inline-block'>
              <BustadIcon className='w-6 sm:w-9' />
            </a>
            <NavigationBar />
          </div>
          <AccountButton />
        </header>
        <div className='flex justify-center'>
          <div className='flex flex-col pt-5 dialog:w-auto w-full items-center px-2 dialog:px-0'>
            {network !== 'mainnet' && (
              <div className="flex rounded-md w-full mt-2 mb-2">
                <span className='bg-yellow-400 px-3 py-1 rounded font-semibold text-xs'>Network: {network.toUpperCase()}</span>
              </div>)}
            <div className="w-full">
              <PendingTransactionList />
            </div>
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="mint" element={<MintPage />} />
              <Route path="claim" element={<GovernancePage />} />
              <Route path="counter" element={<CounterPage />} />
              <Route path="mint/wallet-selection" element={<WalletSelectionPage />} />
              <Route path="mint/app-store-redirect" element={<MobileRedirectionPage />} />
              <Route path="mint/connect" element={<ConnectPage />} />
              <Route path="mint/funding" element={<FundingPage />} />
              <Route path="stake" element={<StakingPage />} />
              <Route path="reward" element={<RewardPage />} />
              <Route path="stake/:id" element={<StakeIncentiveDetailsPage />} />
              <Route path="admin" element={
                <RestrictedPage>
                  <AdminPage />
                </RestrictedPage>}
              />
              <Route path="admin/reward" element={
                <RestrictedPage>
                  <AdminLPRewardPage />
                </RestrictedPage>}
              />
              <Route path="admin/reward/create" element={
                <RestrictedPage>
                  <AdminCreateLPRewardPage />
                </RestrictedPage>}
              />
              <Route path="admin/reward/:id" element={
                <RestrictedPage>
                  <AdminIncentiveDetailPage />
                </RestrictedPage>}
              />
            </Routes>
          </div>
        </div>
      </div>
      <Dialog />
    </>
  );
}

export default App;