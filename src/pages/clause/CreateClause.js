import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material'; 
import fetcher from '../../utils/fetcher';
import { useFormik } from 'formik';
import * as Yup from 'yup'; 

const CreateClause = ({closeEvent, clause}) => {

    const [formData, setFormData] = useState({
        desc: clause?.desc || '',
        name: clause?.name || '',
        id: clause?.id || '',
        is_active: clause?.is_active || ''
    });

    const validationSchema = Yup.object().shape({
        desc: Yup.string().required('Clause description is required'),
        name: Yup.string().required('Clause name is required')
    });

    const handleSubmit = async (values) => {
        try {
            if (clause?.id) {
                await fetcher.post(`cms/edit-clause-type`, values);
            } else {
                await fetcher.post('cms/add-clause-type', values);
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
                <h2>{clause ? 'Edit Clause' : 'Create Clause'}</h2>
                <IconButton onClick={closeEvent}>
                    <CloseIcon />
                </IconButton>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className="createSection mb-3">  
                    <section className="createFormSection">
                        <div className='form-group'>
                            <label className='label-control'>Clause Name<span>*</span></label>
                            <input
                                name="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                type="text"
                                className="form-control"
                            />
                            { formik.touched.name && formik.errors.name && (
                                <div className='errorMsg'>{formik.errors.name}</div>
                            )}  
                        </div>
 
                        <div className='form-group'>
                            <label className='label-control'>Clause Description</label>
                            <textarea
                                name="desc"
                                onChange={formik.handleChange}
                                value={formik.values.desc}
                                className="form-control"
                            ></textarea>
                            { formik.touched.desc && formik.errors.desc && (
                                <div className='errorMsg'>{formik.errors.desc}</div>
                            )}
                        </div>
                    </section>
                </div>
                
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-outline-primary mr-2' onClick={closeEvent}>Cancel</button>
                    <button type="submit" className='btn btn-primary'>Save Clause</button>
                </div>
            </form>
        </>
    )
}

export default CreateClause;
