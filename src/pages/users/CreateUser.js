import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material';
import style from './Users.module.scss';

const CreateUser = ({closeEvent, user}) => {  
    return(
        <>
            <div className="createMainTitle">
                <h2>{user ? 'Edit User' : 'Create User'}</h2>
                <IconButton onClick={closeEvent}>
                    <CloseIcon />
                </IconButton>
            </div>

            <form>
                <div className="createSection mb-3"> 
                    <h3 className="createSubTitle">General</h3 > 
                    
                    <section className="createFormSection">
                        <div className='row'>
                            <div className='col-md-6 form-group'>
                                <label className='label-control'>Username<span>*</span></label>
                                <input
                                    name="username"
                                    type="text"
                                    className="form-control"
                                />
                                {/* <div className='errorMsg'>Error msg here...</div> */}
                            </div>

                            <div className='col-md-6 form-group'>
                                <label className='label-control'>Email<span>*</span></label>
                                <input
                                    name="email"
                                    type="text"
                                    className="form-control"
                                />
                                {/* <div className='errorMsg'>Error msg here...</div> */}
                            </div>

                            <div className='col-md-6 form-group'>
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
                                            type="text"
                                            className="form-control"
                                        /> 
                                        {/* <div className='errorMsg'>Error msg here...</div> */}
                                    </div>
                                </div> 
                            </div>

                            <div className='col-md-6 form-group'>
                                <label className='label-control'>Password<span>*</span></label>
                                <input
                                    name="password"
                                    type="password"
                                    className="form-control"
                                />
                                <div className='row mt-1 align-items-center'>
                                    <div className="col-6">
                                        {/* <div className={`${style.passProgress} ${style.weekPass}`}>Week</div>
                                        <div className={`${style.passProgress} ${style.medPass}`}>Medium</div> */}
                                        <div className={`${style.passProgress} ${style.strongPass}`}>Strong</div>
                                    </div>
                                    <div className="col-6 text-right">
                                        <button className={style.generateBtn}>Generate</button>
                                    </div>
                                </div>
                                {/* <div className='errorMsg'>Error msg here...</div> */}
                            </div>

                            <div className='col-md-12 form-group m-0'>
                                <label className='label-control'>User Status</label> 
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
                        </div>
                    </section>
                </div>
                
                <div className="createSection mb-3"> 
                    <h3 className="createSubTitle">Other Details</h3> 
                    
                    <section className="createFormSection">
                        <div className='row'>
                            <div className='col-md-6 form-group'>
                                <label className='label-control'>User Type</label>
                                <select className='form-control'>
                                    <option>QE</option>
                                    <option>QE Manager</option>
                                    <option>Sales</option>
                                    <option>Demo Manager</option>
                                </select> 
                            </div>

                            <div className='col-md-6 form-group'>
                                <label className='label-control'>Department</label>
                                <select className='form-control'>
                                    <option>Product</option> 
                                    <option>Sales</option>
                                </select> 
                            </div>

                            <div className='col-md-6 form-group'>
                                <label className='label-control'>Login Type</label>
                                <select className='form-control'>
                                    <option>Option 1</option> 
                                    <option>Option 2</option> 
                                </select> 
                            </div>

                            <div className='col-md-6 form-group'>
                                <label className='label-control'>Login Expiry</label>
                                Datepicker here...
                            </div>
                            
                            <div className='col-md-6 form-group'>
                                <label className='label-control'>Two Factor Auth</label>
                                <select className='form-control'>
                                    <option>Option 1</option> 
                                    <option>Option 2</option> 
                                </select> 
                            </div>

                            <div className='col-md-6 form-group'>
                                <label className='label-control'>Login Status</label>
                                <select className='form-control'>
                                    <option>Option 1</option> 
                                    <option>Option 2</option> 
                                </select> 
                            </div>
                            
                            <div className='col-md-6 form-group'>
                                <label className='label-control'>OnRoll/Vendor</label>
                                <select className='form-control'>
                                    <option>Option 1</option> 
                                    <option>Option 2</option> 
                                </select> 
                            </div>

                            <div className='col-md-6 form-group'>
                                <label className='label-control'>Vendor Name</label>
                                <input
                                    name="vendorName"
                                    type="text"
                                    className="form-control"
                                />
                            </div> 
                        </div>
                    </section>
                </div>

                <div className='d-flex justify-content-end'>
                    {/* <button className='btn btn-danger mr-auto'>Delete User</button> */}
                    <button className='btn btn-outline-primary mr-2'>Reset</button>
                    <button type="submit" className='btn btn-primary'>Save User</button>
                </div>
            </form>
            
        </>
    )
}

export default CreateUser;
