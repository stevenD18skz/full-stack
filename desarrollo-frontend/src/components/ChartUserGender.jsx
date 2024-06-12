import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';

export function ChartUserGender() {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: 'pie',
            },
            labels: [],
            title: {
                text: 'Distribución de Usuarios por Género'
            }
        }
    });

    useEffect(() => {
        axios.get('http://localhost:8000/api/usuarios-por-genero/')
            .then(response => {
                const data = response.data;
                const labels = data.map(item => item.gender_user === 'M' ? 'Masculino' : 'Femenino');
                const series = data.map(item => item.count);
                setChartData({
                    series: series,
                    options: {
                        ...chartData.options,
                        labels: labels
                    }
                });
            })
            .catch(error => {
                console.error('Hubo un error!', error);
            });
    }, []);

    return (
        <div>
            <Chart
                options={chartData.options}
                series={chartData.series}
                type="pie"
                width="500"
            />
        </div>
    );
};