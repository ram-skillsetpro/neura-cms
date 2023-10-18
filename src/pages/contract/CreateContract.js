import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material';
import fetcher from '../../utils/fetcher';
import { useFormik } from 'formik';
import * as Yup from 'yup'; 

const CreateContract = ({closeEvent, contract}) => {
    
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

    const handleSubmit = async (values) => {
        try {
            if (contract?.id) {
                await fetcher.post(`cms/edit-contract-type`, values);
            } else {
                await fetcher.post('cms/add-contract-type', values);
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
        onSubmit: handleSubmit
    });

    useEffect(() => {
    }, []);

    return(
        <>
            <div className="createMainTitle">
                <h2>{contract ? 'Edit Contract' : 'Create Contract'}</h2>
                <IconButton onClick={closeEvent}>
                    <CloseIcon />
                </IconButton>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className="createSection mb-3">  
                    <section className="createFormSection">
                        <div className='form-group'>
                            <label className='label-control'>Contract Name<span>*</span></label>
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
                            <label className='label-control'>Contract Description</label>
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
                    <button type="submit" className='btn btn-primary'>Save Contract</button>
                </div>
            </form>
            
        </>
    )
}

export default CreateContract;
