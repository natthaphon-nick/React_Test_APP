import logo from './logo.svg';
import Headers from './Layout/Header';
import Home from './Page/Home';
import Item from './Page/Item';
import Checkbill from './Page/Checkbill';
import Cart from './Page/Cart';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Headers/>
        <Routes>
          <Route exact path="/Home" Component={Home} />
          <Route exact path="/Item" Component={Item} />
          <Route exact path="/Checkbill" Component={Checkbill} />
          <Route exact path="/Cart" Component={Cart} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
