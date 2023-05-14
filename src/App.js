import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Navbar from './components/shared/Navbar';
import Homepage from './pages/Homepage';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Homepage />
    </div>
  );
}

export default App;
