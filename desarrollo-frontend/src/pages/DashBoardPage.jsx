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

export function DashBoardPage() {
  return (
    <div>
      <Navigation></Navigation>
      <ChartUserRole></ChartUserRole>
      <ChartUserGender></ChartUserGender>
      <ChartUserStatus></ChartUserStatus>
      <ChartWorkLocation></ChartWorkLocation>
      <ChartWorkType></ChartWorkType>
      <ChartWorkStatus></ChartWorkStatus>
      <ChartTaskType></ChartTaskType>
      <ChartTaskStatus></ChartTaskStatus>
      <ChartTaskState></ChartTaskState>
      <ChartProgressTask></ChartProgressTask>
      <ChartProgressTaskStatus></ChartProgressTaskStatus>
    </div>
  )
}
