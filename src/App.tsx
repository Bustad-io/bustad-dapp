import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import MintPage from './pages/MintPage';
import TestCounterPage from './pages/TestCounterPage';
import { NavigationTag } from './components/NavigationTag';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <NavigationTag/>
      <Routes>
        <Route path="/" element={<MintPage />} />
        <Route path="test" element={<TestCounterPage />} />
      </Routes>
      </header>
    </div>
  );
}

export default App;
