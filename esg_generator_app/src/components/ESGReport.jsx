import React, { useEffect, useState } from "react";

const ESGReport = () => {
  const [template, setTemplate] = useState("Loading...");

  useEffect(() => {
<<<<<<< HEAD
    const prompt ={
      contents: [
        {
          parts: [
            {
              text: "can you take in these data and generate esg report like a pro?",
            },
          ],
        },
      ],
    }
    fetch(
      "https://proxy.kwang-5a2.workers.dev",
      {
        body: JSON.stringify(prompt),
        headers: {
          apiKey: "AIzaSyAWsblnruBZuSzN__qUqh8oK02qgVfj_ew",
          "Content-Type": "application/json"
        },
        method: "POST",
      }
    )
      .then((data) => setTemplate(data))
      .catch((error) => {
        console.log(error);
        alert("Error fetching template report");
      });
=======
    generateReport(setTemplate);
>>>>>>> cc5fdb5a6d09cc2bb20cfbe3ded9555f9a016a3d
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
      <button>Export as Word</button>
    </div>
  );
};

export default ESGReport;

async function generateReport(setTemplate) {
  const data = localStorage.getItem("data");
  const bodyData = JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: `can you take in the following data and generate esg report like a pro? \n${data}`,
          },
        ],
      },
    ],
  });
  await fetch(
    "http://localhost:8010/proxy/v1beta/models/gemini-pro:generateContent?key=AIzaSyAWsblnruBZuSzN__qUqh8oK02qgVfj_ew",
    {
      body: bodyData,
      headers: {
        apiKey: "AIzaSyAWsblnruBZuSzN__qUqh8oK02qgVfj_ew",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": ["POST, GET"],
      },
      method: "POST",
    }
  ).then((response) => {
    response.json().then((data) => {
      const report = data.candidates[0].content.parts[0].text;
      setTemplate(report);
    });
  });
}
