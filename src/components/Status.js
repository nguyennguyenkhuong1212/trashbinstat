import React, { useState, useEffect } from 'react'

const Status = () => {
    const [ currentData, setCurrentData ] = useState(0);
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
    
    useEffect(() => {
        async function fetchData(){
            const response = await process();
            setCurrentData((response.field3 == 1 ? "OPEN" : "CLOSE"));
        }
        fetchData();
    }, []);
  return (
    <div className='outside'>
        <div id="status1">
          <div className="left">Trashbin's lid status: </div>
          <div className="right" style={{color: (currentData == "OPEN" ? 'rgb(38, 221, 200)' : 'rgb(5, 82, 103)')}}>{currentData}</div>
        </div>
    </div>
  )
}

export default Status