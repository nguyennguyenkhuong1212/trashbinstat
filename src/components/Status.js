import React, { useState, useEffect } from 'react'

const Status = () => {
    const [ status1, setStatus1 ] = useState("...");
    const [ status2, setStatus2 ] = useState("...");
    const [ status3, setStatus3 ] = useState("...");
    const [ status4, setStatus4 ] = useState("...");
    const [ status5, setStatus5 ] = useState("...");
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
            setStatus1((response.field3 == 1 ? "YES" : "NO"));
            setStatus2((response.field4 == 2 ? "YES" : "NO"));
            setStatus3((response.field4 == 0 ? "YES" : "NO"));
            setStatus4((response.field5 == 2 ? "YES" : "NO"));
            setStatus5((response.field5 == 0 ? "YES" : "NO"));
        }
        fetchData();
    }, []);
  return (
    <div className='outside'>
        <div id="status">
          <div className="left">Is Open: </div>
          <div className="right" style={{color: (status1 == "YES" ? 'green' : 'red')}}>{status1}</div>
        </div>
        <div id="status">
          <div className="left">Is Full (R / N): </div>
          <div className="right" style={{color: "black"}}>
            <div style={{color: (status2 == "YES" ? 'green' : 'red'), "padding-right": "3px"}}>{status2}</div>
            /
            <div style={{color: (status4 == "YES" ? 'green' : 'red'), "padding-left": "3px"}}>{status4}</div>
          </div>
        </div>
        <div id="status">
          <div className="left">Is Empty (R / N): </div>
          <div className="right" style={{color: "black"}}>
            <div style={{color: (status3 == "YES" ? 'green' : 'red'), "padding-right": "3px"}}>{status3}</div>
            /
            <div style={{color: (status5 == "YES" ? 'green' : 'red'), "padding-left": "3px"}}>{status5}</div>
          </div>
        </div>
    </div>
  )
}

export default Status