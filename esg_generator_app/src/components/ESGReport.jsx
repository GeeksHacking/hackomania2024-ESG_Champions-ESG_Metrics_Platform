import React, { useEffect, useState } from "react";

const ESGReport = () => {
  const [template, setTemplate] = useState("");

  useEffect(() => {
    fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAWsblnruBZuSzN__qUqh8oK02qgVfj_ew",
      {
        body: {
          contents: [
            {
              parts: [
                {
                  text: "can you take in these data and generate esg report like a pro?",
                },
              ],
            },
          ],
        },
        headers: {
          apiKey: "AIzaSyAWsblnruBZuSzN__qUqh8oK02qgVfj_ew",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Methods": "POST, GET",
        },
        method: "POST",
      }
    )
      .then((data) => setTemplate(data))
      .catch((error) => {
        console.log(error);
        alert("Error fetching template report");
      });
  });

  return (
    <div>
      <h1>ESGReport Template</h1>
      <textarea value={template} />
    </div>
  );
};

export default ESGReport;
