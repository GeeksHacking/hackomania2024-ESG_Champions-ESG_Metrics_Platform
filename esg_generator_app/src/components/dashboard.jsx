import React, { useState } from 'react';


const Dashboard = () => {
    // first visualisation
    
    return(
        <div className="bg-blue-300">
      Input Entry
      {/* Pass handleClick, not the result of calling handleClick */}
      <input placeholder="Site / prob dropdown is better?" />
      <input placeholder="Date" />
      <input placeholder="Value" />
    </div>
    )
}

export default Dashboard