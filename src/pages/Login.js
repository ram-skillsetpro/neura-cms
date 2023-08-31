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
import fetcher from '../utils/fetcher'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { isAuthenticated } from '../utils/authGuard';

const Login = () => {
  const navigate = useNavigate();
  const isAuthentic = isAuthenticated();

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
      if (response?.response?.token) {
        localStorage.setItem('auth', JSON.stringify(response.response));
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const formik = useFormik({
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (isAuthentic) {
      navigate('/');
    }
  }, [])


  return (
    <Container component="main">
      <CssBaseline />
      <Grid container className='login-bx'>
  <Grid item xs={5} className='loging-left'>
    <box className="popup-slide-image-container">
    <img src='images/list-view.png'></img>
    </box>
    <box className="popup-slide-text">
    <Typography component="h3">The Future of Contract Management is here.</Typography>
    <Typography component="p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pretium et ipsum sed consequat. Pellentesque habitant morbi tristique senectus et netus et</Typography>
    </box>
  </Grid>
  <Grid item xs={7} className='loging-right'>
  <Box className="login-form">
  <img src='images/simpleo-ai-logo@2x.png' style={{width:'20%', display:'block', margin:'20px auto'}}></img>
        <Typography component="h4">
          Sign in
        </Typography>
        <Typography component="p">Accelerate contract review and management with SimpLegal's AI-powered system.</Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Email Id"
            name="emailId"
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.emailId}
            size="small"
          />
          {formik.touched.emailId && formik.errors.emailId && (
            <div>{formik.errors.emailId}</div>
          )}
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            size="small"
          />
          {formik.touched.password && formik.errors.password && (
            <div>{formik.errors.password}</div>
          )}
           <Grid container>
            <Grid item xs>
            <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
            </Grid>
            <Grid item>
            <Link href="#" variant="body2" style={{marginTop:'10px', display:'inline-block'}}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={formik.handleSubmit}
          >
            Sign In
          </Button>
          <div style={{marginTop:'10px', textAlign:'center'}}>
          <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </div>
        </Box>
      </Box>
  </Grid>
</Grid>
      

    </Container>
  );
}

export default Login;

