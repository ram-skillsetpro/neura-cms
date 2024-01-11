import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SnackBar from '../../components/SnackBar';
import fetcher from '../../utils/fetcher';

const ChangePassword = () => {

  const [snackbar, setSnackbar] = useState({
    show: false,
    status: "",
    message: "",
  });
  const toggleSnackbar = (value) => {
    setSnackbar(value);
  };

  const handleSubmit = async (values) => {
    const res = await fetcher.post('cms/user-change-password', values);
    setSnackbar({
      show: true,
      status: res.status === 200 ? 'success' : 'error',
      message: res.status === 200 ? 'Saved successfully' : res?.message
    });
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Old Password is required'),
      newPassword: Yup.string()
        .required('New Password is required')
        .min(8, 'Password must be at least 8 characters'),
    }),
    onSubmit: handleSubmit
  });

  return (
    <>
      <SnackBar {...snackbar} onClose={toggleSnackbar} />
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.oldPassword} />
          {formik.touched.oldPassword && formik.errors.oldPassword && (
            <div>{formik.errors.oldPassword}</div>
          )}
        </div>

        <div>
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword} />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <div>{formik.errors.newPassword}</div>
          )}
        </div>

        <button type="submit">Change Password</button>
      </form></>
  );
};

export default ChangePassword;
