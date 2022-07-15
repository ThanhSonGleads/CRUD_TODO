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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { targetApi } from "../api/targetApi";
import Loading from "../component/Loading";

Chart.register(...registerables);

const schema = yup
  .object({
    from: yup.string().nullable().required("Please enter time from"),
    to: yup.string().nullable().required("Please enter time to"),
  })
  .required();

export const ChartStatistic = () => {
  const form = useForm({
    defaultValues: {
      to: null,
      from: null,
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const [fromValue, setFromValue] = useState();
  const [toValue, setToValue] = useState();
  const [dataTargetContact, setDataTargetContact] = useState([]);
  const [dataTargetCompany, setDataTargetCompany] = useState([]);
  const [loading, setLoading] = useState(false);

  /*Get Data Total Target Contact And Company */
  let TotalTargetContact = dataTargetContact.total_target?.map((item) => {
    return item.count;
  });

  let TotalTargetCompany = dataTargetCompany.total_target?.map((item) => {
    return item.count;
  });

  /*Get Data Total Real Contact Va Company */
  let TotalRealContact = dataTargetContact.total_real?.map((item) => {
    return item.count;
  });

  let TotalRealCompany = dataTargetCompany.total_real?.map((item) => {
    return item.count;
  });

  /*Push TotalReal TotalTarget Cua Contact Va Company Vao Mang DataTotal Va Chuyen String Thanh Number (+) */
  let dataTotalContact = [+TotalRealContact, +TotalTargetContact];
  let dataTotalCompany = [+TotalRealCompany, +TotalTargetCompany];

  /* Get Country Name Theo Contact Va Company */
  let CountryNameTargetContact = dataTargetContact.total_target_in_country?.map(
    (item) => {
      return item.Country.name;
    }
  );

  let CountryNameTargetCompany = dataTargetCompany.total_target_in_country?.map(
    (item) => {
      return item.Country.name;
    }
  );
  console.log("CountryNameTargetCompany", CountryNameTargetCompany);
  /* Get Count Target, CountActual Theo Contact Va Company */
  let CountTargetContact = dataTargetContact.total_target_in_country?.map(
    (item) => {
      return item.count;
    }
  );

  let CountTargetCompany = dataTargetCompany.total_target_in_country?.map(
    (item) => {
      return item.count;
    }
  );

  let CountActualContact = dataTargetContact.total_real_in_country?.map(
    (item) => {
      return item.count;
    }
  );

  let CountActualCompany = dataTargetCompany.total_real_in_country?.map(
    (item) => {
      return item.count;
    }
  );

  const dataPieContact = {
    labels: ["%Remaining", "%Target"],
    datasets: [
      {
        data: dataTotalContact,
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        borderWidth: 2,
      },
    ],
  };

  const dataPieCountry = {
    labels: ["%Remaining", "%Target"],
    datasets: [
      {
        data: dataTotalCompany,
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
        borderWidth: 2,
      },
    ],
  };

  const dataBarContact = {
    labels: CountryNameTargetContact,
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
        data: CountActualContact,
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
        data: CountTargetContact,
      },
    ],
  };

  const dataBarCompany = {
    labels: CountryNameTargetCompany,
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
        data: CountActualCompany,
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
        data: CountTargetCompany,
      },
    ],
  };

  /*Effect Update Form */
  useEffect(() => {
    form.reset({
      to: form.to || '',
      from: form.from || '',
    });
  }, [form]);

  /*Effect Set Loading Component */
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const onSubmit = async (values) => {
    let time_to = dayjs(values.to).format("YYYY-MM");
    let time_from = dayjs(values.from).format("YYYY-MM");
    let dataContact = await targetApi.getTargetContact(time_from, time_to);
    let dataCompany = await targetApi.getTargetCompany(time_from, time_to);
    setDataTargetContact(dataContact.data.data);
    setDataTargetCompany(dataCompany.data.data);
  };

  const handleChangeTimeFrom = (value) => {
    setFromValue(value);
  };

  const handleChangeTimeTo = (value) => {
    setToValue(value);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box sx={{ width: "98%", margin: "auto", mt: 5, mb: 5 }}>
          <Box sx={{ ml: "10%" }}>
            <Typography variant="h6">Operational Performance</Typography>
          </Box>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Box sx={{ width: "30%", margin: "auto" }}>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <DateField
                        name={"from"}
                        form={form}
                        maxDate={toValue}
                        label={"From"}
                        onChange={handleChangeTimeFrom}
                      />
                    </Stack>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={5}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <DateField
                        name={"to"}
                        form={form}
                        minDate={fromValue}
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
          <Box sx={{ width: "80%", margin: "auto" }}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box sx={{ width: "30%", mb: 5 }}>
                <Pie
                  data={dataPieContact}
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
              <Box sx={{ width: "30%", mb: 5 }}>
                <Pie
                  data={dataPieCountry}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: "% Target New Companies",
                      },
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box display={"flex"} sx={{ width: "100%", margin: "auto" }}>
            <Box sx={{ width: "50%", mt: 5 }}>
              <Bar
                data={dataBarContact}
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
            <Box sx={{ width: "50%", mt: 5 }}>
              <Bar
                data={dataBarCompany}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Target New Companies In Countries",
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
        </Box>
      )}
    </>
  );
};
