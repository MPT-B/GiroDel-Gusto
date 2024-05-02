import TextField from "@mui/material/TextField";
import React from "react";

interface FormFieldProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  name,
  type = "text",
  autoComplete,
  value,
  onChange,
  required = false,
}) => (
  <TextField
    margin="normal"
    required={required}
    fullWidth
    id={id}
    label={label}
    name={name}
    autoComplete={autoComplete}
    type={type}
    value={value}
    onChange={onChange}
  />
);

export default FormField;
