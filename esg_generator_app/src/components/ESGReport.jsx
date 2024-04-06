import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

const ESGReport = () => {
  const [template, setTemplate] = useState("Loading...");

  useEffect(() => {
    const data = localStorage.getItem("data");
    const dataJson = JSON.parse(data);
    const carbonData = dataJson.carbon;
    const waterData = dataJson.water;
    const energyData = dataJson.energy;
    const wasteData = dataJson.waste;

    const currYear = new Date().getFullYear().toString();
    const prevYear = (new Date().getFullYear() - 1).toString();

    let carbonCurrYearScopeData = [];
    aggregateCarbonScopeData(
      filterByYear(carbonData, currYear),
      carbonCurrYearScopeData,
      "scope"
    );
    console.log("carbonCurrYearScopeData", carbonCurrYearScopeData);

    let carbonPrevYearScopeData = [];
    aggregateCarbonScopeData(
      filterByYear(carbonData, prevYear),
      carbonPrevYearScopeData,
      "scope"
    );
    console.log("carbonPrevYearScopeData", carbonPrevYearScopeData);

    let waterCurrYearData = [];
    aggregateDataByYear(filterByYear(waterData, currYear), waterCurrYearData);
    console.log("waterCurrYearData", waterCurrYearData);

    let waterPrevYearData = [];
    aggregateDataByYear(filterByYear(waterData, prevYear), waterPrevYearData);
    console.log("waterPrevYearData", waterPrevYearData);

    let energyCurrYearData = [];
    aggregateDataByYear(filterByYear(energyData, currYear), energyCurrYearData);
    console.log("energyCurrYearData", energyCurrYearData);

    let energyPrevYearData = [];
    aggregateDataByYear(filterByYear(energyData, prevYear), energyPrevYearData);
    console.log("energyPrevYearData", energyPrevYearData);

    let wasteCurrYearHazardData = [];
    aggregateWasteTypeData(
      filterByYear(wasteData, currYear),
      wasteCurrYearHazardData,
      "type"
    );
    console.log("wasteCurrYearHazardData", wasteCurrYearHazardData);

    let wastePrevYearHazardData = [];
    aggregateWasteTypeData(
      filterByYear(wasteData, prevYear),
      wastePrevYearHazardData,
      "type"
    );
    console.log("wastePrevYearHazardData", wastePrevYearHazardData);

    const metrics = {
      GreenHouseGasEmissions: {
        currentYear: carbonCurrYearScopeData,
        previousYear: carbonPrevYearScopeData,
      },
      WaterConsumption: {
        currentYear: waterCurrYearData,
        previousYear: waterPrevYearData,
      },
      EnergyConsumption: {
        currentYear: energyCurrYearData,
        previousYear: energyPrevYearData,
      },
      WasteGeneration: {
        currentYear: wasteCurrYearHazardData,
        previousYear: wastePrevYearHazardData,
      },
    };

    const prompt = {
      contents: [
        {
          parts: [
            {
              text: `Use these ESG metrics data: ${JSON.stringify(
                metrics
              )} and generate a professional ESG report for my company. Include a markdown table to summarize the metrics data.`,
            },
          ],
        },
      ],
    };
    fetch("https://proxy.kwang-5a2.workers.dev", {
      body: JSON.stringify(prompt),
      headers: {
        apiKey: "AIzaSyAWsblnruBZuSzN__qUqh8oK02qgVfj_ew",
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Process your data here
        if (data.candidates) {
          setTemplate(data.candidates[0].content.parts[0].text);
        }
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
    //   generateReport(setTemplate);
  }, []);

  return (
    <div>
      <h1 className="font-bold pb-10">ESGReport Template</h1>
      <textarea
        rows={10}
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
        className="w-full h-full rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      />
      <MDEditor
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
      />
      <button>Export as Word</button>
    </div>
  );
};

export default ESGReport;

function aggregateCarbonScopeData(dataList, filteredData, scope) {
  dataList.reduce(function (res, value) {
    if (!res[value[scope]]) {
      res[value[scope]] = { scope: value[scope], amount: 0 };
      filteredData.push(res[value[scope]]);
    }
    res[value[scope]].amount += value.amount;
    return res;
  }, {});
}

function aggregateWasteTypeData(dataList, filteredData, type) {
  dataList.reduce(function (res, value) {
    if (!res[value[type]]) {
      res[value[type]] = { type: value[type], amount: 0 };
      filteredData.push(res[value[type]]);
    }
    res[value[type]].amount += value.amount;
    return res;
  }, {});
}

function aggregateDataByYear(dataList, filteredData) {
  dataList.reduce(function (res, value) {
    const year = value.date.split(" ")[1];
    if (!res[year]) {
      res[year] = { year: year, amount: 0 };
      filteredData.push(res[year]);
    }
    res[year].amount += value.amount;
    return res;
  }, {});
}

function filterByYear(data, fullYear) {
  return data.filter((data) => data.date.includes(fullYear));
}
