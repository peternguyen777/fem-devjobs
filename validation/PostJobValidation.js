import * as yup from "yup";

const ValidationSchema = yup.object().shape({
  company: yup.string().trim().required("Company name required."),
  position: yup.string().trim().required("Position is required."),
  location: yup.string().trim().required("Country is required."),
  contract: yup.string().required("Contract type is required."),
  website: yup
    .string()
    .url("Invalid url.")
    .required("Website url is required."),
  apply: yup
    .string()
    .email("Invalid e-mail.")
    .required("Email address is required."),
  logoBgH: yup
    .number()
    .typeError("Must be between 0 and 359")
    .min(0, "Must be between 0 and 359")
    .max(359, "Must be between 0 and 359")
    .required("Must be between 0 and 359"),
  logoBgS: yup
    .number()
    .typeError("Must be between 0 and 100")
    .min(0, "Must be between 0 and 100")
    .max(100, "Must be between 0 and 100")
    .required("Must be between 0 and 359"),
  logoBgL: yup
    .number()
    .typeError("Must be between 0 and 100")
    .min(0, "Must be between 0 and 100")
    .max(359, "Must be between 0 and 100")
    .required("Must be between 0 and 359"),
  description: yup.string().trim().required("Required field."),
  reqContent: yup.string().trim().required("Required field."),
  roleContent: yup.string().trim().required("Required field."),
  logo: yup
    .mixed()
    .required("Logo is required.")
    .test("type", "Only .svg or .png accepted", (value) => {
      return (
        value &&
        value[0] &&
        (value[0].type === "image/svg+xml" ||
          value[0].type === "image/png+xml" ||
          value[0].type === "image/svg" ||
          value[0].type === "image/png")
      );
    }),
});

export default ValidationSchema;
