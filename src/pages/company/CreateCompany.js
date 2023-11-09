import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Autocomplete, Checkbox, FormControlLabel, IconButton, Radio, RadioGroup, TextField } from '@mui/material';
import fetcher from '../../utils/fetcher';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SnackBar from "../../components/SnackBar";

const CreateCompany = ({closeEvent, company, packageList}) => {   

    const [packages, setPackages] = useState([]);
    const [formInitialized, setFormInitialized] = useState(false);
    const [logoFile, setLogoFile] = useState(null);
    const [formData, setFormData] = useState({
        description: company?.description || '',
        email: company?.email || '',
        isPackageActive: company?.isPackageActive || 0,
        logo: company?.logo || '',
        name: company?.name || '',
        packageId: company?.packageId || '',
        packageStartDate: company?.packageStartDate * 1000 || null,
        phone: company?.phone || '',
        user: company?.user || '',
        website: company?.website || '',
        id: company?.id || ''
    });

    const [snackbar, setSnackbar] = useState({
        show: false,
        status: "",
        message: "",
      });
    const toggleSnackbar = (value) => {
        setSnackbar(value);
    };

    const validationSchema = Yup.object().shape({
        description: Yup.string().required('Company description is required'),
        email: Yup.string().required('Email is required').email('Invalid email address'),
        logo: Yup.string().required('Company logo is required'),
        name: Yup.string().required('Company name is required'),
        packageId: Yup.string().required('Package is required'),
        packageStartDate: Yup.string().required('Package start date is required'),
        phone: Yup.string().required('Phone is required'),
        user: Yup.string().required('Contact name is required'),
        website: Yup.string().required('Website is required'),     
    });

    const handleSubmit = async (values) => {
        try {
            let res = null;
            values.packageStartDate = values.packageStartDate / 1000;
            if (company?.id) {
                const cmpRes = await fetcher.get(`cms/company-details?companyId=${company.id}`);
                cmpRes.response.description = values.description;
                cmpRes.response.companyEmail = values.email;
                cmpRes.response.isPackageActive = values.isPackageActive;
                cmpRes.response.logo = values.logo;
                cmpRes.response.name = values.name;
                cmpRes.response.packageId = values.packageId;
                cmpRes.response.packageStartDate = values.packageStartDate;
                cmpRes.response.companyPhone = values.phone;
                cmpRes.response.companyUser = values.user;
                cmpRes.response.website = values.website;
                res = await fetcher.post('cms/edit-company', cmpRes.response);
            } else {
                res = await fetcher.post('cms/create-company', values);
            }
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
        }
    }

    const formik = useFormik({
        initialValues: formData,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    const handleLogoFileChange = async (event) => {
        try {
            const file = event.target.files[0];
            const data = {'companyName': formik.values.name};
            if (formik.values.name) {
                data['companyId'] = formik.values.id;
            }
            const res = await fetcher.post(`cms/create-company-logo?extension=${file.name.split('.').pop()}`, data);

            if (res.status === 200) {
                await fetcher.putFile(res.response, file);
                formik.setFieldValue('logo', res.response.split('?')[0]);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        console.log(company);
        setPackages(packageList.map(i => ({
            label: i.name,
            id: i.id
        })));
        setFormInitialized(true);
        formik.setTouched(true);
    }, []);

    return(
        <>
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
                                                <select className='form-control px-2'>
                                                    <option>+91</option>
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


                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='label-control'>Package Name</label>
                                        <div className="customAutoField">
                                            <Autocomplete
                                                options={packages}
                                                getOptionLabel={(option) => option.label}
                                                value={packages.find(i => i.id === formik.values.packageId)}
                                                onChange={(_, newValue) => {
                                                        const pac = packageList.find(i => i.id === newValue?.id)?.isActive ? 1 : 0;
                                                        formik.setFieldValue('isPackageActive', pac);
                                                        formik.setFieldValue('packageId', newValue ? newValue.id : '');
                                                    }
                                                }
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                            {formik.touched.packageId && formik.errors.packageId && (
                                                <div className="errorMsg">{formik.errors.packageId}</div>
                                            )} 
                                        </div>
                                    </div> 
                                </div>

                                <div className='col-md-6'>
                                    <div className='form-group'>
                                        <label className='label-control'>Package Start Date</label>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                name="packageStartDate"
                                                value={formik.values.packageStartDate}
                                                onChange={(date) => {
                                                        formik.setFieldValue('packageStartDate', date.getTime())
                                                    }
                                                }
                                                onBlur={formik.handleBlur}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </LocalizationProvider>
                                        {formik.touched.packageStartDate && formik.errors.packageStartDate && (
                                            <div className="errorMsg">{formik.errors.packageStartDate}</div>
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
                        <button type="submit" className='btn btn-primary' disabled={!formik.isValid}>Save Company</button>
                    </div>
                </form>
            )}
            <SnackBar {...snackbar} onClose={toggleSnackbar} />
        </>
    )
}

export default CreateCompany;
