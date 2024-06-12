import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';

export function ChartWorkLocation() {
    const [chartData, setChartData] = useState({ series: [], options: {} });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8000/api/works/location/');
                const data = response.data;

                const labels = data.labels;
                const series = data.data;

                setChartData({
                    series: [{
                        data: series
                    }],
                    options: {
                        chart: {
                            type: 'bar',
                            height: 350,
                        },
                        plotOptions: {
                            bar: {
                                horizontal: false,
                            },
                        },
                        xaxis: {
                            categories: labels
                        },
                        yaxis: {
                            title: {
                                text: 'Número de obras',
                            },
                        },
                    }
                });
            } catch (error) {
                console.error('Hubo un error!', error);
            }
        }
        fetchData();
    }, []);  // Dependencia vacía para que se ejecute solo una vez al montar el componente

    return (
        <div className="chart">
            <Chart options={chartData.options} series={chartData.series} type="bar" height={350} />
        </div>
    );
};