import {
    Box,
    Button,
    Input, CircularProgress, Paper, TextField} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import fetcher from '../../utils/fetcher'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SnackBar from "../../components/SnackBar";

const CreateContract = ({ submitCallback, contract }) => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(false);
    const [snackbar, setSnackbar] = useState({
        show: false,
        status: "",
        message: "",
      });
      const toggleSnackbar = (value) => {
        setSnackbar(value);
      };
    
    const [formData, setFormData] = useState({
        desc: contract?.desc || '',
        name: contract?.name || '',
        id: contract?.id || '',
        is_active: contract?.is_active || ''
    });

    const validationSchema = Yup.object().shape({
        desc: Yup.string().required('Contract description is required'),
        name: Yup.string().required('Contract name is required')
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (values) => {
        try {
            setProgress(true);
            if (contract?.id) {
                await fetcher.post(`cms/edit-contract-type`, values);
            } else {
                await fetcher.post('cms/add-contract-type', values);
            }
            setSnackbar({
                show: true,
                status: 'success',
                message: 'Saved successfully'
            });
        } catch (err) {
            console.log(err);
        } finally {
            setProgress(false);
            submitCallback();
        }
    }

    const formik = useFormik({
        initialValues: formData,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    useEffect(() => {
    }, []);


    return (
        <Container maxWidth="xs" component={Paper}>
        {progress ? <CircularProgress /> : null}
       
        <Box component="form" sx={{ mt: 1 }} className='form-bx'>
        <Typography component="h3">
          Create Contract
        </Typography>
            <TextField
                fullWidth
                label="Contract Description"
                name="desc"
                placeholder='Contract Description'
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.desc}
                variant="outlined" 
                size="small"
            />
            {formik.touched.desc && formik.errors.desc && (
                <div>{formik.errors.desc}</div>
            )}
            <TextField
                fullWidth
                name="name"
                label="Contract Name"
                placeholder='Contract Name'
                onChange={formik.handleChange}
                value={formik.values.name}
                variant="outlined" 
                size="small"
            />
            {formik.touched.name && formik.errors.name && (
                <div>{formik.errors.name}</div>
            )}
            <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={formik.handleSubmit}
            >
                Save
            </Button>
        </Box>
        <SnackBar {...snackbar} onClose={toggleSnackbar} />
        </Container>
        
    )
}

export default CreateContract;

