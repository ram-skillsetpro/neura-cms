import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material';
import fetcher from '../../utils/fetcher'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CreateAuthority = ({closeEvent, authority}) => {

    const [formData, setFormData] = useState({
        name: authority?.name || '',
        description: authority?.description || '',
        status: authority?.status || 1,
        id: authority?.id || null
    });
    
    const handleSubmit = async (values) => {
        try {
            if (authority) {
                await fetcher.put('authority', values);
            } else {
                await fetcher.post('authority', values);
            }
            closeEvent();
        } catch (err) {
            console.log(err);
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        status: Yup.string().required('Status is required')
    });
    
    const formik = useFormik({
        initialValues: formData,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    return(
        <>
            <div className="createMainTitle">
                <h2>{authority ? 'Edit Authority' : 'Create Authority' }</h2>
                <IconButton onClick={closeEvent}>
                    <CloseIcon />
                </IconButton>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className="createSection mb-3"> 
                    <h3 className="createSubTitle">General</h3 > 
                    <section className="createFormSection">
                        <div className='form-group'>
                            <label className='label-control'>Title<span>*</span></label>
                            <input
                                name="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                type="text"
                                className="form-control"
                            />
                            { formik.touched.name && formik.errors.name && (
                                <div>{formik.errors.name}</div>
                            )}
                        </div>

                        <div className='form-group'>
                            <label className='label-control'>Description</label>
                            <textarea
                                name="description"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                                className="form-control"
                            ></textarea>
                            { formik.touched.description && formik.errors.description && (
                                <div>{formik.errors.description}</div>
                            )}
                        </div>

                        <div className='form-group m-0'>
                            <label className='label-control'>Authority Status</label> 
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="status"
                                value={formik.values.status}
                                onChange={formik.handleChange}
                            >
                                <FormControlLabel
                                    value="1"
                                    control={<Radio sx={{'& .MuiSvgIcon-root': { fontSize: 18, }}} />}
                                    label="Active"
                                />
                                <FormControlLabel
                                    value="0"
                                    control={<Radio sx={{'& .MuiSvgIcon-root': { fontSize: 18, }}} />}
                                    label="Inactive"
                                />
                            </RadioGroup>
                        </div>
                    </section>
                </div> 

                <div className='d-flex justify-content-end'>
                    <button className='btn btn-outline-primary mr-2' onClick={closeEvent}>Cancel</button>
                    <button type="submit" className='btn btn-primary'>Save Authority</button>
                </div>
            </form>
            
        </>
    )
}

export default CreateAuthority;
