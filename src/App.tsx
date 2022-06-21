import './App.css';
import { Route, Routes } from 'react-router-dom';
import MintPage from './pages/MintPage';
import TestCounterPage from './pages/TestCounterPage';
import { NavigationTab } from './components/NavigationTab';
import GovernancePage from './pages/GovernancePage';
import { Dialog } from './features/dialog/Dialog';
import { AccountButton } from './components/AccountButton';
import { ReactComponent as BustadIcon } from './assets/icons/BustadIcon.svg';

function App() {
  return (
    <>
      <div className='flex flex-col bg-orange-100 dark:bg-gradient-to-br dark:from-DarkPaleBlue dark:to-DarkPaleBlueDarker h-full'>
        <header className='flex items-center pt-12 justify-between px-11'>
          <BustadIcon className='w-12'/>
          <div className='relative left-16'>
            <NavigationTab />
          </div>
          <AccountButton />  
        </header>
        <div className='flex justify-center items-center h-full'>
          <Routes>
            <Route path="/" element={<MintPage />} />
            <Route path="governance" element={<GovernancePage />} />
            <Route path="test" element={<TestCounterPage />} />
          </Routes>
        </div>        
      </div>
      <Dialog/>
    </>
  );
}

export default App;