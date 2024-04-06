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
      setLocationData(topicData);
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