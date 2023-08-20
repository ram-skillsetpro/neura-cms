import {
    Box,
    Button,
    Input, CircularProgress} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import fetcher from '../../utils/fetcher'
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Create = ({ submitCallback, company }) => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(false);
    
    const [formData, setFormData] = useState({
        companyDescription: company?.description || '',
        companyName: company?.name || '',
        id: company?.id || ''
    });

    const validationSchema = Yup.object().shape({
        companyDescription: Yup.string().required('Company description is required'),
        companyName: Yup.string().required('Company name is required')
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
            if (company?.id) {
                const cmpRes = await fetcher.get(`cms/company-details?companyId=${company.id}`);
                cmpRes.response.description = values.companyDescription;
                cmpRes.response.name = values.companyName;
                await fetcher.post('cms/edit-company', cmpRes.response);
            } else {
                await fetcher.post('cms/create-company', values);
            }
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
        <Container component="main" maxWidth="xs">
        {progress ? <CircularProgress /> : null}
        <Typography component="h1" variant="h5">
          Create Company
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
            <Input
                fullWidth
                label="Company Description"
                name="companyDescription"
                placeholder='Company Description'
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.companyDescription}
            />
            {formik.touched.companyDescription && formik.errors.companyDescription && (
                <div>{formik.errors.companyDescription}</div>
            )}
            <Input
                fullWidth
                name="companyName"
                label="Company Name"
                placeholder='Company Name'
                onChange={formik.handleChange}
                value={formik.values.companyName}
            />
            {formik.touched.companyName && formik.errors.companyName && (
                <div>{formik.errors.companyName}</div>
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
        </Container>
    )
}

export default Create;

