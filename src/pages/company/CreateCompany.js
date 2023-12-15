import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete, Checkbox, CircularProgress, IconButton, Radio, RadioGroup, TextField } from '@mui/material';
import fetcher from '../../utils/fetcher';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SnackBar from "../../components/SnackBar";

const CreateCompany = ({closeEvent, company, packageList}) => {   

    const [countryList, setCountryList] = useState([]);
    const [packages, setPackages] = useState([]);
    const [formInitialized, setFormInitialized] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [logoUploadUrl, setLogoUploadUrl] = useState(null);
    const [progress, setProgress] = useState(false);
    const [formData, setFormData] = useState({
        description: company?.description || '',
        email: company?.companyEmail || '',
        logo: company?.logo || '',
        name: company?.name || '',
        packageId: company?.packageId || 1,
        phone: company?.companyPhone || '',
        user: company?.companyUser || '',
        website: company?.website || '',
        companyId: company?.id || '',
        countryCode: company?.countryCode || '+91'
    });

    const [snackbar, setSnackbar] = useState({
        show: false,
        status: "",
        message: "",
      });
    const toggleSnackbar = (value) => {
        setSnackbar(value);
    };

    const fetchCountryList = async () => {
        const res = await fetcher.get(`country-list`);
        setCountryList(res.response);
    }

    const validationSchema = Yup.object().shape({
        description: Yup.string().required('Company description is required'),
        email: Yup.string().required('Email is required').email('Invalid email address'),
        logo: Yup.string().required('Company logo is required'),
        name: Yup.string().required('Company name is required'),
        phone: Yup.string().required('Phone is required'),
        user: Yup.string().required('Contact name is required'),
        website: Yup.string().required('Website is required')
    });  

    const handleSubmit = async (values) => {
        try {
            setProgress(true);
            if (logoFile && logoUploadUrl) {
                await fetcher.putFile(logoUploadUrl, logoFile);
            }

            const res = await fetcher.post('cms/create-company', values);
            if (res?.status !== 200) {
                setSnackbar({
                  show: true,
                  status: 'error',
                  message: res?.response || res?.message
                });
                return;
            }
            closeEvent();
        } catch (err) {
            console.log(err);
            setSnackbar({
                show: true,
                status: 'error',
                message: 'Something went wrong'
              });
        } finally {
            setProgress(false);
        }
    }

    const formik = useFormik({
        initialValues: formData,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    const handleLogoFileChange = async (event) => {
        try {
            setProgress(true);
            const file = event.target.files[0];
            const data = {'companyName': formik.values.name};
            if (formik.values.name) {
                data['companyId'] = formik.values.id;
            }
            const res = await fetcher.post(`cms/create-company-logo?extension=${file.name.split('.').pop()}`, data);

            if (res.status === 200) {
                setLogoFile(file);
                setLogoUploadUrl(res.response);
                formik.setFieldValue('logo', res.response.split('?')[0]);
            } else {
                event.target.value = null;
                setSnackbar({
                    show: true,
                    status: 'error',
                    message: res?.response || res?.message
                });
            }
        } catch (err) {
            event.target.value = null;
            console.log(err);
        } finally {
            setProgress(false);
        }
    };

    useEffect(() => {
        fetchCountryList();
        setPackages(packageList.map(i => ({
            label: i.name,
            id: i.id
        })));
        setFormInitialized(true);
        formik.setTouched(true);
    }, []);

    return(
        <>
            { progress ? <CircularProgress /> : null }
            <div className="createMainTitle">
                <h2>{company ? 'Edit Company' : 'Create Company'}</h2>
                <IconButton onClick={closeEvent}>
                    <CloseIcon />
                </IconButton>
            </div>

            {formInitialized && (
                <form onSubmit={formik.handleSubmit}>
                    <div className="createSection mb-3"> 
                        
                        <section className="createFormSection">
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='label-control'>Company name<span>*</span></label>
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
                                </div> 
                                
                                <div className='col-md-6'> 
                                    <div className='form-group'>
                                        <label className='label-control'>Company Logo</label>
                                        <input
                                            name="companyLogo" 
                                            type="file"
                                            className="form-control"
                                            onChange={handleLogoFileChange}
                                        />
                                        { formik.touched.logo && formik.errors.logo && (
                                            <div className='errorMsg'>{formik.errors.logo}</div>
                                        )}
                                    </div>
                                </div>


                                <div className='col-md-6'> 
                                    <div className='form-group'>
                                        <label className='label-control'>Contact name<span>*</span></label>
                                        <input
                                            name="user"
                                            onChange={formik.handleChange}
                                            value={formik.values.user}
                                            type="text"
                                            className="form-control"
                                        />
                                        { formik.touched.user && formik.errors.user && (
                                            <div className='errorMsg'>{formik.errors.user}</div>
                                        )} 
                                    </div>
                                </div>

                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='label-control'>Email</label>
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
                                </div>
                                
                                <div className='col-md-6'>
                                    <div className='form-group'>
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
                                </div>

                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='label-control'>Website</label>
                                        <input
                                            name="website"
                                            onChange={formik.handleChange}
                                            value={formik.values.website}
                                            type="text"
                                            className="form-control"
                                        />
                                        { formik.touched.website && formik.errors.website && (
                                            <div className='errorMsg'>{formik.errors.website}</div>
                                        )}                        
                                    </div>
                                </div>                                
                            </div>

                            <div className='form-group'>
                                <label className='label-control'>Company Description</label>
                                <textarea
                                    name="description"
                                    onChange={formik.handleChange}
                                    value={formik.values.description}
                                    className="form-control"
                                ></textarea>
                                { formik.touched.description && formik.errors.description && (
                                    <div className='errorMsg'>{formik.errors.description}</div>
                                )} 
                            </div>
                        </section>
                    </div>
                    

                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-outline-primary mr-2' onClick={closeEvent}>Cancel</button>
                        <button type="submit" className='btn btn-primary' disabled={!formik.isValid || progress}>Save Company</button>
                    </div>
                </form>
            )}
            <SnackBar {...snackbar} onClose={toggleSnackbar} />
        </>
    )
}

export default CreateCompany;
