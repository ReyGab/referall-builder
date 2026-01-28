import { useField } from "formik";
import TextField, { TextFieldProps } from "@mui/material/TextField";

type FormikTextFieldProps = TextFieldProps & {
  name: string;
};

const FormikTextField = ({ name, ...props }: FormikTextFieldProps) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

export default FormikTextField;
