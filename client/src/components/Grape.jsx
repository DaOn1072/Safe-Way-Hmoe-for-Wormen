import React, { useState, useEffect } from "react";
import { Pie } from 'react-chartjs-2';

function Grape() {
  const [country, setCountry] = useState([]);
  const [population, setPopulation] = useState([]);

  useEffect(() => {
    const getcountry = [];
    const getpopulation = [];

    const getdata = async () => {
      const reqData = await fetch("http://localhost/reactcharttutorial/population");
      const resData = await reqData.json();
      
      for (let i = 0; i < resData.length; i++) {
        getcountry.push(resData[i].country_name);
        getpopulation.push(resData[i].population);
      }
      
      setCountry(getcountry);
      setPopulation(getpopulation);
    }

    getdata();
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid">
        <h1 className="mt-3">Top 10 Countries with the highest population</h1>
        <div className="row">
          <div className="col-md-5 mb-3 mt-3 ">
            <Pie
              width={300}
              height={200}
              data={{
                labels: country,
                datasets: [
                  {
                    label: '# of Votes',
                    data: population,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)',
                      'rgba(255, 109, 64, 0.6)',
                      'rgba(125, 169, 34, 0.8)',
                      'rgba(225, 99, 251, 0.3)',
                      'rgba(225, 99, 101, 0.4)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)',
                      'rgba(255, 109, 64, 0.6)',
                      'rgba(125, 169, 34, 0.8)',
                      'rgba(225, 99, 251, 0.3)',
                      'rgba(225, 99, 101, 0.4)',
                    ],
                    borderWidth: 1,
                    offset: [20, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    fontSize: 30,
                    text: 'Chart js tutorial',
                    display: true,
                    font: { size: 20 },
                  },
                  legend: {
                    labels: {
                      font: { size: 15 },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Grape;