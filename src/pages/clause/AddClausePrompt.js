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

const AddClausePrompt = ({ submitCallback, clause }) => {
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
        text: clause?.text || '',
        clauseid: clause?.clauseid || '',
        companyid: clause?.companyid || '',
        id: clause?.id || '',
        isActive: clause?.isActive || ''
    });

    const validationSchema = Yup.object().shape({
        text: Yup.string().required('Clause text is required')
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
            if (clause?.id) {
                await fetcher.post(`cms/edit-clause-prompt`, values);
            } else {
                await fetcher.post('cms/add-clause-prompt', values);
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
          Add Clause Prompt
        </Typography>
            <TextField
                fullWidth
                label="Clause Text"
                name="text"
                placeholder='Clause Text'
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.text}
                variant="outlined" 
                size="small"
            />
            {formik.touched.text && formik.errors.text && (
                <div>{formik.errors.text}</div>
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

export default AddClausePrompt;

