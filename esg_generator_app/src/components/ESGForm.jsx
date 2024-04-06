import React from "react";

const ESGForm = () => {
  function updateLocalData(newdata) {

    localStorage.setItem("data", JSON.stringify(newdata));
  }

  // Define a function that calls updateLocalData with an empty object
  const handleClick = () => {
    //get localstorage.data, update data based on required changes
    let updatedChanges = JSON.parse(localStorage.data);
//start changing stuff here depending on how we structure the form?
    updateLocalData(updatedChanges);
  };

  return (
    <div className="bg-blue-300">
      Input Entry
      {/* Pass handleClick, not the result of calling handleClick */}
      <input placeholder="Site / prob dropdown is better?" />
      <input placeholder="Date" />
      <input placeholder="Value" />
      <button onClick={handleClick}>Update </button>
    </div>
  );
};

export default ESGForm;
