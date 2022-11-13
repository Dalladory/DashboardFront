import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import { Formik, Field } from "formik";

const EditUser: React.FC<any> = (props) => {
  console.log("render");
  const { EditUserForAdmin } = useActions();
  const { payload } = useTypedSelector((state) => state.UserReducer);
  console.log("payload: ", payload);

  const saveProfileSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = data.get("name") as string;
    const surname = data.get("surname") as string;
    const email = data.get("email") as string;
    const phoneNumber = data.get("phoneNumber") as string;
    const userName = data.get("userName") as string;
    const address = data.get("address") as string;

    const newUser = {
      id: payload.id,
      name,
      surname,
      email,
      phoneNumber,
      userName,
      address,
    };

    EditUserForAdmin(newUser);
    console.log("newProfile: ", newUser);
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
                  defaultValue={payload?.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Last name"
                  name="surname"
                  required
                  defaultValue={payload?.surname}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  required
                  defaultValue={payload?.email}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  required
                  defaultValue={payload?.phoneNumber}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="User name"
                  name="userName"
                  required
                  defaultValue={payload?.userName}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  required
                  defaultValue={payload?.address}
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
    </>
  );
};
export default EditUser;
