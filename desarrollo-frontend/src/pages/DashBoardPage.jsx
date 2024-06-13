import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import axios from "axios";
import { Navigation } from "../components/Navigation";
import { ChartUserRole } from "../components/ChartUserRole";
import { ChartUserGender } from "../components/ChartUserGender";
import { ChartUserStatus } from "../components/ChartUserStatus";
import { ChartWorkLocation } from "../components/ChartWorkLocation";
import { ChartWorkType } from "../components/ChartWorkType";
import { ChartWorkStatus } from "../components/ChartWorkStatus";
import { ChartTaskType } from "../components/ChartTaskType";
import { ChartTaskStatus } from "../components/ChartTaskStatus";
import { ChartTaskState } from "../components/ChartTaskState";
import { ChartProgressTask } from "../components/ChartProgressTask";
import { ChartProgressTaskStatus } from "../components/ChartProgressTaskStatus";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';



function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export function DashBoardPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Navigation></Navigation>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered >
            <Tab label="Usuarios" {...a11yProps(0)} />
            <Tab label="Obras" {...a11yProps(1)} />
            <Tab label="Tareas" {...a11yProps(2)} />
            <Tab label="Avances" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="flex flex-col items-center">
            <ChartUserRole ></ChartUserRole>
            <ChartUserGender></ChartUserGender><br/>
            <ChartUserStatus></ChartUserStatus>
          </div>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <ChartWorkLocation></ChartWorkLocation>
          <ChartWorkType></ChartWorkType><br/>
          <ChartWorkStatus></ChartWorkStatus>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <ChartTaskType></ChartTaskType>
          <ChartTaskStatus></ChartTaskStatus><br/>
          <ChartTaskState></ChartTaskState>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={3}>
          <ChartProgressTask></ChartProgressTask>
          <ChartProgressTaskStatus></ChartProgressTaskStatus>
        </CustomTabPanel>
      </Box>




    </div>
  )
}
