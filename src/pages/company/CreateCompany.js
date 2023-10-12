import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material';
import fetcher from '../../utils/fetcher'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CreateCompanyNew = ({closeEvent}) => {   
    return(
        <>
            <div className="createMainTitle">
                <h2>Create Company</h2>
                <IconButton onClick={closeEvent}>
                    <CloseIcon />
                </IconButton>
            </div>

            <form>
                <div className="createSection mb-3"> 
                    <h3 className="createSubTitle">General</h3 > 
                    
                    <section className="createFormSection">
                        <div className='form-group'>
                            <label className='label-control'>Company name<span>*</span></label>
                            <input
                                name="name" 
                                type="text"
                                className="form-control"
                            /> 
                        </div>

                        <div className='form-group'>
                            <label className='label-control'>Company Description</label>
                            <textarea
                                name="description" 
                                className="form-control"
                            ></textarea> 
                        </div>

                        <div className='form-group m-0'>
                            <label className='label-control'>Company Status</label> 
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="status" 
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
                    {/* <button className='btn btn-danger mr-auto'>Delete Role</button> */}
                    <button className='btn btn-outline-primary mr-2'>Cancel</button>
                    <button type="submit" className='btn btn-primary'>Save Company</button>
                </div>
            </form>
            
        </>
    )
}

export default CreateCompanyNew;
