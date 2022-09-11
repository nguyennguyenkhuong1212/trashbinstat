import PieChart from './components/PieChart';
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
      <div id="container">
          <div id="chartLabel">
              Statistics
          </div>
          <PieChart />
      </div> 
      <footer>
        Money Heist &copy; 2022
      </footer>
    </div>
  );
}

export default App;
