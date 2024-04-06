import React, { useEffect, useState } from "react";

const ESGReport = () => {
  const [template, setTemplate] = useState("Loading...");

  useEffect(() => {

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
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      // Process your data here
      if(data.candidates){
        setTemplate(data.candidates[0].content.parts[0].text);
      }
    })
    .catch(error => {
      console.error('There was a problem with your fetch operation:', error);
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
      <button>Export as Word</button>
    </div>
  );
};

export default ESGReport;
