import React, { useState } from "react";

function Form() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div>
        <select value={selectedOption} onChange={handleDropdownChange}>
          <option value="" disabled>
            select form type
          </option>
          <option>Carbon</option>
          <option>Energy</option>
          <option>Water</option>
          <option>Waste</option>
        </select>
      </div>
      <form className="flex flex-col w-full max-w-sm mx-auto space-y-4 p-4 bg-white shadow-md rounded-md">
        <h1>{selectedOption || "Select form type"}</h1>
        <label className="text-gray-700">Site</label>
        <input
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          type="text"
          // value={formData.date} // controlled by defining the state right from the start
          placeholder="Today"
          required
          // onChange={(e) => {
          //   setFormData({
          //     ...formData,
          //     date: e.target.value,
          //   });
          // }}
        />

        <label className="text-gray-700">Scope</label>
        <select
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          // value={formData.type || ""}
          required
          // onChange={(e) => {
          //   setFormData({
          //     ...formData,
          //     type: e.target.value,
          //     category: "",
          //   });
          // }}
        >
          <option value="" disabled>
            Select a scope
          </option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>

        <label className="text-gray-700">Date</label>
        <input
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          // value={formData.category || ""}
          type="date"
          required
          // onChange={(e) => {
          //   setFormData({
          //     ...formData,
          //     category: e.target.value,
          //   });
          // }}
        >
          {/* {formData.type === "Income" ? (
            <>
              <option value="" disabled>
                Select a category
              </option>
              <option>Salary</option>
              <option>Investment</option>
              <option>Part-Time</option>
            </>
          ) : (
            <>
              <option value="" disabled>
                Select a category
              </option>
              <option>Food</option>
              <option>Shopping</option>
              <option>Entertainment</option>
              <option>Transport</option>
              <option>Utilities</option>
            </>
          )} */}
        </input>

        <label className="text-gray-700">Amount</label>
        <input
          type="number"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          // value={formData.amount || ""}
          required
          autoFocus
          min="0"
          step=".01"
          // onChange={(e) => {
          //   // const inputValue = e.target.value;
          //   // if (/^\d*\.?\d*$/.test(inputValue)) {
          //   setFormData({
          //     ...formData,
          //     amount: parseFloat(parseFloat(e.target.value).toFixed(2)), // toFixed returns a string
          //   });

          //   // }
          // }}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default Form;
