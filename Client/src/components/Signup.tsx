import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// TypeScript interface for form values
interface FormValues {
  username: string;
  email: string;
  password: string;
}

// Yup validation schema
const SignUpSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function SignUp() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );
  const { signup } = useAuth();
  const navigate = useNavigate();

  const initialValues: FormValues = {
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      await signup(values);
      resetForm();
      setSnackbarMessage("Signup successful");
      setSnackbarSeverity("success");
      navigate("/");
    } catch (error) {
      setSnackbarMessage("Signup failed");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form className="flex items-center justify-center h-screen">
            <div className="w-full max-w-md">
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-center mb-5">Sign Up</h2>
                <div className="mb-4">
                  <label htmlFor="username">Username</label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="username"
                    status={
                      touched.username && errors.username ? "error" : "default"
                    }
                    helperText={
                      touched.username && errors.username ? errors.username : ""
                    }
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    placeholder="email@example.com"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="email"
                    type="email"
                    status={touched.email && errors.email ? "error" : "default"}
                    helperText={
                      touched.email && errors.email ? errors.email : ""
                    }
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="password">Password</label>
                  <Input
                    id="password"
                    placeholder=" Enter your password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoComplete="new-password"
                    type="password"
                    status={
                      touched.password && errors.password ? "error" : "default"
                    }
                    helperText={
                      touched.password && errors.password ? errors.password : ""
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                    auto
                    shadow
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
