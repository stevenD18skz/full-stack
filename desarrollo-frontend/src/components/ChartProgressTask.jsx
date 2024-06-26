import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

export function ChartProgressTask() {
    const [chartData, setChartData] = useState({ labels: [], data: [] });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8000/api/task/progress/report/');
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
                text: 'Promedio de Avance (%)',
            },
            min: 0,
            max: 100,
        },
        title: {
            text: 'Distribución por promedio de avances'
        }
    };

    const series = [{
        name: 'Promedio de Avance',
        data: chartData.data,
    }];

    return (
        <div className="chart">
            <Chart options={options} series={series} type="bar" height={350} />
        </div>
    );
};