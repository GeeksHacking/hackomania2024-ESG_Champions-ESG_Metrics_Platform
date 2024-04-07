import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Dashboard from "./components/dashboard";
import ESGReport from "./components/ESGReport";
import AddForm from "./components/AddForm";
import StickyNavBar from "./components/StickyNavBar";
import References from "./components/Reference";

function App() {
  initLocalData();
  return (
    <div className="app">
      <div className="main">
        <Router>
          <StickyNavBar />
          <div className="pt-20">
            <Routes> 
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/form" element={<AddForm />}></Route>
              <Route path="/report" element={<ESGReport />}></Route>
              <Route path="/references" element={<References />}></Route>
            </Routes>
          </div>
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
