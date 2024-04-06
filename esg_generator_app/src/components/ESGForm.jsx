import React, { useState, useEffect } from "react";

const ESGForm = () => {
  const [data, setData] = useState({});
  const [selectedType, setSelectedType] = useState("carbon");
  const [selectedSite, setSelectedSite] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const [selectedScope, setSelectedScope] = useState("");
  const [selectedValue, setSelectedValue] = useState(0);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("data"));
    if (localStorageData) {
      setData(localStorageData);
    }
  }, []);

  console.log("DATA: ", data);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setSelectedSite("");
    setSelectedYear("");
    setSelectedMonth("");
  };

  const handleSiteChange = (event) => {
    setSelectedSite(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const getUniqueValues = (key) => {
    const values = data[selectedType]?.map((entry) => entry[key]);
    return values ? Array.from(new Set(values)) : [];
  };
  const getUniqueScopes = () => {
    const scopes = [];
    data[selectedType]?.forEach((entry) => {
      if (!scopes.includes(entry.scope)) {
        scopes.push(entry.scope);
      }
    });
    return scopes;
  };

  const handleScopeChange = (event) => {
    setSelectedScope(event.target.value);
  };

  const getUniqueYears = () => {
    const years = [];
    data[selectedType]?.forEach((entry) => {
      const year = new Date(entry.date).getFullYear();
      if (!years.includes(year)) {
        years.push(year);
      }
    });
    return years;
  };

  const getUniqueMonths = () => {
    const months = [];
    data[selectedType]?.forEach((entry) => {
      const month = new Date(entry.date).toLocaleDateString("en-US", {
        month: "short",
      });
      if (!months.includes(month)) {
        months.push(month);
      }
    });
    return months;
  };

  const handleClick = () => {
    let updatedChanges = JSON.parse(localStorage.getItem("data"));
    const entryToUpdate = updatedChanges[selectedType].find(
      (entry) =>
        entry.site === selectedSite &&
        new Date(entry.date).getFullYear() === parseInt(selectedYear) &&
        new Date(entry.date).toLocaleDateString("en-US", { month: "short" }) ===
          selectedMonth &&
        entry.scope === selectedScope
    );

    if (entryToUpdate) {
      setSelectedValue();
      entryToUpdate.amount = parseFloat(selectedValue);
      console.log(entryToUpdate);
      localStorage.setItem("data", JSON.stringify(updatedChanges));
      setData(updatedChanges);
    }
  };

  return (
    <div className="bg-blue-300 flex flex-col justify-center align-center">
      <h1>Input Entry</h1>
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="carbon">carbon</option>
        <option value="energy">energy</option>
        <option value="water">water</option>
        <option value="waste">waste</option>
      </select>
      <select value={selectedSite} onChange={handleSiteChange}>
        <option value="">Select Site</option>
        {selectedType &&
          getUniqueValues("site").map((site, index) => (
            <option key={index} value={site}>
              {site}
            </option>
          ))}
      </select>
      <select value={selectedScope} onChange={handleScopeChange}>
        <option value="">Select Scope</option>
        {selectedType &&
          getUniqueScopes().map((scope, index) => (
            <option key={index} value={scope}>
              {scope}
            </option>
          ))}
      </select>
      <select value={selectedYear} onChange={handleYearChange}>
        <option value="">Select Year</option>
        {selectedType &&
          getUniqueYears().map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
      </select>
      <select value={selectedMonth} onChange={handleMonthChange}>
        <option value="">Select Month</option>
        {selectedType &&
          getUniqueMonths().map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
      </select>
      <input
        type="number"
        placeholder="Value"
        value={selectedValue}
        onChange={(event) => setSelectedValue(event.target.value)}
      />
      <button onClick={handleClick}>Update </button>
    </div>
  );
};

export default ESGForm;
