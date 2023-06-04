import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const basicSchema = yup.object().shape({
  Email: yup.string().email("Please enter a valid email").required("Required"),
  Password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
});


export const advancedSchema = yup.object().shape({
  Name: yup
    .string()
    .min(2, "Name must be at least 2 characters long")
    .required("Required"),
  Surname: yup
    .string()
    .min(2, "Surname must be at least 2 characters long")
    .required("Required"),
  Email: yup.string().email("Please enter a valid email").required("Required"),
  Password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("Password"), null], "Passwords must match")
    .required("Required"),

})