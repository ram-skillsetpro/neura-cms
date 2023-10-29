import React from "react";
import { Autocomplete, FormControlLabel, IconButton, Radio, RadioGroup, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const CreateLead = ({closeEvent}) => {
    const companies = [
        { label: 'Accenture', id: ''},
        { label: 'Cognizant', id: '' },
        { label: 'Infosys', id: '' },
        { label: 'TCS', id: '' },
        { label: 'SAP', id: '' },
        { label: "Capgemini", id: '' },
        { label: 'IBM', id: '' },
    ]

    const packages = [
        { label: 'Package 1', id: ''},
        { label: 'Package 2', id: '' },
        { label: 'Package 3', id: '' },
    ]
    return(
        <>
            <div className="createMainTitle">
                <h2>Create Lead</h2>
                <IconButton onClick={closeEvent}>
                    <CloseIcon />
                </IconButton>
            </div>

            <form>
                <div className="createSection mb-3"> 
                    <h3 className="createSubTitle">General</h3 > 
                    
                    <section className="createFormSection">
                        <div className='form-group'>
                            <label className='label-control'>Contact Name<span>*</span></label>
                            <input
                                name="name" 
                                type="text"
                                className="form-control"
                            />
                            <div className='errorMsg'>Error Message here...</div> 
                        </div> 

                        <div className='form-group'>
                            <label className='label-control'>Email<span>*</span></label>
                            <input
                                name="name" 
                                type="text"
                                className="form-control"
                            />
                        </div> 

                        <div className='form-group'>
                            <label className='label-control'>Mobile<span>*</span></label>
                            <input
                                name="name" 
                                type="text"
                                className="form-control"
                            />
                        </div> 

                        <div className='form-group'>
                            <label className='label-control'>Company</label>
                            <div className="customAutoField">
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={companies}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </div>
                        </div> 

                        <div className='form-group'>
                            <label className='label-control'>Package Name</label>
                            <div className="customAutoField">
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={packages} 
                                    className="customAutoField"
                                    renderInput={(params) => <TextField {...params} />}
                                /> 
                            </div>
                        </div> 

                        <div className='form-group'>
                            <label className='label-control'>Package Start Date</label>
                            Date picker here...
                            {/* <DatePicker label="Basic date picker" /> */}
                        </div> 

                        <div className='form-group m-0'>
                            <label className='label-control'>Lead Status</label> 
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
                    {/* <button className='btn btn-danger mr-auto'>Delete Lead</button> */}
                    <button className='btn btn-outline-primary mr-2' onClick={closeEvent}>Cancel</button>
                    <button type="submit" className='btn btn-primary'>Save Lead</button>
                </div>
            </form>
        </>
    )
}

export default CreateLead;