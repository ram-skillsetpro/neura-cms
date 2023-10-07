import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material';

const CreateAuthority = ({closeEvent}) => {
    return(
        <>
            <div className="createMainTitle">
                <h2>Create Authority</h2>
                <IconButton onClick={closeEvent}>
                    <CloseIcon />
                </IconButton>
            </div>

            <div className="createSection mb-3"> 
                <h3 className="createSubTitle">General</h3 > 
                
                <section className="createFormSection">
                    <div className='form-group'>
                        <label className='label-control'>Title<span>*</span></label>
                        <input type='text' className='form-control' />
                    </div>

                    <div className='form-group'>
                        <label className='label-control'>Description</label>
                        <textarea className='form-control'></textarea>
                    </div>

                    <div className='form-group m-0'>
                        <label className='label-control'>Authority Status</label> 
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="active" control={<Radio sx={{'& .MuiSvgIcon-root': { fontSize: 18, }}} />} label="Active" />
                            <FormControlLabel value="inactive" control={<Radio sx={{'& .MuiSvgIcon-root': { fontSize: 18, }}} />} label="Inactive" />
                        </RadioGroup>
                    </div>
                </section>
            </div> 

            <div className='d-flex justify-content-end'>
                {/* <button className='btn btn-danger mr-auto'>Delete Role</button> */}
                <button className='btn btn-outline-primary mr-2'>Authority</button>
                <button className='btn btn-primary'>Save Authority</button>
            </div>
            
        </>
    )
}

export default CreateAuthority;
