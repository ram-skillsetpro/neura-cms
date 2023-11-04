import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import style from './TicketDetail.module.scss';

const TicketDetail = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return(
        <>
            <div className='headingRow'>
                <h1>Ticket Detail Title here... </h1>

                <div className={style.timerBox}>
                    <AccessAlarmIcon />
                    <span>02:45</span>
                </div>
            </div> 

            <div className={style.ticketContainer}>
                <object 
                    data="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf" 
                    width="100%"     
                    height="500"
                    className={style.ticketPDF}> 
                </object> 

                <section className={style.ticketDetailForm}>
                    <div className={style.accBox}>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography sx={{ width: 'calc(95% - 24px)', fontSize: '14px', flexShrink: 0 }}>
                                    Effective Date
                                </Typography>
                                <TaskAltIcon color="success" />
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='form-group'>
                                    <input
                                        name="effectiveDate" 
                                        type="text"
                                        className="form-control"
                                        value="13-2-2023"
                                        disabled
                                    />
                                </div>
                                
                                <div className={style.ticActionBtn}>
                                    {/* QA Action Button */}
                                    {/* <button className='btn btn-success'>Verify</button>  */}

                                    {/* DE Action Button */}
                                    {/* <button className='btn btn-success'>Ok</button> */}
                                    <button className='btn btn-secondary'>Edit</button>
                                    <button className='btn btn-primary'>Skip</button> 
                                </div>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                            > 
                                <Typography sx={{ width: 'calc(95% - 24px)', fontSize: '14px', flexShrink: 0 }}>
                                    Parties Detail
                                </Typography>
                                {/* <TaskAltIcon color="success" /> */}
                            </AccordionSummary>
                            <AccordionDetails>
                                
                                <div className='form-group'>
                                    <label className='label-control'>First Party </label>
                                    <input
                                        name="firtParty" 
                                        type="text"
                                        className="form-control" 
                                        value="Delhivery Pvt Ltd"
                                    />
                                </div>
                                <div className='form-group'>
                                    <label className='label-control'>Second Party</label>
                                    <input
                                        name="secondParty" 
                                        type="text"
                                        className="form-control" 
                                        value="Twishan International Pvt Ltd"
                                    />
                                </div>
                                
                                <div className={style.ticActionBtn}>
                                    {/* QA Action Button */}
                                    {/* <button className='btn btn-success'>Verify</button>  */}

                                    {/* DE Action Button */}
                                    <button className='btn btn-success'>Ok</button>
                                    <button className='btn btn-secondary'>Edit</button>
                                    <button className='btn btn-primary'>Skip</button> 
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                            >
                                <Typography sx={{ width: 'calc(95% - 24px)', fontSize: '14px', flexShrink: 0 }}>
                                    Indemnity Clause
                                </Typography>
                                {/* <TaskAltIcon color="success" /> */}
                            </AccordionSummary>
                            <AccordionDetails> 
                                <div className='form-group'> 
                                    <textarea className="form-control h_120"></textarea>
                                </div>
                                
                                <div className={style.ticActionBtn}>
                                    {/* QA Action Button */}
                                    {/* <button className='btn btn-success'>Verify</button>  */}

                                    {/* DE Action Button */}
                                    <button className='btn btn-success'>Ok</button>
                                    <button className='btn btn-secondary'>Edit</button>
                                    <button className='btn btn-primary'>Skip</button> 
                                </div>
                            </AccordionDetails>
                        </Accordion> 
                    </div>

                    <div className='text-center'>
                        <button className='btn btn-primary' disabled>Update All</button>
                    </div>
                </section>
            </div>
        </>
    )
}

export default TicketDetail;