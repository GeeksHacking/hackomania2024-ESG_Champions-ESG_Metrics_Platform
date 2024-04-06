import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Navbar from './navbar';
import logo from "./logo.svg";
import "./App.css";
import ESGForm from "./components/ESGForm";
import Dashboard from "./components/dashboard";
import ESGReport from "./components/ESGReport";

function App() {
  initLocalData();
  return (
    <div className="app">
      <div className="main">
        <Router>
        <Navbar/>
          <Routes>
            <Route path='/'></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/form' element={<ESGForm/>}></Route>
            <Route path='/report' element={<ESGReport/>}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;


function initLocalData() {
  const data = localStorage.getItem("data");
  if (data === null) {
    let data = require("./mockData.json");
    localStorage.setItem("data", JSON.stringify(data));
  }
}