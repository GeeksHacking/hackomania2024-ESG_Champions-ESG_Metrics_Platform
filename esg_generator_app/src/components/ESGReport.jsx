import React, { useEffect, useState } from "react";

const ESGReport = () => {
  const [template, setTemplate] = useState("");

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
      .then((data) => setTemplate(data))
      .catch((error) => {
        console.log(error);
        alert("Error fetching template report");
      });
  }, []);

  return (
    <div>
      <h1>ESGReport Template</h1>
      <textarea value={template} onChange={(e) => setTemplate(e.target.value)} />
    </div>
  );
};

export default ESGReport;
