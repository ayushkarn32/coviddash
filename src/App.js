import './App.css';
import Cards from './Cards';
import TimelineChart from './components/TimelineChart';
import StateStats from './components/StateStats';
// import MapIndia  from './maps/MapIndia';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='site-brand highlighted-text'>Covid-19 Dashboard <span className='faded-text'>(India)</span></div>
      </header>
      <div className='main-container'>
        <div className='row-box'>
          <Cards/>
        </div>
        <div className='row-box'>
            <div className='timeline-charts'>
              <TimelineChart/>
            </div>
        </div>
      </div>
      <div className='result-stats'>
      <div className='state-stats-container'>
        <StateStats/>
      </div>
      </div>
    </div>
  );
}

export default App;
