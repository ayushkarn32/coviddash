import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort,faSearch } from "@fortawesome/free-solid-svg-icons";



export default function StateStats() {
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
      }, []);

      const getTotal= ()=>{
        let totalCases=0;
        let totalDeaths=0;
        let totalRecovered=0;
        let totalActive=0;
        let stateName='';
        const stateinfo=[]
        for(const states in result){
            stateName=`${states[0]}${states[1]}`;
            totalCases=result[states].total.confirmed;
            totalDeaths=result[states].total.deceased;
            totalRecovered=result[states].total.recovered;
            totalActive=(totalCases-totalRecovered-totalDeaths);
            let temp={state:stateName,totalCases:totalCases,totalDeaths:totalDeaths,totalRecovered:totalRecovered,totalActive:totalActive};
            stateinfo.push(temp);
        }
        settotal(stateinfo);
      }
    
      useEffect(() => {
        getTotal();
      }, [result]);
      
      //sort according to total cases
      const sortByTotalCases=()=>{
        let temp=[...total].sort((a,b)=>{
          return b.totalCases-a.totalCases;
        });
        settotal(temp);
      }
      //sort according to total active cases
      const sortByTotalActive=()=>{
        let temp=[...total].sort((a,b)=>{
          return b.totalActive-a.totalActive;
        });
        settotal(temp);
      }
      //sort according to total recovered
      const sortByTotalRecovered=()=>{
        let temp=[...total].sort((a,b)=>{
          return b.totalRecovered-a.totalRecovered;
        });
        settotal(temp);
    
      }
      //sort according to total deaths
      const sortByTotalDeaths=()=>{
        let temp=[...total].sort((a,b)=>{
          return b.totalDeaths-a.totalDeaths;
        });
        settotal(temp); 
      }

      //search according to state name
      const searchByState=()=>{
        let temp=total.filter((item)=>{
          return item.state.toLowerCase().includes(search.toLowerCase());
        });
        settotal(temp);
        
      }
      const [search, setsearch] = useState("");
      const handleChange = (e) => {
        setsearch(e.target.value);
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        searchByState();
      };

    return (
        <>
           <div className='stats-table-container'>
             <div className='table-title'><h2>Reports By States</h2></div>
             <div className="table-state">
              
              <div className="search-main-container">
                <div className="search-box"><FontAwesomeIcon icon={faSearch} /><input type="text" onChange={(e)=>handleChange(e)} placeholder="search" /></div>
                <div className="submit-box"><div className='submit-btn'> <button onClick={handleSubmit} className='btn-submit'>Search</button></div></div>
                <div className="reset-box"><div className='reset-btn'><button  onClick={getTotal} className='btn-reset'>reset</button></div></div>
               
              </div>
              
              <div className="table-head">
                <div className="table-cell text-bold" >Name</div>
                <div className="table-cell text-bold" onClick={sortByTotalCases}>Total Cases <FontAwesomeIcon className='point' icon={faSort} /></div>
                <div className="table-cell text-bold"  onClick={sortByTotalActive} >Active Cases <FontAwesomeIcon className='point' icon={faSort}/></div>
                <div className="table-cell text-bold" onClick={sortByTotalRecovered}>Recovered Cases <FontAwesomeIcon className='point' icon={faSort}  /></div>
                <div className="table-cell text-bold" onClick={sortByTotalDeaths}>Death Cases <FontAwesomeIcon className='point' icon={faSort}  /></div>
              </div>
              {
                total.map((data,index)=>{
                  return(
                    <div className="table-results" key={index}>
                      <div className="table-cell text-center">{data.state.toLocaleString()}</div>
                      <div className="table-cell text-center">{data.totalCases.toLocaleString()}</div>
                      <div className="table-cell text-center">{data.totalActive.toLocaleString()}</div>
                      <div className="table-cell text-center">{data.totalRecovered.toLocaleString()}</div>
                      <div className="table-cell text-center">{data.totalDeaths.toLocaleString()}</div>
                  </div>
                  )
                }
                )
              }
              
            </div>
           </div>
        </>
    )
}
