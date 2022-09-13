import React, { useState, useEffect } from 'react'

const Status = () => {
    const [ status1, setStatus1 ] = useState("...");
    const [ status2, setStatus2 ] = useState("...");
    const [ status3, setStatus3 ] = useState("...");
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
            setStatus1((response.field3 == 1 ? "OPEN" : "CLOSE"));
            setStatus2((response.field4 == 2 ? "YES" : "NO"));
            setStatus3((response.field4 == 0 ? "YES" : "NO"));
        }
        fetchData();
    }, []);
  return (
    <div className='outside'>
        <div id="status">
          <div className="left">Is Open: </div>
          <div className="right" style={{color: (status1 == "OPEN" ? 'rgb(38, 221, 200)' : 'rgb(5, 82, 103)')}}>{status1}</div>
        </div>
        <div id="status">
          <div className="left">Is Full: </div>
          <div className="right" style={{color: (status2 == "YES" ? 'green' : 'red')}}>{status2}</div>
        </div>
        <div id="status">
          <div className="left">Is Empty: </div>
          <div className="right" style={{color: (status3 == "YES" ? 'green' : 'red')}}>{status3}</div>
        </div>
    </div>
  )
}

export default Status