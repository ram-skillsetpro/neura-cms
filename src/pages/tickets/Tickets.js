import React, { useEffect, useState } from "react";
import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
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
import LockOpenIcon from '@mui/icons-material/LockOpen';
import fetcher from '../../utils/fetcher';
import { longToDate, daysDifference } from '../../utils/utility';
import { hasAuthority } from '../../utils/authGuard';
import { AUTHORITY } from "../../utils/constants";
import { Button } from "react-bootstrap";
import SnackBar from "../../components/SnackBar";

const Tickets = () => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [ticketItems, setTicketItems] = useState([]);
    const [progress, setProgress] = useState(false);
    const [snackbar, setSnackbar] = useState({
        show: false,
        status: "",
        message: "",
      });
    const toggleSnackbar = (value) => {
        setSnackbar(value);
    };
    
    const fetchTickets = async () => {
        try {
          const res = await fetcher.get(`deqc/inbox`);
          setTickets(res.response);
        } catch (error) {
          console.log(error);
        }
    };

    const fetchTicketDashboardMetrics = async () => {
        try {
          const res = await fetcher.get(`ticket-dashboard-metrics`);
          const metrics = res.response;
          setTicketItems([
            {label: 'Inprogress Tickets', value: metrics.hardAssignedTickets + metrics.reAssignedTickets, color: '#FFA500', icon: <SentimentSatisfiedIcon sx={{ fontSize: 32, color: '#FFA500' }} /> },
            {label: 'Open Tickets', value: metrics.reOpenedTickets + metrics.reAssignedTickets + metrics.softAssignedTickets + metrics.hardAssignedTickets, color: '#FFA500', icon: <SentimentSatisfiedIcon sx={{ fontSize: 32, color: '#FFA500' }} /> },
            {label: 'Closed Tickets', value: metrics.closedTickets, color: '#0F962D', icon: <SentimentSatisfiedAltIcon sx={{ fontSize: 32, color: '#0F962D' }} /> },
            {label: 'Failed Tickets', value: metrics.failedTcikets, color: '#d84316', icon: <SentimentVeryDissatisfiedIcon sx={{ fontSize: 32, color: '#d84316' }} /> },
        ]);
        } catch (error) {
          console.log(error);
        }
    };

    const routTicketDetails = async (id, event) => {
        event.preventDefault();
        try {
            setProgress(true);
            const res = await fetcher.post(`deqc/open-assign?fileId=${id}`);
            if (res.status !== 200) {
                setSnackbar({
                  show: true,
                  status: 'error',
                  message: res?.message || res?.response
                });
                return;
            } else {
                navigate(`/ticket/ticket-detail/${id}`);
                //navigate('/ticket/ticket-detail', { state: { ticketDetails: res.response } });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setProgress(false);
        }
    };

    useEffect(() => {
        fetchTickets();
        fetchTicketDashboardMetrics();
    }, []);

    return(
        <> 
            {progress ? <CircularProgress /> : null}
            <SnackBar {...snackbar} onClose={toggleSnackbar} />
            <div className={style.ticketTopDetails}>
                <div className="row">
                    {ticketItems.map((item, index) => 
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
                                    { hasAuthority(AUTHORITY.USER_QC) ? <TableCell style={{ minWidth: '150px' }}>Verified By</TableCell> : null }
                                    <TableCell style={{ minWidth: '150px' }}>Created Date</TableCell>
                                    <TableCell style={{ minWidth: '150px' }}>Pending Since</TableCell> 
                                    <TableCell style={{ width: '150px' }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { tickets.map((ticket, index) => (
                                    // please make it dynamic class on the table row, when ticket reassign to DE -  className="reassign"
                                    <TableRow key={index}> 
                                        <TableCell>
                                            <Link to="#" onClick={(event) => routTicketDetails(ticket.id, event)}>
                                                {ticket.id}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{ticket.companyName}</TableCell>
                                        <TableCell>{ticket.contractType}</TableCell>
                                        { hasAuthority(AUTHORITY.USER_QC) ? <TableCell>{ticket.qcOwnerName}</TableCell> : null }
                                        <TableCell>{longToDate(ticket.createdDate)}</TableCell>
                                        <TableCell>{daysDifference(ticket.createdDate)} Days</TableCell>
                                        <TableCell>
                                            <Link to="#" className="mr-3" onClick={(event) => routTicketDetails(ticket.id, event)}>
                                                <EditNoteIcon />
                                            </Link>
                                            { hasAuthority(AUTHORITY.USER_QC) && (
                                                ticket.qcOwner ? <LockIcon /> : <LockOpenIcon />
                                            )}
                                            { hasAuthority(AUTHORITY.USER_DE) && (
                                                ticket.deOwner ? <LockIcon /> : <LockOpenIcon />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>

        </>
    )
}

export default Tickets;