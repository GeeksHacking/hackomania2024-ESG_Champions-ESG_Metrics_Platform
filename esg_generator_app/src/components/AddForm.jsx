import React, { useState } from "react";

function AddForm() {
  const [formData, setFormData] = useState({});
  const [selectedOption, setSelectedOption] = useState("");

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  function submitHandler(e) {
    e.preventDefault();

    const existingData = JSON.parse(localStorage.getItem("data")) || {};
    const selectedOptionKey = selectedOption.toLowerCase();

    // check if key exists
    existingData[selectedOptionKey] = existingData[selectedOptionKey] || [];

    // Convert the input date string to a Date object
    const selectedDate = new Date(formData.date);

    // // Extract the month and year from the Date object
    const month = selectedDate.toLocaleString("en-US", {
      month: "short",
    });
    const year = selectedDate.getFullYear();

    // // Format the date as "MMM YYYY"
    const formattedDate = `${month} ${year}`;

    formData.date = formattedDate;

    existingData[selectedOptionKey].push(formData);

    localStorage.setItem("data", JSON.stringify(existingData));

    setFormData({});

    console.log(existingData);
  }

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
          <option>Economic Output</option>
        </select>
      </div>
      <form
        onSubmit={submitHandler}
        className="flex flex-col w-full max-w-sm mx-auto space-y-4 p-4 bg-white shadow-md rounded-md"
      >
        {selectedOption === "Economic Output" ? null : (
          <>
            <label className="text-gray-700">Site</label>
            <input
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              type="text"
              value={formData.site || ""}
              placeholder="Site"
              required
              onChange={(e) => {
                setFormData({
                  ...formData,
                  site: e.target.value,
                });
              }}
            />
          </>
        )}

        {selectedOption === "Carbon" && (
          <>
            <label className="text-gray-700">Scope</label>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              value={formData.scope || ""}
              required
              onChange={(e) => {
                setFormData({
                  ...formData,
                  scope: e.target.value,
                });
              }}
            >
              <option value="" disabled>
                Select a scope
              </option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </>
        )}

        {selectedOption === "Waste" && (
          <>
            <label className="text-gray-700">Type</label>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              value={formData.type || ""}
              required
              onChange={(e) => {
                setFormData({
                  ...formData,
                  type: e.target.value,
                });
              }}
            >
              <option value="" disabled>
                Select a waste type
              </option>
              <option>Recycled</option>
              <option>Hazardous</option>
            </select>
          </>
        )}

        <label className="text-gray-700">Date</label>
        <input
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          value={formData.date || ""}
          type="date"
          required
          onChange={(e) => {
            setFormData({
              ...formData,
              date: e.target.value,
            });
          }}
        />

        <label className="text-gray-700">Amount</label>
        <input
          type="number"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          value={formData.amount || ""}
          required
          autoFocus
          min="0"
          step=".01"
          onChange={(e) => {
            setFormData({
              ...formData,
              amount: parseFloat(e.target.value),
            });
          }}
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

export default AddForm;
