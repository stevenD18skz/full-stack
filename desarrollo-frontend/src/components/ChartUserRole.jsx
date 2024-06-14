import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";

export function ChartUserRole() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Llamar a la API para obtener los datos
    axios
      .get("http://localhost:8000/api/usuarios-por-rol/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error!", error);
      });
  }, []);

  const options = {
    chart: {
      type: "bar",
    },
    series: [
      {
        name: "Usuarios",
        data: data.map((item) => item.count),
      },
    ],
    title: {
      text: 'Distribución de usuarios por rol'
  },
    xaxis: {
      categories: data.map((item) => item["role_user__name_role"]),
    },
  };

  return (
    <div>
      <ApexCharts
        options={options}
        series={options.series}
        type="bar"
        width="500"
      />
    </div>
  );
}
