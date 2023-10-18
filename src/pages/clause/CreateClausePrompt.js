import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import fetcher from '../../utils/fetcher';

const CreateClausePrompt = ({closeEvent, clause}) => {  
    
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

    const handleSubmit = async (values) => {
        try {
            if (clause?.id) {
                await fetcher.post(`cms/edit-clause-prompt`, values);
            } else {
                await fetcher.post('cms/add-clause-prompt', values);
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
                <h2>Clause Prompt</h2>
                <IconButton onClick={closeEvent}>
                    <CloseIcon />
                </IconButton>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className="createSection mb-3">  
                    <section className="createFormSection">  
                        <div className='form-group'>
                            <label className='label-control'>Clause Text</label>
                            <textarea
                                name="text"
                                onChange={formik.handleChange}
                                value={formik.values.text}
                                className="form-control"
                            ></textarea>
                            { formik.touched.text && formik.errors.text && (
                                <div className='errorMsg'>{formik.errors.text}</div>
                            )}
                        </div>
                    </section>
                </div>
                
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-outline-primary mr-2' onClick={closeEvent}>Cancel</button>
                    <button type="submit" className='btn btn-primary'>Save Clause Prompt</button>
                </div>
            </form>
        </>
    )
}

export default CreateClausePrompt;
