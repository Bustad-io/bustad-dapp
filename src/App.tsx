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
        <header className='flex pt-2 sm:pt-12 px-2 sm:px-11 items-center'>
          <div className='md:grow'>
            <BustadIcon className='w-6 sm:w-12'/>
          </div>
          <div className='grow flex justify-between'>
            <div className='relative sm:left-16 ml-6 sm:ml-0'>
              <NavigationTab />
            </div>
            <AccountButton />  
          </div>          
        </header>
        <div className='flex justify-center items-center h-full'>
          <Routes>
            <Route path="/" element={<MintPage />} />
            <Route path="governance" element={<GovernancePage />} />            
          </Routes>
        </div>        
      </div>
      <Dialog/>
    </>
  );
}

export default App;