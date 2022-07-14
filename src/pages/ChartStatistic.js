import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Chart, registerables } from "chart.js";
import { height } from "@mui/system";
import { filter_statistic, target_statistic } from "../redux/action/product";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import DateField from "../component/DateField";
import { useForm } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { now } from "lodash";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";
Chart.register(...registerables);

export const ChartStatistic = () => {
  const dispatch = useDispatch();
  const [toValue, setToValue] = useState();
  const data_target = useSelector(
    (state) => state.reducers.data_tager_statistic
  );

  let TotalTarget = data_target.total_target?.map((item) => {
    return item.count;
  });

  let TotalReal = data_target.total_real?.map((item) => {
    return item.count;
  });

  let dataTotal = [+TotalReal, +TotalTarget];

  let CountryNameTarget = data_target.total_target_in_country?.map((item) => {
    return item.Country.name;
  });

  let CountTarget = data_target.total_target_in_country?.map((item) => {
    return item.count;
  });

  let CountActual = data_target.total_real_in_country?.map((item) => {
    return item.count;
  });

  const dataPie = {
    labels: ["%Remaining", "%Target"],
    datasets: [
      {
        data: dataTotal,
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        borderWidth: 2,
      },
    ],
  };

  const form = useForm({
    defaultValues: {
      to: null,
      from: null,
    },
  });

  const dataBar = {
    labels: CountryNameTarget,
    min: 0,
    max: 100,
    datasets: [
      {
        label: "Actual Contacts ",
        borderColor: "#000000",
        borderWidth: 2,
        borderRadius: 2,
        backgroundColor: [
          "#4E944F",
          "#4E944F",
          "#4E944F",
          "#4E944F",
          "#4E944F",
          "#4E944F",
          "#4E944F",
          "#4E944F",
          "#4E944F",
          "#4E944F",
          "#4E944F",
        ],
        data: CountActual,
      },
      {
        label: "Target",
        borderColor: "#000000",
        borderWidth: 2,
        borderRadius: 2,
        backgroundColor: [
          "#FFFFFF",
          "#FFFFFF",
          "#FFFFFF",
          "#FFFFFF",
          "#FFFFFF",
          "#FFFFFF",
          "#FFFFFF",
          "#FFFFFF",
          "#FFFFFF",
          "#FFFFFF",
          "#FFFFFF",
        ],
        data: CountTarget,
      },
    ],
  };

  /*Effect Update Form */
  useEffect(() => {
    form.reset({
      to: form.to,
      from: form.from,
    });
  }, [form]);

  const onSubmit = (values) => {
    let time_to = dayjs(values.to).format("YYYY-MM");
    let time_from = dayjs(values.from).format("YYYY-MM");
    dispatch(target_statistic(time_from, time_to));
  };
 
  return (
    <Box sx={{ width: "50%", margin: "auto", mt: 5, mb: 5 }}>
      <Typography variant="h6">Operational Performance</Typography>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box sx={{ mb: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DateField name={"from"} form={form} label={"From"} />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={5}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DateField
                    name={"to"}
                    form={form}
                    label={"To"}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2}>
              <LoadingButton
                type={"submit"}
                fullWidth
                variant="contained"
                sx={{ mt: 1.5 }}
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </form>
      <Box sx={{ width: "60%", margin: "auto", mb: 5 }}>
        <Pie
          data={dataPie}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "% Target New Contacts",
              },
            },
          }}
        />
      </Box>
      <Box sx={{ width: "100%", mt: 5 }}>
        <Bar
          data={dataBar}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Target New Contacts In Countries",
              },
            },
            indexAxis: "y",
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};
