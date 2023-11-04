import React from "react";
import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from 'react-router-dom';
import {PageUrls } from "../../utils/constants";
import EditNoteIcon from '@mui/icons-material/EditNote';
import style from './Tickets.module.scss';
import TicketCard from "./TicketCard";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';


const Tickets = () => {
    const TicketItems = [
        {label: 'Assigned Tickets', value: '39', color: '#FFA500', icon: <SentimentSatisfiedIcon sx={{ fontSize: 32, color: '#FFA500' }} /> },
        {label: 'Closed Tickets', value: '21', color: '#0F962D', icon: <SentimentSatisfiedAltIcon sx={{ fontSize: 32, color: '#0F962D' }} /> },
        {label: 'Open Tickets', value: '18', color: '#d84316', icon: <SentimentVeryDissatisfiedIcon sx={{ fontSize: 32, color: '#d84316' }} /> },
        {label: 'Time Taken / Ticket', value: '2', color: '#1f88e5', icon: <AccessAlarmIcon sx={{ fontSize: 32, color: '#1f88e5' }} /> },
    ]
    return(
        <> 
            <div className={style.ticketTopDetails}>
                <div className="row">
                    {TicketItems.map((item, index) => 
                        <div className="col-md-3 col-6" key={index}>
                            <TicketCard {...item} />
                        </div>
                    )}
                </div>
            </div>

            <div className='whiteContainer'>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer>
                        <Table className='dataTable'>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ minWidth: '150px' }}>ID</TableCell>
                                    <TableCell style={{ minWidth: '150px' }}>Client</TableCell>
                                    <TableCell style={{ minWidth: '150px' }}>Type</TableCell>
                                    <TableCell style={{ minWidth: '150px' }}>Verified By</TableCell>
                                    <TableCell style={{ minWidth: '150px' }}>Created Date</TableCell>
                                    <TableCell style={{ minWidth: '150px' }}>Pending Since</TableCell> 
                                    <TableCell style={{ width: '150px' }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell><Link to={PageUrls.TICKET_DETAIL}>ID_12345</Link></TableCell>
                                    <TableCell>Delhivery Inc.</TableCell>
                                    <TableCell>NDA</TableCell>
                                    <TableCell>Shauket</TableCell>
                                    <TableCell>12 Oct, 2023</TableCell>
                                    <TableCell>23 Days</TableCell>
                                    <TableCell> 
                                        <Link to={PageUrls.TICKET_DETAIL} className="mr-3">
                                            <EditNoteIcon />
                                        </Link>
                                        <Link to='/' className="mr-3">
                                            <LockIcon />
                                        </Link> 
                                        <Link to="/">
                                            <CloseIcon />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><Link to={PageUrls.TICKET_DETAIL}>ID_12345</Link></TableCell>
                                    <TableCell>Delhivery Inc.</TableCell>
                                    <TableCell>NDA</TableCell>
                                    <TableCell>Shauket</TableCell>
                                    <TableCell>12 Oct, 2023</TableCell>
                                    <TableCell>23 Days</TableCell>
                                    <TableCell> 
                                        <Link to={PageUrls.TICKET_DETAIL} className="mr-3">
                                            <EditNoteIcon />
                                        </Link>
                                        <Link to='/' className="mr-3">
                                            <LockIcon />
                                        </Link> 
                                        <Link to="/">
                                            <CloseIcon />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>

        </>
    )
}

export default Tickets;