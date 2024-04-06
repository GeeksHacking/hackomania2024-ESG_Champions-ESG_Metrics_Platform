import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, PointElement, LineElement, Title,
  BarElement
 } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';
import Select from 'react-select';

const Dashboard = () => {
    // first visualisation
    const data = JSON.parse(localStorage.getItem("data"));
    console.log(data);
    
    const [topic, setTopic] = useState('carbon');
    const [topicLabel, setTopicLabel] = useState('Green House Gas Emmission')
    const [locationData, setLocationData] = useState([]);

    const pieOptions = {
      responsive: true,
      plugins: {
          legend: {
              position: 'top'
          },
          title: {
          display: true,
          text: topicLabel + 'by Location',
          },
      },
      };

    const topicList = [
      { "label": "Green House Gas Emmission", "value": "carbon" },
      { "label": "Water Consumption", "value": "water" },
      { "label": "Waste Generation", "value": "waste" },
      { "label": "Energy Consumption", "value": "energy" },
    ];

    function handleSelectTopic(topic){
      setTopic(topic.value);
      setTopicLabel(topic.label);
  }
    function getLocationData(){
      const topicData = data[topic];
      var filteredData = [];
      topicData.reduce(function(res, value) {
        if (!res[value.site]) {
          res[value.site] = { site: value.site, amount: 0 };
          filteredData.push(res[value.site])
        }
        res[value.site].amount += value.amount;
        return res;
      }, {});

      console.log(filteredData);

    if (topicData.length === 0){
        setLocationData(null);
    }
    else{
      setLocationData({
        labels: filteredData.map((x) => x.site),
        datasets: [
            {
            label: '# of Kilo Tons',
            data: filteredData.map((x) => x.amount),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            },
        ],
        });
    }
    }

  function handlePrint(){
    console.log(topic);
    console.log(locationData);
  }
  useEffect(() => {
    getLocationData();
}, [topic]);

    return(
      <div>
        <h1>ESG Interative Dashboard</h1>
        <Select
            defaultValue={topicList[0]}
            isSearchable={true}
            options={topicList}
            onChange={handleSelectTopic}
        />
        {/* {locationData?<Pie options={pieOptions} data={locationData}/>: 'Sorry, data is not available for this filter, please try something else!'} */}
        <button className="bg-blue-500 text-white" onClick={() => {handlePrint();}}>Print</button>
      </div>
      
    )
}

export default Dashboard