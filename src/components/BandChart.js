import { Chart } from 'chart.js';
import React, { useContext, useEffect } from 'react'
import { SocketContext } from '../context/SocketContext';

export const BandChart = () => {

    const {socket} = useContext(SocketContext);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            console.log(bands)
            crearGrafica(bands)
          });
    },[socket])
    //?UsE EFFFECT EJECUAT DESPEUS DE RENDERIZADO

    const crearGrafica = (bands = []) => {
        const ctx = document.getElementById('myChart'); 
        new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: bands.map(a => a.name),
                datasets: [{
                    label: '# of Votes',
                    data: bands.map(a => a.votes),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
                events: ['click'],
                scales: {
                    xAxes: [{
                        stacked: true
                    }]
                },
            }
        });
    }

  return (
    <canvas id="myChart"></canvas>
  )
}
