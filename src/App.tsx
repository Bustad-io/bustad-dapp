import './App.css';
import { Route, Routes } from 'react-router-dom';
import MintPage from './pages/MintPage';
import TestCounterPage from './pages/TestCounterPage';
import { NavigationTab } from './components/NavigationTab';
import GovernancePage from './pages/GovernancePage';
import { Dialog } from './features/dialog/Dialog';
import { AccountButton } from './components/AccountButton';

function App() {
  return (
    <>
      <div className='flex flex-col bg-DarkPaleBlue h-full'>
        <header>
          <div className='relative top-5 flex justify-center'>            
            <NavigationTab />
          </div>
          <AccountButton />  
        </header>
        <div className='flex justify-center items-center'>
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
