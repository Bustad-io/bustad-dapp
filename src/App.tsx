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

function App() {
  const location = useLocation();
  const [showNavigationTab, setShowNavigationTab] = useState(true);

  useEffect(() => {
    if(location.pathname === '/counter') {
      setShowNavigationTab(false);
    }    
  }, [location.pathname]);

  return (
    <>
      <div className='flex flex-col bg-orange-100 dark:bg-gradient-to-br dark:from-DarkPaleBlue dark:to-DarkPaleBlueDarker h-full'>
        <header className='flex pt-2 sm:pt-12 px-2 sm:px-11 items-center'>
          <div className='md:grow'>
            <a href="https://bustad.io" className='w-6 sm:w-12 inline-block'>
              <BustadIcon className='w-6 sm:w-12'/>
            </a>
          </div>
          {showNavigationTab && <div className='grow flex justify-between'>
            <div className='relative sm:left-16 ml-6 sm:ml-0'>
              <NavigationTab />
            </div>
            <AccountButton />
          </div>}
        </header>
        <div className='flex justify-center items-center h-full'>
          <div className='flex flex-col'>
            <div className="mb-2">
              <PendingTransactionList />
            </div>
            <Routes>
              <Route path="/" element={<MintPage />} />
              <Route path="governance" element={<GovernancePage />} />
              <Route path="counter" element={<CounterPage />} />
            </Routes>
          </div>
        </div>
      </div>
      <Dialog />
    </>
  );
}

export default App;