import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material';
import fetcher from '../../utils/fetcher'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CreateRole = ({closeEvent, role}) => {
    const [authorities, setAuthorities] = useState([]);

    const [formData, setFormData] = useState({
        name: role?.name || '',
        description: role?.description || '',
        status: role?.status || 1,
        authorities: role?.authorities || [],
        roleId: role?.roleId || null
    });

    const fetchAuthorities = async () => {
        try {
            const res = await fetcher.get(`authorities?status=1`);
            setAuthorities(res.response);

            if (role) {
                const filteredArray = res.response.filter(item1 => role.authorities.some(item2 => item2.id === item1.id));
                setFormData(prevFormData => ({
                    ...prevFormData,
                    authorities: filteredArray
                }));
            }
        } catch (err) {
          console.log(err);
        }
    };

    const handleSubmit = async (values) => {
        try {
            if (role) {
                await fetcher.put('roles', values);
            } else {
                await fetcher.post('roles', values);
            }
            closeEvent();
        } catch (err) {
            console.log(err);
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        status: Yup.string().required('Status is required'),
        authorities: Yup.array().min(1, 'Select at least one authority'),
    });
    
    const formik = useFormik({
        initialValues: formData,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    const handleCheckboxChange = (value) => {
        const isChecked = formik.values.authorities.includes(value);
        const updatedCheckboxes = isChecked
          ? formik.values.authorities.filter((checkbox) => checkbox !== value)
          : [...formik.values.authorities, value];
    
        formik.setFieldValue('authorities', updatedCheckboxes);
    };

    useEffect(() => {
        formik.setValues(formData);
      }, [formData]); 

    useEffect(() => {
        formik.validateForm();
    }, [formik.values.authorities]);

    useEffect(() => {
        fetchAuthorities();
    }, []);

    return(
        <>
            <div className="createMainTitle">
                <h2>{role ? 'Edit Role' : 'Create Role'}</h2>
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
                            <div className='errorMsg'>{formik.errors.name}</div>
                        )}
                    </div>

                    <div className='form-group'>
                        <label className='label-control'>Description</label>
                        <textarea
                            name="description"
                            onChange={formik.handleChange}
                            value={formik.values.description}
                            className="form-control h_90"
                        ></textarea>
                        { formik.touched.description && formik.errors.description && (
                            <div className='errorMsg'>{formik.errors.description}</div>
                        )}
                    </div>

                    <div className='form-group m-0'>
                        <label className='label-control'>Role Status</label> 
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
            
            <div className="createSection mb-3"> 
                <h3 className="createSubTitle">Authorities Maping</h3> 
                
                <section className="createFormSection">  
                    <div className='row'>
                        {authorities.map((item, index) => 
                            <div className='col-md-6 mb-3' key={index}>
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                                        checked={formik.values.authorities.includes(item)}
                                        onChange={() => handleCheckboxChange(item)}
                                    />
                                    }
                                    label={item.name}
                                />
                            </div>
                        )}
                    </div>
                    {formik.touched.authorities && formik.errors.authorities && (
                        <div className='errorMsg'>{formik.errors.authorities}</div>
                    )}
                </section>
            </div>

            <div className='d-flex justify-content-end'>
                {/* <button className='btn btn-danger mr-auto'>Delete Role</button> */}
                <button className='btn btn-outline-primary mr-2' onClick={closeEvent}>Cancel</button>
                <button type="submit" className='btn btn-primary'>Save Role</button>
            </div>
            </form>
            
        </>
    )
}

export default CreateRole;
