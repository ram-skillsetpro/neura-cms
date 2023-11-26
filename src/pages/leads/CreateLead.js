import React, { useState, useEffect } from "react";
import { Autocomplete, FormControlLabel, IconButton, Radio, RadioGroup, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import fetcher from "../../utils/fetcher";
import { useFormik, Field } from 'formik';
import * as Yup from 'yup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SnackBar from "../../components/SnackBar";

const CreateLead = ({closeEvent, lead, companyList, packageList}) => {

    const [companies, setCompanies] = useState([]);
    const [packages, setPackages] = useState([]);

    const [snackbar, setSnackbar] = useState({
        show: false,
        status: "",
        message: "",
      });
    const toggleSnackbar = (value) => {
        setSnackbar(value);
    };

    const [formData, setFormData] = useState({
        companyId: lead?.companyId || '',
        email: lead?.email || '',
        isLeadActive: lead?.isLeadActive || 1,
        name: lead?.userName || '',
        packageId: lead?.packageId || 1,
        packageStartDate: lead?.packageStartDate ? new Date(lead.packageStartDate * 1000) : null,
        phone: lead?.phone || '',
        userId: lead?.id || ''
    });

    const handleSubmit = async (values) => {
        try {
            const payload = { ...values };
            payload.packageStartDate = values.packageStartDate.getTime() / 1000;
            const res = await fetcher.post('/cms/create-lead', payload);
            if (res.status !== 200) {
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
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        phone: Yup.string().required('Phone is required'),
        companyId: Yup.string().required('Company is required'),
        packageStartDate: Yup.date().required('Package start date is required')
    });
    
    const formik = useFormik({
        initialValues: formData,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    useEffect(() => {
        setCompanies(companyList.map(i => ({
            label: i.name,
            id: i.id
          })));
        setPackages(packageList.map(i => ({
            label: i.name,
            id: i.id
          })));
      }, []);
    return(
        <>
            <div className="createMainTitle">
                <h2>Create Lead</h2>
                <IconButton onClick={closeEvent}>
                    <CloseIcon />
                </IconButton>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className="createSection mb-3"> 
                    <h3 className="createSubTitle">General</h3 > 
                    
                    <section className="createFormSection">
                        <div className='form-group'>
                            <label className='label-control'>Contact Name<span>*</span></label>
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


                        <div className='form-group'>
                            <label className='label-control'>Phone<span>*</span></label>
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

                        <div className='form-group'>
                            <label className='label-control'>Company</label>
                            <div className="customAutoField">
                                <Autocomplete
                                options={companies}
                                getOptionLabel={(option) => option.label}
                                value={companies.find((company) => company.id === formData.companyId) || null}
                                onChange={(_, newValue) => {
                                    setFormData((prevData) => ({
                                    ...prevData,
                                    companyId: newValue ? newValue.id : '',
                                    }));
                                }}
                                renderInput={(params) => <TextField {...params} />}
                                />
                                {formik.touched.companyId && formik.errors.companyId && (
                                <div className="errorMsg">{formik.errors.companyId}</div>
                                )}
                            </div>
                        </div>

                        <div className='form-group'>
                            <label className='label-control'>Trial Package Start Date</label>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    className="datepickerStyle"
                                    name="packageStartDate"
                                    value={formik.values.packageStartDate}
                                    onChange={(date) => formik.setFieldValue('packageStartDate', date)}
                                    onBlur={formik.handleBlur}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            {formik.touched.packageStartDate && formik.errors.packageStartDate && (
                                <div className="errorMsg">{formik.errors.packageStartDate}</div>
                            )}
                        </div> 

                        <div className='form-group m-0'>
                            <label className='label-control'>Lead Status</label> 
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="isLeadActive"
                                value={formik.values.isLeadActive}
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
                    <button type="submit" className='btn btn-primary'>Save Lead</button>
                </div>
            </form>
            <SnackBar {...snackbar} onClose={toggleSnackbar} />

        </>
    )
}

export default CreateLead;