import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import MintPage from './pages/MintPage';
import TestCounterPage from './pages/TestCounterPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Routes>
        <Route path="/" element={<MintPage />} />
        <Route path="test" element={<TestCounterPage />} />
      </Routes>      
        {/* <Link to="test">Test</Link> */}
      </header>
    </div>
  );
}

export default App;
