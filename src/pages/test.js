import * as React from "react";
import { Box, Grid, Stack } from "@mui/material";
import { Chart, registerables } from "chart.js";
import { ChartComponent } from "../component/ChartComponent";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../component/InputField";
import DateField from "../component/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
Chart.register(...registerables);

const dataBar = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "New Contacts ",
      data: [11, 19, 3, 5, 2, 3],
      backgroundColor: ["#1363DF"],
      hoverBackgroundColor: ["#1363DF"],
      borderColor: '#333',
      borderWidth: 2,
      stack: "Stack 0",
    },
    {
      label: "Target",
      data: [10, 19, 3, 5, 2, 3],
      backgroundColor: ["#fff"],
      hoverBackgroundColor: ["#fff"],
      borderColor: '#333',
      borderWidth: 2,
      stack: "Stack 0",
    },
    {
      label: "New Companies",
      data: [9, 19, 3, 5, 2, 3],
      backgroundColor: ["#FFA500"],
      hoverBackgroundColor: ["#FFA500"],
      borderColor: '#333',
      borderWidth: 2,
      stack: "Stack 1",
    },
    {
      label: "Target",
      data: [10, 19, 3, 5, 2, 3],
      backgroundColor: ["#fff"],
      hoverBackgroundColor: ["#fff"],
      borderWidth: 2,
      borderColor: '#333',
      stack: "Stack 1",
    },
  ],
};

const dataLine = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Arp",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Top Performer",
      data: [2, 9, 5, 7, 5, 5, 10, 9, 7, 7, 6, 8],
      backgroundColor: ["#1363DF"],
      hoverBackgroundColor: ["#1363DF"],
      borderWidth: 3,
      borderColor: "#1363DF",
    },
    {
      label: "Worst Performer",
      data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
      backgroundColor: ["#FFA500"],
      hoverBackgroundColor: ["#FFA500"],
      borderWidth: 3,
      borderColor: "#FFA500",
    },
    {
      label: "Team Performer",
      data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
      backgroundColor: ["#3EC70B"],
      hoverBackgroundColor: ["#3EC70B"],
      borderWidth: 3,
      borderColor: "#3EC70B",
    },
  ],
};

const schema = yup
  .object({
    time_to: yup.string().nullable().required("Please enter time to"),
  })
  .required();

export default function MUI() {
  const form = useForm({
    defaultValues: {
      time_to: null,
    },
    resolver: yupResolver(schema),
  });

  /*Effect Update Form */
  useEffect(() => {
    form.reset({
      time_to: form.time_to || "",
    });
  }, [form]);

  const handleChangeTimeTo = () => {};

  const onSubmit = (values) => {
    let time_to = dayjs(values.time_to).format("YYYY-MM");
    console.log(time_to);
  };

  return (
    <Box marginTop={"10px"}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box sx={{ width: "50%", margin: "auto", mb: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DateField
                    name={"time_to"}
                    form={form}
                    label={"To"}
                    onChange={handleChangeTimeTo}
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
      <Box sx={{ width: "50%", mt: 5, margin: "auto" }}>
        <ChartComponent
          type="Bar"
          data={dataBar}
          index="x"
          colorX={"#fff"}
          colorY={"#000"}
          drawBorderX={true}
          drawBorderY={false}
          text={"New Contacts And Companies"}
        />
      </Box>
      <Box width={"100%"} display={"flex"}>
        <Box sx={{ width: "50%", mt: 5 }}>
          <ChartComponent
            type="Line"
            data={dataLine}
            index="x"
            colorX={"#fff"}
            colorY={"#000"}
            drawBorderX={true}
            drawBorderY={false}
            text={"Sale Success Rate"}
          />
        </Box>
        <Box sx={{ width: "50%", mt: 5 }}>
          <ChartComponent
            type="Line"
            data={dataLine}
            index="x"
            colorX={"#fff"}
            colorY={"#000"}
            drawBorderX={true}
            drawBorderY={false}
            text={"Avg. Order Value"}
          />
        </Box>
      </Box>
    </Box>
  );
}
