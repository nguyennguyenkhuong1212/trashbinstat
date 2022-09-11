import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const defaultData = {
    labels: ['Recyclable', 'Non-recyclable'],
    datasets: [
      {
        label: 'Statistics on the amount of two different types of trash',
        backgroundColor: ['rgba(38, 221, 200, 0.2)', 'rgba(5, 82, 103, 0.2)'],
        borderColor: ['rgb(38, 221, 200)', 'rgb(5, 82, 103)'],
        data: [0, 0],
        borderWidth: 1,
      },
    ]
};

const PieChart = () => {
    const [ currentData, setCurrentData ] = useState(defaultData);
    const process = async () => {
        const getData = async (url) => {
            const response = await fetch(url, {
              method: 'GET', 
              url: url,
              headers: {
                'Content-Type': 'application/json'
              },
            });
            return response.json();
        }
        const res = await getData('https://api.thingspeak.com/channels/1854425/feeds.json?api_key=MX7U5Z7LKR8OCEMX&results=2');
        return(res.feeds[res.feeds.length-1]);
    }
    
    const labels = ['Recyclable', 'Non-recyclable']

    useEffect(() => {
        async function fetchData(){
            const response = await process();
            const temp = {
                labels: labels,
                datasets: [
                  {
                    label: 'Statistics on the amount of two different types of trash',
                    backgroundColor: ['rgba(38, 221, 200, 0.2)', 'rgba(5, 82, 103, 0.2)'],
                    borderColor: ['rgb(38, 221, 200)', 'rgb(5, 82, 103)'],
                    data: [response.field1, response.field2],
                    borderWidth: 1,
                  },
                ]
            };
            setCurrentData(temp);
        }
        fetchData();
    }, []);

    return (
        <div>
            <Doughnut 
                data={currentData}
                height={500}
                width={500}
                options={{
                  maintainAspectRatio: false,
                  legend: {
                    labels: {
                      fontSize: 30,
                    },
                  },
                }}
            />
        </div>
    )
}

export default PieChart