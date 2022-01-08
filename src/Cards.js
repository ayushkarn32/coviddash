import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import './App.css';

export default function Cards() {
    const [result, setresult] = useState([]);
    const [total, settotal] = useState([]);

  const getdata = async () => {
    const response = await axios
      .get(`https://data.covid19india.org/v4/min/data.min.json`)
      .catch((error) => console.log(error));
    setresult(response.data);
    };
  useEffect(() => {
    getdata();
    getTotal();
  }, [result]);
  
  
  const getTotal= ()=>{
        let totalCases=0;
        let totalDeaths=0;
        let totalRecovered=0;
        for(const states in result){
            totalCases+=result[states].total.confirmed;
            totalDeaths+=result[states].total.deceased;
            totalRecovered+=result[states].total.recovered;
        }
        let totalData=[{totalconfirm:totalCases.toLocaleString(),totalactive:(totalCases-totalRecovered-totalDeaths).toLocaleString(),totaldead:totalDeaths.toLocaleString(),totalrecovered:totalRecovered.toLocaleString()}];
        settotal(totalData);
  }


    return (
        <div className='cases-main-wrapper'>
            <div className='cases-container'>
              <p className='case-title'>Total Cases</p>
                <p className='case-number text-red'>{total.length!==0 ? total[0].totalconfirm : null}</p>
            </div>
            <div className='cases-container'>
              <p className='case-title'>Total Active</p>
              <p className='case-number text-orange'>{total.length!==0 ? total[0].totalactive : null}</p>
            </div>
            <div className='cases-container'>
              <p className='case-title'>Total Recovered</p>
              <p className='case-number text-green'>{total.length!==0 ? total[0].totalrecovered : null}</p>
            </div>
            <div className='cases-container'>
              <p className='case-title'>Total Deaths</p>
              <p className='case-number text-blue'>{total.length!==0 ? total[0].totaldead : null}</p>
            </div>
          </div>
    )
}
