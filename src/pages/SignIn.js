import React, { useEffect } from "react";
import InputField from "../component/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { Grid, Box, Typography, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import SelectField from "../component/SelectField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Stack from "@mui/material/Stack";
const selectGender = [{ gender: "Male" }, { gender: "Female" }];

const schema = yup
  .object({
    username: yup.string().nullable().required("Please enter username"),
    password: yup.string().nullable().required("Please enter password"),
    
  })
  .required();

const theme = createTheme();
export default function MUI() {
  const form = useForm({
    defaultValues: {
      username: null,
      password: null,
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    form.reset({
      username: form.username,
      password: form.password,
    });
  }, []);
  const onSubmit = (values) => {
    console.log("values", values);
  };
  return (
    <ThemeProvider theme={theme}>
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
            Sign In
          </Typography>
          <Box sx={{ mt: 3 }}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <InputField
                      name={"username"}
                      form={form}
                      label={"UserName"}
                      size="small"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <InputField
                      name={"password"}
                      form={form}
                      label={"Password"}
                      size="small"
                      sx={{ mb: 2 }}
                    />
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
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
