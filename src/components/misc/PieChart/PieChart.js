import React, {useRef} from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

const tooltips = {
  callbacks: {
    label: (tooltipItem, data) => {
      var dataset = data.datasets[tooltipItem.datasetIndex];
      var total = dataset.data.reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
      });
      var currentValue = dataset.data[tooltipItem.index];
      var percentage = Math.floor(((currentValue/total) * 100)+0.5);

      return `${currentValue} (${percentage}%)`;
    }
  }
} 

const PieChart = props => {
  const { labels, datasets, title, color } = props
  const chartRef=useRef()
  const options = {
    //backgroundColor : color,
    tooltips,
    legend: {
      display: true,
      position: 'left'
    },
    title: {
      display: true,
      text: title,
      fontSize: 25,
      fontColor: '#4F4C4C',
      fontStyle: undefined,
      position :'left'
    },
    plugins: {
      datalabels: {
        display: false,
        color: 'white',
        backgroundColor: '#000',
        opacity: 0.7,
        borderRadius: 3,
        align: 'top',
      }
    }
  }
  const chartOptions = {
    fill: false,
    lineTension: 0.2,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderWidth: 6,
    pointHoverRadius: 5,
    pointHoverBorderWidth: 2,
    pointRadius: 3,
    pointHitRadius: 10,
    pointBorderColor: '#B43E5A',
    pointBackgroundColor: '#B43E5A',
    pointHoverBackgroundColor: 'rgba(220,220,220,1)',
    pointHoverBorderColor: '#B43E5A'
  }
  const data = {
    labels: labels,
    datasets: datasets.map(dataset => ({ ...dataset, ...chartOptions, backgroundColor : color }))
  }
  return (
    <Doughnut ref={chartRef} data={data} options={options} />
  )

}

export default PieChart;
