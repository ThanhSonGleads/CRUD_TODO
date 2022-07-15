import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputField from "../component/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin_statistic } from "../redux/action/user";
import { useState } from "react";
import Loading from "../component/Loading";

const theme = createTheme();

const schema = yup
  .object({
    username: yup.string().nullable().required("Please enter username"),
    password: yup.string().nullable().required("Please enter password"),
  })
  .required();

export default function SignInSide() {
  const form = useForm({
    defaultValues: {
      username: null,
      password: null,
    },
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.reducers.signin_statistic);

  const [loading, setLoading] = useState(false);

  /* Effect Update Form */
  useEffect(() => {
    form.reset({
      username: form.username,
      password: form.password,
    });
  }, []);

  /*Effect SetLoading Component */
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  /*Set Access Token Vao LocalStorage*/
  localStorage.setItem("accessToken", access_token);

  const onSubmit = (values) => {
    console.log("values", values);
    dispatch(signin_statistic(values));
  };

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Loading />
      ) : (
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box sx={{ mt: 1 }}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs sx={{ mr: 5 }}>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </ThemeProvider>
  );
}
