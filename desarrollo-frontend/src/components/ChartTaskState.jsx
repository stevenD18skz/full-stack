import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

export function ChartTaskState() {
    const [chartData, setChartData] = useState({ labels: [], data: [] });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8000/api/task/enabled/report/');
                const data = response.data;

                setChartData({
                    labels: data.labels,
                    data: data.data
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const options = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        xaxis: {
            categories: chartData.labels,
        },
        yaxis: {
            title: {
                text: 'Número de tareas',
            },
        },
        title: {
            text: 'Distribución por tareas habilitadas e inhabilitadas'
        }
    };

    const series = [{
        name: 'Tareas',
        data: chartData.data,
    }];

    return (
        <div className="chart">
            <Chart options={options} series={series} type="bar" height={350} />
        </div>
    );
};