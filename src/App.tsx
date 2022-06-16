import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import MintPage from './pages/MintPage';
import TestCounterPage from './pages/TestCounterPage';
import { NavigationTag } from './components/NavigationTag';
import GovernancePage from './pages/GovernancePage';
import PendingDialog from './features/dialog/PendingDialog';
import SubmittedDialog from './features/dialog/SubmittedDialog';
import RejectedDialog from './features/dialog/RejectedDialog';

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <NavigationTag />
          <Routes>
            <Route path="/" element={<MintPage />} />
            <Route path="governance" element={<GovernancePage />} />
            <Route path="test" element={<TestCounterPage />} />
          </Routes>
        </header>
      </div>
      <PendingDialog />
      <SubmittedDialog />
      <RejectedDialog />
    </>

  );
}

export default App;
