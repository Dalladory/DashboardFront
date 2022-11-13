import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import { Formik, Field } from "formik";
import { RegisterSchema } from "../auth/validation";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { Register } = useActions();
  const { error } = useTypedSelector((state) => state.UserReducer);
  const userRoles = ["Users", "Administrators"];
  const [isRedirect, setRedirect] = useState(false);

  const RedirectToMain = () => {
    setTimeout(() => {
      //setRedirect(true);
      navigate("/dashboard/users");
    }, 1000);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const user = {
      email: data.get("email") as string,
      password: data.get("password") as string,
      confirmPassword: data.get("confirmPassword"),
      role: data.get("role") as string,
    };

    console.log("register user: ", user);
    Register(user, RedirectToMain);
  };

  return (
    <>
      {isRedirect ? <Navigate replace to="/dashboard/users" /> : null}
      <Container component="main" maxWidth="xs">
        <Formik
          validationSchema={RegisterSchema}
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            role: "",
          }}
          onSubmit={() => {}}
        >
          {({ errors, touched, isSubmitting, isValid, dirty }) => (
            <Box
              onSubmit={handleSubmit}
              style={{ width: "100%", height: "326px" }}
              component="form"
              noValidate
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
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
              {errors.email && touched.email && (
                <div style={{ color: "red" }}>{errors.email}</div>
              )}
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
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div style={{ color: "red" }}>{errors.confirmPassword}</div>
              ) : null}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select name="role" label="Role" style={{ width: "100%" }}>
                  {userRoles.map((element) => (
                    <MenuItem value={element}>{element}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.role && touched.role ? (
                <div style={{ color: "red" }}>{errors.role}</div>
              ) : null}
              <Button
                disabled={!(isValid && dirty)}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Box>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default RegisterPage;
