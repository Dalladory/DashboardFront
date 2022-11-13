import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { ChangePasswordSchema } from "../validation";
import { Field, Formik } from "formik";
import { useActions } from "../../../hooks/useActions";

const changePasswordValues = {
  currentPassword: "",
  password: "",
  confirmPassword: "",
};

const Profile: React.FC<any> = (props) => {
  const { payload, user } = useTypedSelector((state) => state.UserReducer);
  useEffect(() => {
    GetUserProfile(user.Id);
  }, []);

  const [name, setName] = useState<string | null>("");
  const [surname, setSurname] = useState<string | null>("");
  const [email, setEmail] = useState<null | string>("");
  const [phoneNumber, setPhoneNumber] = useState<string | null>("");
  const [userName, setUserName] = useState<string | null>("");
  const [address, setAddress] = useState<string | null>("");

  if (email == "" && payload?.email != null) {
    setName(payload?.name);
    setSurname(payload?.surname);
    setEmail(payload?.email);
    setPhoneNumber(payload?.phoneNumber);
    setUserName(payload?.userName);
    setAddress(payload?.address);
  }

  const { UpdateUserProfile, GetUserProfile, ChangePassword } = useActions();

  const saveProfileSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser = {
      id: user.Id,
      name,
      surname,
      email,
      phoneNumber,
      userName,
      address,
    };

    UpdateUserProfile(newUser);
  };

  const changePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const currentPassword = data.get("currentPassword");
    const newPassword = data.get("password");

    const sendData = {
      id: user.Id,
      currentPassword,
      newPassword,
    };

    console.log("send: ", sendData);
    ChangePassword(sendData);
  };

  return (
    <>
      <form
        onSubmit={saveProfileSubmit}
        autoComplete="off"
        noValidate
        {...props}
      >
        <Card>
          <CardHeader
            subheader="The information can be edited"
            title="Profile"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="name"
                  required
                  value={name}
                  onChange={(event) => setName(event.currentTarget.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="surname"
                  required
                  value={surname}
                  onChange={(event) => setSurname(event.currentTarget.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  required
                  value={email}
                  disabled
                  onChange={(event) => setEmail(event.currentTarget.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  required
                  value={phoneNumber}
                  onChange={(event) =>
                    setPhoneNumber(event.currentTarget.value)
                  }
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="User name"
                  name="userName"
                  required
                  value={userName}
                  onChange={(event) => setUserName(event.currentTarget.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  required
                  value={address}
                  onChange={(event) => setAddress(event.currentTarget.value)}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Button type="submit" color="primary" variant="contained">
              Save details
            </Button>
          </Box>
        </Card>
      </form>

      <Formik
        initialValues={{
          currentPassword: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={() => {}}
        validationSchema={ChangePasswordSchema}
      >
        {({ errors, touched, isSubmitting, isValid, dirty }) => (
          <Card>
            <CardHeader subheader="Update password" title="Password" />
            <Divider />
            <Box
              onSubmit={changePasswordSubmit}
              style={{ width: "100%" }}
              component="form"
              noValidate
              sx={{ mt: 1 }}
            >
              <CardContent>
                <Field
                  as={TextField}
                  fullWidth
                  label="Current password"
                  margin="normal"
                  name="currentPassword"
                  type="password"
                  variant="outlined"
                  autoComplete="currentPassword"
                />
                {errors.currentPassword && touched.currentPassword ? (
                  <div style={{ color: "red" }}>{errors.currentPassword}</div>
                ) : null}
                <Field
                  as={TextField}
                  fullWidth
                  label="Password"
                  margin="normal"
                  name="password"
                  type="password"
                  variant="outlined"
                  autoComplete="password"
                />
                {errors.password && touched.password ? (
                  <div style={{ color: "red" }}>{errors.password}</div>
                ) : null}
                <Field
                  as={TextField}
                  fullWidth
                  label="Confirm password"
                  margin="normal"
                  name="confirmPassword"
                  type="password"
                  variant="outlined"
                  autoComplete="confirmPassword"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div style={{ color: "red" }}>{errors.confirmPassword}</div>
                ) : null}

                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    p: 2,
                  }}
                >
                  <Button
                    disabled={!(isValid && dirty)}
                    type="submit"
                    color="primary"
                    variant="contained"
                  >
                    Update
                  </Button>
                </Box>
              </CardContent>
            </Box>
          </Card>
        )}
      </Formik>
    </>
  );
};
export default Profile;
