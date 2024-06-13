import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

export function ChartWorkType() {
    const [chartData, setChartData] = useState({ labels: [], data: [] });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8000/api/work/type/report/');
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
                text: 'Número de obras',
            },
        },
        title: {
            text: 'Distribución de obras por nombre'
        }
    };

    const series = [{
        name: 'Obras',
        data: chartData.data,
    }];

    return (
        <div className="chart">
            <Chart options={options} series={series} type="bar" height={350} />
        </div>
    );
};