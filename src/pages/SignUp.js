import React, { useEffect, useState } from "react";
import InputField from "../component/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
import { now } from "lodash";
import { useDispatch } from "react-redux";
import { signUp } from "../redux/action/user";
import Loading from "../component/Loading";
import axios from "axios";
import { DOMAIN } from "../redux/constant";
import Swal from "sweetalert2";
import Link from "@mui/material/Link";
import SelectField from "../component/SelectField";
import DateField from "../component/DateField";

const genderOptions = [{ label: "Male" }, { label: "Female" }];

const schema = yup
  .object({
    name: yup.string().nullable().required("Please enter name"),
    username: yup.string().nullable().required("Please enter username"),
    password: yup
      .string()
      .nullable()
      .min(6, "Password must be at least 6 characters")
      .required("Please enter password"),
    confirm_password: yup
      .string()
      .nullable()
      .required("Please enter confirm password")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    address: yup.string().nullable().required("Please enter address"),
    gender: yup.string().nullable().required("Required select gender"),
    dayOfBirth: yup.string().nullable().required("Please enter date"),
  })
  .required();

const theme = createTheme();

export default function SignUp() {
  const form = useForm({
    defaultValues: {
      name: null,
      username: null,
      password: null,
      confirm_password: null,
      address: null,
      gender: null,
      dayOfBirth: null,
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  /*Effect Remove Key LocalStorage */
  useEffect(() => {
    localStorage.removeItem("login");
    localStorage.removeItem("accessToken");
  }, []);

  /* Effect Loading Page */
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  /* Effect Update Form */
  useEffect(() => {
    form.reset({
      name: form.name,
      username: form.username,
      password: form.password,
      confirm_password: form.confirm_password,
      address: form.address,
      gender: form.gender,
      dayOfBirth: form.dayOfBirth || "",
    });
  }, [form]);

  const checkUser = (serverUsers, formData) => {
    const user = serverUsers.find(
      (user) => user.username === formData.username
    );
    if (user) return user;
  };

  const onSubmit = async (values) => {
    console.log("values", values);
    const user = await axios
      .get(`${DOMAIN}/Users`)
      .then((res) => checkUser(res.data, values));
    if (user) {
      Swal.fire({
        title: "",
        html: `<a  style="color: red">Username already exists</a>`,
        icon: "error",
        confirmButtonText: "Confirm",
      });
    } else
      await axios.post(`${DOMAIN}/Users`, values).then((res) => {
        Swal.fire({
          title: "",
          html: `<a  style="color: #27ae60">SignUp Successfully</a>`,
          icon: "success",
          confirmButtonText: "Confirm",
        }).then(() => {
          window.location.href = "/signin";
        });
      });
  };
  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Loading />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box sx={{ mt: 3 }}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <InputField
                        name={"name"}
                        form={form}
                        label={"Name"}
                        size="small"
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField
                        name={"username"}
                        form={form}
                        label={"UserName"}
                        size="small"
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField
                        name={"password"}
                        form={form}
                        label={"Password"}
                        size="small"
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputField
                        name={"confirm_password"}
                        form={form}
                        label={"Confirm-Password"}
                        size="small"
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <InputField
                        multiline={true}
                        name={"address"}
                        form={form}
                        label={"Address"}
                        size="small"
                        sx={{ mb: 2 }}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ mb: 2 }}>
                      <SelectField
                        name={"gender"}
                        label="Select gender"
                        form={form}
                        options={genderOptions}
                        multiple={false}
                        getOptionLabel={genderOptions.label}
                        disabeled={false}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <DateField
                            name={"dayOfBirth"}
                            form={form}
                            label={"Birthday"}
                            maxDate={now()}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                  <LoadingButton
                    type={"submit"}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </LoadingButton>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/signin" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Box>
          </Box>
        </Container>
      )}
    </ThemeProvider>
  );
}
