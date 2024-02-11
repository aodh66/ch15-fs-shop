import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button } from "@mui/material";

const schema = yup
  .object()
  .shape({
    from: yup.string().email().max(50).required(),
    subject: yup.string().max(300).required(),
    message: yup.string().max(50000).required(),
  })
  .required();

const defaults = {
    from: '',
    subject: '',
    message: '',
};

export default function ContactForm({ submitHandler }) {

  const {
    handleSubmit,
    formState: { errors, isValid, isDirty, isSubmitting },
    reset,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: defaults,
  });

  useEffect(() => {
    console.log(formState);
  })

  const formRowStyle = {
    marginBlockEnd: "1em",
  };

  let submitFn = (vals) => {
      reset();
      console.log("🚀 ~ file: ContactForm.jsx:47 ~ submitFn ~ vals:", vals)
      submitHandler(vals);
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(submitFn)}>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="from"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="from"
              fullWidth
              error={!!errors.from}
              helperText={errors.from?.message}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="subject"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="subject"
              fullWidth
              error={!!errors.subject}
              helperText={errors.subject?.message}
            />
          )}
        />
      </div>
      <div style={formRowStyle}>
        <Controller
          control={control}
          name="message"
          defaultValue={""}
          render={({ field }) => (
            <TextField
              type="text"
              {...field}
              label="message"
              fullWidth
              multiline
              rows={4}
              error={!!errors.message}
              helperText={errors.message?.message}
            />
          )}
        />
      </div>
      

      <div style={{ marginTop: 20 }}>
        <Button
          type="reset"
          onClick={() => reset()}
          variant="contained"
          sx={{ mr: 2 }}
          disabled={!isDirty}
          color="secondary"
        >
          Reset
        </Button>
        <Button
          type="submit"
          primary="true"
          variant="contained"
          disabled={isSubmitting || !isDirty || (isDirty && !isValid)}
          color="secondary"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}