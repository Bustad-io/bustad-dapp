import './App.css';
import { Route, Routes } from 'react-router-dom';
import MintPage from './pages/MintPage';
import TestCounterPage from './pages/TestCounterPage';
import { NavigationTag } from './components/NavigationTag';
import GovernancePage from './pages/GovernancePage';
import { Dialog } from './features/dialog/Dialog';

function App() {
  return (
    <>
      <div className='bg-DarkPaleBlue h-full'>
        <header>
          <NavigationTag />          
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
