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
    const economicOutputData = dataJson.economicOutput;

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

    let economicOutputPrevYearData = [];
    aggregateDataByYear(
      filterByYear(economicOutputData, prevYear),
      economicOutputPrevYearData
    );
    console.log("economicOutputPrevYearData", economicOutputPrevYearData);

    let economicOutputCurrYearData = [];
    aggregateDataByYear(
      filterByYear(economicOutputData, currYear),
      economicOutputCurrYearData
    );
    console.log("economicOutputCurrYearData", economicOutputCurrYearData);

    let energyCurrYearIntensity = Object.assign({}, energyCurrYearData[0]);
    energyCurrYearIntensity.amount /= economicOutputCurrYearData[0].amount;

    let energyPrevYearIntensity = Object.assign({}, energyPrevYearData[0]);
    energyPrevYearIntensity.amount /= economicOutputPrevYearData[0].amount;

    let waterCurrYearIntensity = Object.assign({}, waterCurrYearData[0]);
    waterCurrYearIntensity.amount /= economicOutputCurrYearData[0].amount;

    let waterPrevYearIntensity = Object.assign({}, waterPrevYearData[0]);
    waterPrevYearIntensity.amount /= economicOutputPrevYearData[0].amount;

    let carbonCurrYearIntensity = JSON.parse(
      JSON.stringify(carbonCurrYearScopeData)
    );
    carbonCurrYearIntensity.forEach(
      (carbon) => (carbon.amount /= economicOutputCurrYearData[0].amount)
    );
    console.log("carbonCurrYearIntensity", carbonCurrYearIntensity);

    let carbonPrevYearIntensity = JSON.parse(
      JSON.stringify(carbonPrevYearScopeData)
    );
    carbonPrevYearIntensity.forEach(
      (carbon) => (carbon.amount /= economicOutputPrevYearData[0].amount)
    );
    console.log("carbonPrevYearIntensity", carbonPrevYearIntensity);

    let wasteCurrYearIntensity = JSON.parse(
      JSON.stringify(wasteCurrYearHazardData)
    );
    wasteCurrYearIntensity.forEach(
      (waste) => (waste.amount /= economicOutputCurrYearData[0].amount)
    );

    let wastePrevYearIntensity = JSON.parse(
      JSON.stringify(wastePrevYearHazardData)
    );
    wastePrevYearIntensity.forEach(
      (waste) => (waste.amount /= economicOutputPrevYearData[0].amount)
    );

    const absoluteMetrics = {
      GreenHouseGasEmissions: {
        currentYear: carbonCurrYearScopeData,
        previousYear: carbonPrevYearScopeData,
      },
      WaterConsumption: {
        currentYear: waterCurrYearData[0],
        previousYear: waterPrevYearData[0],
      },
      EnergyConsumption: {
        currentYear: energyCurrYearData[0],
        previousYear: energyPrevYearData[0],
      },
      WasteGeneration: {
        currentYear: wasteCurrYearHazardData,
        previousYear: wastePrevYearHazardData,
      },
    };

    const intensityMetrics = {
      GreenHouseGasEmissionsIntensity: {
        currentYear: carbonCurrYearIntensity,
        previousYear: carbonPrevYearIntensity,
      },
      WaterConsumptionIntensity: {
        currentYear: waterCurrYearIntensity,
        previousYear: waterPrevYearIntensity,
      },
      EnergyConsumptionIntensity: {
        currentYear: energyCurrYearIntensity,
        previousYear: energyPrevYearIntensity,
      },
      WasteGenerationIntensity: {
        currentYear: wasteCurrYearIntensity,
        previousYear: wastePrevYearIntensity,
      },
    };

    console.log("absoluteMetrics", absoluteMetrics);
    console.log("intensityMetrics", intensityMetrics);

    const prompt = {
      contents: [
        {
          parts: [
            {
              text: `Use these ESG total consumption metrics data: ${JSON.stringify(
                absoluteMetrics
              )}, intensity metrics data: ${JSON.stringify(
                intensityMetrics
              )} and generate a professional ESG report for my company. Include a markdown table for the consumption metrics data and a markdown table for the intensity metrics data, with their respective units.`,
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
    <div className="mx-10">
      <h1 className="font-bold pb-10">ESG Report Template</h1>
      <MDEditor value={template} height="75%" onChange={setTemplate} />
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
