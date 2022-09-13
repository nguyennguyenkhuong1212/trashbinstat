import PieChart from './components/PieChart';
import Status from './components/Status';
import './App.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = "Trashbin 1.0";
  }, [])
  return (
    <div className="App">
      <header>
        TRASHBIN 1.0
      </header>
      <div className='centered'>
        <div className="container" id="stat">
            <div id="Label">
                Statistics
            </div>
            <PieChart />
        </div> 
        <div className="container" id="stt">
            <div id="Label">
                Status
            </div>
            <Status />
        </div> 
      </div>
      <footer>
        Money Heist &copy; 2022
      </footer>
    </div>
  );
}

export default App;
