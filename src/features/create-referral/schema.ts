import * as Yup from "yup";

export const ReferralSchema = Yup.object().shape({
  givenName: Yup.string().required("Given Name is required"),
  surName: Yup.string().required("Surname is required"),
  email: Yup.string()
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone is required"),
  postCode: Yup.string().max(5, "Postcode too long"),
});