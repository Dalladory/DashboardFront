import * as Yup from "yup";

const passwordRegExp =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,}$/;

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required")
    .label("Email address"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required")
    .matches(passwordRegExp, "Password must contains A-Z, a-z, 0-9")
    .label("Password"),
});

export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required")
    .label("Email address"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required")
    .matches(passwordRegExp, "Password must contains A-Z, a-z, 0-9")
    .label("Password"),
  confirmPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required")
    .matches(passwordRegExp, "Password must contains A-Z, a-z, 0-9")
    .label("Confirm password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  // role: Yup.string().required("Role is required").label("Role"),
});

export const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required")
    .label("Email address"),
});
export const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required")
    .matches(passwordRegExp, "Password must contains A-Z, a-z, 0-9")
    .label("Current password"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required")
    .matches(passwordRegExp, "Password must contains A-Z, a-z, 0-9")
    .label("Password"),
  confirmPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required")
    .matches(passwordRegExp, "Password must contains A-Z, a-z, 0-9")
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .label("Confirm password"),
});
