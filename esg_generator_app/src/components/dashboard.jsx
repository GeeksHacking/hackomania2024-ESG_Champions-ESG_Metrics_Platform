import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, PointElement, LineElement, Title,
  BarElement
 } from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';
import Select from 'react-select';
import DataTable from 'react-data-table-component';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, BarElement);

const Dashboard = () => {
    // first visualisation
    const data = JSON.parse(localStorage.getItem("data"));
    console.log(data);
    
    const [topic, setTopic] = useState('carbon');
    const [topicLabel, setTopicLabel] = useState('Green House Gas Emmission')
    const [locationData, setLocationData] = useState();
    const [periodicData, setPeriodicData] = useState();
    const [economicOutput, setEconomicOutput] = useState();
    const [longData, setLongData] = useState();
    const [dtColumns, setDTColumns] = useState();

    const pieOptions = {
      responsive: true,
      plugins: {
          legend: {
              position: 'top'
          },
          title: {
          display: true,
          text: topicLabel + ' by Location',
          },
      },
      };
    
    const lineConsumptionOptions = {
      responsive: true,
      plugins: {
        legend: {
          display:false
        },
        title: {
          display: true,
          text: "Monthly " + topicLabel,
        },
      },
      };
    
    const lineEOOptions = {
      responsive: true,
      plugins: {
        legend: {
          display:false
        },
        title: {
          display: true,
          text: "Monthly Economic Ouput",
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

    if (filteredData.length === 0){
        setLocationData([]);
    }
    else{
      setLocationData({
        labels: filteredData.map((x) => x.site),
        datasets: [
            {
            label: topicLabel + 'by Location',
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

    function getPeriodicData(){
      const topicData = data[topic];
      const eoData = data["economicOutput"]
      
      var filteredData = [];
      topicData.reduce(function(res, value) {
        if (!res[value.date]) {
          res[value.date] = { date: value.date, amount: 0 };
          filteredData.push(res[value.date])
        }
        res[value.date].amount += value.amount;
        return res;
      }, {});
      filteredData =filteredData.reduce((obj, item) => Object.assign(obj, { [Date.parse(item.date)]: item.amount }), {});
      filteredData = Object.keys(filteredData).sort().reduce(
            (obj, key) => { 
              obj[key] = filteredData[key]; 
              return obj;
            }, 
            {}
          );
      Object.keys(filteredData).forEach(key => {
            filteredData[`${new Date(parseInt(key)).toLocaleString('default', { month: 'short' })}-${new Date(parseInt(key)).getFullYear().toString()}`] = filteredData[key];
            delete filteredData[key];
        });
        setPeriodicData({
          labels:Object.keys(filteredData),
          datasets:[{
          label: "Monthly " + topicLabel,
          data: filteredData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
          }]
      });
      
        var eoSortedData = [];
        eoData.reduce(function(res, value) {
          if (!res[value.date]) {
            res[value.date] = { date: value.date, amount: 0 };
            eoSortedData.push(res[value.date])
          }
          res[value.date].amount += value.amount;
          return res;
        }, {});
        eoSortedData =eoSortedData.reduce((obj, item) => Object.assign(obj, { [Date.parse(item.date)]: item.amount }), {});
        eoSortedData = Object.keys(eoSortedData).sort().reduce(
              (obj, key) => { 
                obj[key] = eoSortedData[key]; 
                return obj;
              }, 
              {}
            );
        Object.keys(eoSortedData).forEach(key => {
          eoSortedData[`${new Date(parseInt(key)).toLocaleString('default', { month: 'short' })}-${new Date(parseInt(key)).getFullYear().toString()}`] = eoSortedData[key];
              delete eoSortedData[key];
          });

      setEconomicOutput({
        labels:Object.keys(eoSortedData),
          datasets:[{
          label: "Monthly Economic Output",
          data: eoSortedData,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
          }]
      })
      }

    function getLongData(){
      let topicData = data[topic];
      topicData.forEach((item) => {
        item["date_num"] = new Date(Date.parse(item["date"])).getFullYear().toString() + "/" +("0"+(new Date(Date.parse(item["date"])).getMonth()+ 1).toString()).slice(-2);
      });
      let columns = [
        {
          name: 'Date (YYYY-MM)',
          selector: row => row.date_num,
          sortable: true,
        },
        {
          name: 'Site',
          selector: row => row.site,
          sortable: true,
        },
        
      ];
      if (topic === "carbon"){
        columns.push({
          name: 'Scope',
          selector: row => row.scope,
          sortable: true,
        });
      }
      if (topic === "waste"){
        columns.push({
          name: 'Type',
          selector: row => row.type,
          sortable: true,
        });
      }
      columns.push({
        name: 'Value',
        selector: row => row.amount,
        sortable: true,
      });
      setLongData(topicData);
      setDTColumns(columns);
      }

    useEffect(() => {
      getLocationData();
      getPeriodicData();
      getLongData();
      }, [topic]);

    return(
      <div className='mx-10'>
        <div className='w-1/5'>
          <Select
              defaultValue={topicList[0]}
              isSearchable={true}
              options={topicList}
              onChange={handleSelectTopic}
          />
        </div>
        <div class="inline-grid grid-cols-3 w-fit h-1/2">
          <div >
            {locationData?<Pie options={pieOptions} data={locationData}/>: 'Sorry, data is not available for this filter, please try something else!'}
          </div>
        <div>
        {periodicData? <Line options={lineConsumptionOptions} data={periodicData} />: 'Sorry, data is not available for this filter, please try something else!'}
        {periodicData? <Line options={lineEOOptions} data={economicOutput} />: 'Sorry, data is not available for this filter, please try something else!'}
        </div>
        <div>
          <DataTable
                  columns={dtColumns}
                  data={longData}
                  pagination
                />
        </div>
      </div>
      </div>
      
    )
}

export default Dashboard