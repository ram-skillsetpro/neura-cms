import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material';
import fetcher from '../../utils/fetcher'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CreateCompany = ({closeEvent, company}) => {   
    
    const [formData, setFormData] = useState({
        companyDescription: company?.description || '',
        companyName: company?.name || '',
        id: company?.id || ''
    });

    const validationSchema = Yup.object().shape({
        companyDescription: Yup.string().required('Company description is required'),
        companyName: Yup.string().required('Company name is required')
    });

    const handleSubmit = async (values) => {
        try {
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
            closeEvent();
        }
    }

    const formik = useFormik({
        initialValues: formData,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    useEffect(() => {
    }, []);
    
    return(
        <>
            <div className="createMainTitle">
                <h2>{company ? 'Edit Company' : 'Create Company'}</h2>
                <IconButton onClick={closeEvent}>
                    <CloseIcon />
                </IconButton>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className="createSection mb-3"> 
                    
                    <section className="createFormSection">
                        <div className='form-group'>
                            <label className='label-control'>Company name<span>*</span></label>
                            <input
                                name="companyName"
                                onChange={formik.handleChange}
                                value={formik.values.companyName}
                                type="text"
                                className="form-control"
                            />
                            { formik.touched.companyName && formik.errors.companyName && (
                                <div className='errorMsg'>{formik.errors.companyName}</div>
                            )} 
                        </div>

                        <div className='form-group'>
                            <label className='label-control'>Company Logo</label>
                            <input
                                name="companyLogo" 
                                type="file"
                                className="form-control"
                            />
                        </div>

                        <div className='form-group'>
                            <label className='label-control'>Company Description</label>
                            <textarea
                                name="companyDescription"
                                onChange={formik.handleChange}
                                value={formik.values.companyDescription}
                                className="form-control"
                            ></textarea>
                            { formik.touched.companyDescription && formik.errors.companyDescription && (
                                <div className='errorMsg'>{formik.errors.companyDescription}</div>
                            )} 
                        </div>
                    </section>
                </div>
                

                <div className='d-flex justify-content-end'>
                    <button className='btn btn-outline-primary mr-2' onClick={closeEvent}>Cancel</button>
                    <button type="submit" className='btn btn-primary'>Save Company</button>
                </div>
            </form>
            
        </>
    )
}

export default CreateCompany;
