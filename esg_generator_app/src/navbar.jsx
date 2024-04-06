import './navbar.css'
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  function handleNavigate(path){
    navigate(path);
  }
  return (
    <div className="navbar">
      <div className="links-container">
      <button className='link' onClick={() => {handleNavigate('/dashboard');}} value={'test'}>
          Dashboard
      </button>
      <button className='link' onClick={() => {handleNavigate('/form');}}>
          Form
      </button>
      <button className='link' onClick={() => {handleNavigate('/report');}}>
          Report
      </button>
      </div>
    </div>
    );
  }
   
  export default Navbar;