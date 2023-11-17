import React, { useEffect, useState } from "react";
import { Chip, Drawer, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from 'react-router-dom';
import EditNoteIcon from '@mui/icons-material/EditNote';
import style from './Users.module.scss';
// import TicketCard from "./TicketCard";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import StreamIcon from '@mui/icons-material/Stream';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock'; 
import CreateUser from "./CreateUser";
import UserCard from "./UserCard";


const Users = () => { 
    const [panelState, setPanelState] = useState(false);
    const UsersItems = [
        {label: 'All Users', value: '46', color: '#FFA500', icon: <SentimentSatisfiedIcon sx={{ fontSize: 32, color: '#FFA500' }} /> },
        {label: 'Active Users', value: '21', color: '#0F962D', icon: <SentimentSatisfiedAltIcon sx={{ fontSize: 32, color: '#0F962D' }} /> },
        {label: 'Inactive Users', value: '18', color: '#d84316', icon: <SentimentVeryDissatisfiedIcon sx={{ fontSize: 32, color: '#d84316' }} /> },
        {label: 'User Live Now', value: '2', color: '#1f88e5', icon: <StreamIcon sx={{ fontSize: 32, color: '#1f88e5' }} /> },
    ]

    const handleCloseEvent = () => { 
        setPanelState(false);
    };
    return(
        <>
            <div className='headingRow'>
                <h1>Users</h1>
                <button className='btn btn-primary' onClick={() => setPanelState(true)}>Create User</button>
            </div> 
            <div className={style.userTopDetails}>
                <div className="row">
                    {UsersItems.map((item, index) => 
                        <div className="col-md-3 col-6" key={index}>
                            <UserCard {...item} />
                        </div>
                    )}
                </div>
            </div>

            <div className='whiteContainer'>
                {/* <div className={style.noUserData}>
                    <p>No User available at present. Click here to <span onClick={() => setPanelState(true)}>Add New User</span></p>
                </div> */}
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer>
                        <Table className='dataTable'>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ minWidth: '200px' }}>Username</TableCell>
                                    <TableCell style={{ minWidth: '200px' }}>Email</TableCell>
                                    <TableCell style={{ minWidth: '150px' }}>Type</TableCell>
                                    <TableCell style={{ minWidth: '150px' }}>Department</TableCell>
                                    <TableCell style={{ minWidth: '150px' }}>Last Login</TableCell> 
                                    <TableCell style={{ minWidth: '100px' }}>Status</TableCell> 
                                    <TableCell style={{ width: '200px' }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody> 
                                <TableRow>
                                    <TableCell>Sanjay2010</TableCell>
                                    <TableCell>sanjay@gmail.com</TableCell>
                                    <TableCell>QE</TableCell>
                                    <TableCell>Legal Ops</TableCell>
                                    <TableCell>12, Oct 2023</TableCell>
                                    <TableCell>
                                        <Chip label="Active" color="success" size="small" /> 
                                    </TableCell>
                                    <TableCell> 
                                        <Link to="/" className="mr-3">
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

            {/* Create User panel */}
            <Drawer
                anchor="right"
                open={panelState}
                onClose={handleCloseEvent}
                PaperProps={{ 
                    sx: {width: {xs: '100%', sm: '700px'}},
                    style: { backgroundColor: '#f5f5f5', padding: '16px' } 
                }} 
            >
                <CreateUser closeEvent={handleCloseEvent} />
            </Drawer>

        </>
    )
}

export default Users;