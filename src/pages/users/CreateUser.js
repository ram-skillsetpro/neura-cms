import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress, FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material';
import style from './Users.module.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SnackBar from '../../components/SnackBar';
import fetcher from '../../utils/fetcher';

const CreateUser = ({closeEvent}) => {  

    const [progress, setProgress] = useState(false);
    const [countryList, setCountryList] = useState([]);

    const [snackbar, setSnackbar] = useState({
        show: false,
        status: "",
        message: "",
      });
    const toggleSnackbar = (value) => {
        setSnackbar(value);
    };

    const [formData, setFormData] = useState({
        countryCode: '+91',
        email: '',
        name: '',
        roleId: '',
        phone: '',
        status: true
    });

    const handleSnackMsg = (res) => {
        setSnackbar({
            show: true,
            status: res?.status === 200 ? 'success' : 'error',
            message: res?.status === 200 ? 'User created successfully' : (res?.response || res?.message)
        });
    };
    const handleSubmit = async (values) => {
        try {
            setProgress(true);
            const res = await fetcher.post('cms/create-user', values);
            handleSnackMsg(res);
            if (res.status === 200) {
                setTimeout(() => {
                    closeEvent();
                }, 3000);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setProgress(false);
        }
    };

    const validationSchema = Yup.object().shape({
        countryCode: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string().required('Phone is required'),
        firstName: Yup.string().required('Company is required'),
        roleId: Yup.string().required('User type is required')
    });
    
    const formik = useFormik({
        initialValues: formData,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    const fetchCountryList = async () => {
        const res = await fetcher.get(`country-list`);
        setCountryList(res.response);
    }

    useEffect(() => {
        fetchCountryList();
    }, []);

    return(
        <>
            <div className="createMainTitle">
                <h2>Create User</h2>
                <IconButton onClick={closeEvent}>
                    <CloseIcon />
                </IconButton>
            </div>

            {progress ? <CircularProgress /> : null}
            <form onSubmit={formik.handleSubmit}>
                <div className="createSection mb-3"> 
                    
                    <section className="createFormSection">
                        <div className='row'>
                            <div className='col-md-6 form-group'>
                                <label className='label-control'>Name<span>*</span></label>
                                <input
                                    name="firstName"
                                    onChange={formik.handleChange}
                                    value={formik.values.firstName}
                                    type="text"
                                    className="form-control"
                                />
                                { formik.touched.firstName && formik.errors.firstName && (
                                    <div className='errorMsg'>{formik.errors.firstName}</div>
                                )}
                            </div>

                            <div className='col-md-6 form-group'>
                                <label className='label-control'>Email<span>*</span></label>
                                <input
                                    name="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    type="text"
                                    className="form-control"
                                />
                                { formik.touched.email && formik.errors.email && (
                                    <div className='errorMsg'>{formik.errors.email}</div>
                                )}
                            </div>

                            <div className='col-md-6 form-group'>
                                <label className='label-control'>Phone No.</label>
                                <div className='row no-gutters phoneNumberField'>
                                    <div className="col w65">
                                    <select
                                                name="countryCode"
                                                onChange={formik.handleChange}
                                                value={formik.values.countryCode}
                                                className='form-control px-2'
                                            >
                                                {countryList.map((country, index) => (
                                                    <option key={index} value={country.country_code}>
                                                        {country.country_code}
                                                    </option>
                                                ))}
                                            </select>
                                    </div>
                                    <div className="col">
                                        <input
                                            name="phone"
                                            onChange={formik.handleChange}
                                            value={formik.values.phone}
                                            type="text"
                                            className="form-control"
                                        />
                                        { formik.touched.phone && formik.errors.phone && (
                                            <div className='errorMsg'>{formik.errors.phone}</div>
                                        )}
                                    </div>
                                </div> 
                            </div>

                            <div className='col-md-6 form-group'>
                                <label className='label-control'>User Type</label>
                                <select
                                    className='form-control'
                                    name='roleId'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.roleId}
                                    >
                                    <option value='' label='Select user type' />
                                    <option value='7' label='Legal DE' />
                                    <option value='6 Manager' label='Legal QC' />
                                    <option value='9' label='Sales Ops' />
                                    <option value='10' label='Legal Ops' />
                                </select>
                                { formik.touched.roleId && formik.errors.roleId && (
                                    <div className='errorMsg'>{formik.errors.roleId}</div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
                
                <div className='d-flex justify-content-end'>
                    <button className='btn btn-outline-primary mr-2' onClick={closeEvent}>Cancel</button>
                    <button type="submit" className='btn btn-primary' disabled={progress}>Save User</button>
                </div>
            </form>
            <SnackBar {...snackbar} onClose={toggleSnackbar} />
            
        </>
    )
}

export default CreateUser;
