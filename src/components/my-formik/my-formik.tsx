"use client";

import { Formik, Form, FormikHelpers, FormikState, FormikErrors } from "formik";
import React, { ReactNode, useState } from "react";
import * as Yup from "yup";

type MyFormikProps<T> = {
  children: ReactNode;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void;
  className?: string;
  initialValues: T;
  setFormikValues?: (values: T) => void;
  setFormikErrors?: (errors: FormikErrors<T>) => void;
  validationSchema?: Yup.ObjectSchema<any>;
  enableReinitialize?: boolean;
};
const MyFormik = <T extends object>({
  children,
  onSubmit,
  className,
  initialValues,
  setFormikErrors,
  setFormikValues,
  validationSchema,
  enableReinitialize = false,
}: MyFormikProps<T>) => {
  return (
    <Formik
      enableReinitialize={enableReinitialize}
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ values, errors }) => {
        setFormikErrors?.(errors);
        setFormikValues?.(values);
        return <Form className={className}>{children}</Form>;
      }}
    </Formik>
  );
};

export default MyFormik;
