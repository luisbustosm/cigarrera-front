import { useEffect, useState } from 'react';
import { environment } from '../environment';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';

export const Charts = () => {

  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState([]);

  const onInit = async() => {
    try {
      let response = await fetch(`${environment.baseUrl}/puffs?group=true`);

      if (!response.ok) {
          setLoading(false);
          throw new Error('Ocurrió un error ' + response.statusText);
      }

      let responseData = await response.json();

      responseData.result = responseData.result.reverse();

      const info = {
        labels: responseData.result.map(d => d._id),
        datasets: [{
          label: 'Cantidad de cigarros',
          data: responseData.result.map(d => d.count),
          fill: true,
        }]
      };

      setChartData(info);
      setLoading(false);
    }catch (error) {
        setLoading(false);
    }
  }

  useEffect(() => {
    onInit();
  }, []);

    return <>
      <div className="row mt-5">
        <div className="col">
          <h1 className="text-secondary">Gráficos 📊</h1>
        </div>
      </div>
      <div className="row mt-5">
        <div className="chart-container">
          {!loading && chartData.datasets ? <Line
            data={ chartData }
            options={{
              plugins: {
                title: {
                  display: true,
                  text: 'Cantidad de cigarros por día'
                },
                legend: {
                  display: false
                }
              }
            }}
          /> : <div className='text-center'><div className="spinner-border" role="status"></div></div>}
        </div>
      </div>
    </>

};