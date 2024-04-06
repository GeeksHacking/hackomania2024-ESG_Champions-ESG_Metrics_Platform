import logo from "./logo.svg";
import "./App.css";

function App() {
  initLocalData();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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
