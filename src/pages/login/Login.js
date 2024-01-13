import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import fetcher from '../../utils/fetcher'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { isAuthenticated } from '../../utils/authGuard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import logoImg from '../../assets/images/simpleo-ai-logo@2x.png';
import loginBanner from '../../assets/images/mobile-login.jpg';
import style from './Login.module.scss';
import { hasAuthority } from '../../utils/authGuard';
import { AUTHORITY, PageUrls } from "../../utils/constants";
import SnackBar from '../../components/SnackBar';


const Login = () => {
  const navigate = useNavigate();
  const isAuthentic = isAuthenticated();
  const [showPassword, setShowPassword] = useState(false);

  const [snackbar, setSnackbar] = useState({
    show: false,
    status: "",
    message: "",
  });
  const toggleSnackbar = (value) => {
    setSnackbar(value);
  };

  const [formData, setFormData] = useState({
    emailId: '',
    password: ''
  });

  const validationSchema = Yup.object().shape({
    emailId: Yup.string()
      .email('Invalid email address')
      .required('Email address is required'),
    password: Yup.string()
      .required('Password is required')
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (values) => {
    console.log('submitting')
    try {
      const response = await fetcher.post('login', values);
      setSnackbar({
        show: true,
        status: response?.status === 200 ? 'success' : 'error',
        message: response?.status === 200 ? 'Login successfully' : response?.message
      });
      if (response?.response?.token) {
        localStorage.setItem('auth', JSON.stringify(response.response));
        navigateTo();
      }
    } catch (err) {
      console.log(err);
    }
  }

  const navigateTo = () => {
    if (hasAuthority(AUTHORITY.USER_SUPER_ADMIN)) {
      navigate(PageUrls.DASHBOARD);
    } else if (hasAuthority(AUTHORITY.USER_QC) || hasAuthority(AUTHORITY.USER_DE)) {
      navigate(PageUrls.TICKETS);
    } else if (hasAuthority(AUTHORITY.CLAUSE_PROMPT_MANAGEMENT)) {
      navigate(PageUrls.CONTRACT);
    } else if (hasAuthority(AUTHORITY.UPDATE_DEMO_USER)) {
      navigate(PageUrls.COMPANY);
    } else {
      navigate(PageUrls.DASHBOARD);
    }
  };

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isAuthentic) {
      navigateTo();
    }
  }, [])


  return (
    <>
      <SnackBar {...snackbar} onClose={toggleSnackbar} />
      <div className={style.loginWrapper}>
        <div className={style.loginContainer}>
          <div className='row no-gutters'>
            <div className='col-md-6 d-none d-md-block'>
              <div className={style.loginBanner}>
                  <img src={loginBanner} />
              </div>
            </div>
            <div className='col-md-6'>
              <div className={style.loginForm}>
                <div className={style.loginLogo}>
                  <img src={logoImg} alt="SimpleO.ai" />
                </div>
                <h1>Sign In</h1>
                <h2>Accelerate contract review and management with SimpLegal's AI-powered system.</h2>
                
                <div className='form-group'>
                  <label className='label-control'>Email Id<span>*</span></label>
                  <input
                      name="emailId"
                      onChange={formik.handleChange}
                      value={formik.values.emailId}
                      type="text"
                      className="form-control"
                  /> 
                    
                  {formik.touched.emailId && formik.errors.emailId && (
                    <div className='errorMsg'>{formik.errors.emailId}</div>
                  )}
                </div>
                <div className='form-group'>
                  <label className='label-control'>Password<span>*</span></label>
                  <div className={style.passwrordField}>
                    <input
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                    />
                    <Button
                      type="button"
                      variant="text"
                      className={style.viewBtn}
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </Button>
                  </div>
                  {formik.touched.password && formik.errors.password && (
                    <div className='errorMsg'>{formik.errors.password}</div>
                  )}
                </div>
                <button type="submit" className='btn btn-primary' onClick={formik.handleSubmit}>Sign In</button>
                
                <div className={style.forgotPassword}>
                  <a href="#">Forgot password ?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

