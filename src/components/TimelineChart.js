import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
 import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js'; 
 import { Line } from 'react-chartjs-2';
 ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );
 


//   const getTotal=()=>{
//     let totalCases=0;
//     let totalDeaths=0;
//     let totalRecovered=0;
//     // const totalData=[];
//     for(const states in result){
//         for(const dates in result[states]){
//             for(const cases in result[states][dates]){
//                 totalCases+=result[states][dates][cases].confirmed;
//                 totalDeaths+=result[states][dates][cases].deceased;
//                 totalRecovered+=result[states][dates][cases].recovered;
//                 // console.log(result[states][dates][cases].total);
//             }
            
//         }

//         // adding total cases for each state
//         // totalCases+=result[states].total.confirmed;
//         // totalDeaths+=result[states].total.deceased;
//         // totalRecovered+=result[states].total.recovered;
//     }


//     let totalData=[{totalconfirm:totalCases.toLocaleString(),totalactive:(totalCases-totalRecovered-totalDeaths).toLocaleString(),totaldead:totalDeaths.toLocaleString(),totalrecovered:totalRecovered.toLocaleString()}];
//     settotal(totalData);
// }

  

  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  export const data = {
    Legend:{
      display:true,
      position:'top',
      labels:{
        fontColor:'#000',
        text:'Total Confirmed'
      }
    },
    labels,
    datasets: [
      {
        label: 'Active',
        data: [0, 19, 15, 20, 30, 40, 40, 50, 40, 30, 20, 10],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Recovered',
        data: [ 101, 202, 303, 404, 505, 606, 207,107,507,707,435 ],
        borderColor: 'rgb(28, 177, 66)',
        backgroundColor: 'rgba(28, 177, 66, 0.5)',
      },
      {
        label: 'Dead',
        data: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ],
  };
  

export default function TimelineChart() {
      const [result, setresult] = useState([]);
      const [total, settotal] = useState([]);

    const getdata = async () => {
      const response = await axios
        .get(`https://data.covid19india.org/v4/min/timeseries.min.json`)
        .catch((error) => console.log(error));
      setresult(response.data);
      };
    useEffect(() => {
      getdata();
      // getTotal();
    }, []);



    const getTotal= ()=>{
          let totalCases=0;
          let totalDeaths=0;
          let totalRecovered=0;
          const dateinfo=[]
          for(const states in result ){
              for(const dates in result[states]){
                  for(const cases in result[states][dates]){
                      totalCases=result[states][dates][cases].total.confirmed;
                      totalDeaths=result[states][dates][cases].total.deceased;
                      totalRecovered=result[states][dates][cases].total.recovered;
                      let temp={totalCase:totalCases,totalDeath:totalDeaths,totalRecovered:totalRecovered};
                      dateinfo.push(temp);
                      // console.log(result[states][dates][cases].total);
                  }
                  //storing data for each dates
                  
              }
          }
          settotal(dateinfo);
         
    }

    console.log(total);
  
    return (
        <>
          <p className='text-center'>Timeseries</p>
          {/* <button onClick={getTotal}>getdadta</button> */}
            <Line data={data} />
        </>
    )
}
  
