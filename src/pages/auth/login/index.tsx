import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Field } from "formik";
import { LoginSchema } from "../validation";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import Loader from "../../../components/loader";

const initialValues = { email: "", password: "", rememberMe: false };

const theme = createTheme();

const Login: React.FC = () => {
  const { loading, isAuth } = useTypedSelector((state) => state.UserReducer);
  const { LoginUser } = useActions();

  if (isAuth) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let rememberMe: any = data.get("rememberMe");
    if (rememberMe == null) {
      rememberMe = false;
    } else {
      rememberMe = true;
    }

    const user = {
      email: data.get("email"),
      password: data.get("password"),
      rememberMe: rememberMe,
    };
    LoginUser(user);
  };

  return (
    <>
      <Loader />
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
              Sign in
            </Typography>
            <ToastContainer autoClose={5000} />
            <Formik
              initialValues={initialValues}
              onSubmit={() => {}}
              validationSchema={LoginSchema}
            >
              {({ errors, touched, isSubmitting, isValid }) => (
                <Box
                  onSubmit={handleSubmit}
                  style={{ width: "100%", height: "326px" }}
                  component="form"
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  {errors.email && touched.email ? (
                    <div style={{ color: "red" }}>{errors.email}</div>
                  ) : null}
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  {errors.password && touched.password ? (
                    <div style={{ color: "red" }}>{errors.password}</div>
                  ) : null}
                  <FormControlLabel
                    control={<Checkbox color="primary" />}
                    label="Remember me"
                    name="rememberMe"
                  />
                  <Button
                    disabled={!isValid}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {isSubmitting ? "Loading" : "Sign in"}
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link to="/forgotPassword">Forgot password?</Link>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Formik>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Login;
