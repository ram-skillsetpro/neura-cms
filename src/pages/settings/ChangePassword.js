import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SnackBar from '../../components/SnackBar';
import fetcher from '../../utils/fetcher';
import style from './Settings.module.scss';

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
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required('Old Password is required'),
      newPassword: Yup.string()
        .required('New Password is required')
        .min(8, 'Password must be at least 8 characters'),
      confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
    }),
    onSubmit: handleSubmit
  });

  return (
    <div className={`${style.resetPasswordPage} whiteContainer`}>
      <SnackBar {...snackbar} onClose={toggleSnackbar} />
      <form onSubmit={formik.handleSubmit}>
        <h2>Reset Password</h2>
        <div className='form-group'>
          <label htmlFor="oldPassword" className='label-control'>Old Password</label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.oldPassword}
            className='form-control'  
          />
          {formik.touched.oldPassword && formik.errors.oldPassword && (
            <div className='errorMsg'>{formik.errors.oldPassword}</div>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor="newPassword" className='label-control'>New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword} 
            className='form-control'
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <div className='errorMsg'>{formik.errors.newPassword}</div>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor="confirmPassword" className='label-control'>Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword} 
            className='form-control'
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className='errorMsg'>{formik.errors.confirmPassword}</div>
          )}
        </div>
         
        <button type="submit" className='btn btn-primary'>Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
