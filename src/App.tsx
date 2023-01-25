import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import MintPage from './pages/MintPage';
import { NavigationTab } from './components/NavigationTab';
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

function App() {
  const location = useLocation();
  const [showNavigationTab, setShowNavigationTab] = useState(true);
  const network = useAppSelector(selectNetwork);

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

  return (
    <>
      <div className='flex flex-col bg-orange-100 dark:bg-gradient-to-br dark:from-DarkPaleBlue dark:to-DarkPaleBlueDarker h-full'>
        <header className='flex pt-2 sm:pt-12 px-2 sm:px-11 items-center'>
          <div className='md:grow'>
            <a href="https://bustad.io" className='w-6 sm:w-12 inline-block'>
              <BustadIcon className='w-6 sm:w-12' />
            </a>
          </div>
          {showNavigationTab && <div className='grow flex justify-between'>
            <div className='relative sm:left-16 ml-6 sm:ml-0'>
              <NavigationTab />
            </div>
            <AccountButton />
          </div>}
        </header>
        <div className='flex justify-center items-center md:h-full'>
          <div className='flex flex-col dialog:w-auto w-full items-center px-2 dialog:px-0'>
            {network !== 'mainnet' && <div className="flex rounded-md w-full mt-2">
              <span className='bg-Anakiwa px-3 py-1 rounded font-semibold text-xs'>Network: {network.toUpperCase()}</span>
            </div>}
            <div className="mb-2">
              <PendingTransactionList />
            </div>
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="mint" element={<MintPage />} />
              <Route path="governance" element={<GovernancePage />} />
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