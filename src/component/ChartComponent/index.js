import { Box } from "@mui/material";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import React from "react";
import { Pie } from "react-chartjs-2";

export const ChartComponent = ({ type = "", data = [], text, colorX, colorY, index, drawBorderX = false, drawBorderY = false }) => {
  return (
    <Box>
      {type === "Pie" ? (
        <Pie
          data={data}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: text,
              },
            },
          }}
        />
      ) : null}
      {type === "Bar" ? (
        <Bar
          data={data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: text,
              },
            },
            indexAxis: index,
            interaction: {
              intersect: false,
            },
            scales: {
              x: {
                grid: {
                  display: true,
                  drawBorder: drawBorderX,
                  drawOnChartArea: true,
                  drawTicks: true,
                  color: colorX,
                },
                stacked: true,
              },
              y: {
                grid: {
                  drawBorder: drawBorderY,
                  color: colorY,
                },
                stacked: true,
              },
            },
          }}
        />
      ) : null}
      {type == "Line" ? (
        <Line
          data={data}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: text,
              },
            },
            indexAxis: index,
            interaction: {
              intersect: false,
            },
            scales: {
              x: {
                grid: {
                  display: true,
                  drawBorder: drawBorderX,
                  drawOnChartArea: true,
                  drawTicks: true,
                  color: colorX,
                },
                stacked: true,
              },
              y: {
                grid: {
                  drawBorder: drawBorderY,
                  color: colorY,
                },
                stacked: true,
              },
            },
          }}
        />
      ) : null}
    </Box>
  );
};
