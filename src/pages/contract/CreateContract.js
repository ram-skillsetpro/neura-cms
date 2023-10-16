import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Checkbox, FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material'; 

// NOTE:- Please rename with "CreateContract"

const CreateContractNew = ({closeEvent, contract}) => {    
    return(
        <>
            <div className="createMainTitle">
                <h2>{contract ? 'Edit Contract' : 'Create Contract'}</h2>
                <IconButton onClick={closeEvent}>
                    <CloseIcon />
                </IconButton>
            </div>

            <form>
                <div className="createSection mb-3">  
                    <section className="createFormSection">
                        <div className='form-group'>
                            <label className='label-control'>Contract Name<span>*</span></label>
                            <input
                                name="contractName" 
                                type="text"
                                className="form-control"
                            /> 

                            <div className='errorMsg'>Error Message here...</div>  
                        </div>
 

                        <div className='form-group'>
                            <label className='label-control'>Contract Description</label>
                            <textarea
                                name="contractDescription" 
                                className="form-control"
                            ></textarea>
                            <div className='errorMsg'>Error Message here...</div>
                        </div>


                    <div className='form-group m-0'>
                        <label className='label-control'>Contract Status</label> 
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="status"
                        >
                            <FormControlLabel
                                value="1"
                                control={<Radio sx={{'& .MuiSvgIcon-root': { fontSize: 18, }}} />}
                                label="Activate"
                            />
                            <FormControlLabel
                                value="0"
                                control={<Radio sx={{'& .MuiSvgIcon-root': { fontSize: 18, }}} />}
                                label="Deactivate"
                            />
                        </RadioGroup>
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

export default CreateContractNew;
