import React, { useEffect, useState } from "react";
import { Chip, Drawer, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Dialog, DialogActions, DialogContent, Typography, Button} from "@mui/material";
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
import fetcher from "../../utils/fetcher";
import SnackBar from "../../components/SnackBar";


const Users = () => { 
    const [panelState, setPanelState] = useState(false);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [UsersItems, setUsersItems] = useState([]);
    const [dialogProgress, setDialogProgress] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

    const [snackbar, setSnackbar] = useState({
        show: false,
        status: "",
        message: "",
    });
    const toggleSnackbar = (value) => {
        setSnackbar(value);
    };

    const handleCloseEvent = () => { 
        setPanelState(false);
    };

    const getUsers = async () => {
        const res = await fetcher.get(`cms/list-cms-users`);
        if (res?.status === 200) {
            setUsers(res.response);
            const activeCount = res.response.filter(u => u.status === 1).length;
            const inactiveCount = res.response.filter(u => u.status === 0).length;
            setUsersItems([
                {label: 'All Users', value: res.response.length, color: '#FFA500', icon: <SentimentSatisfiedIcon sx={{ fontSize: 32, color: '#FFA500' }} /> },
                {label: 'Active Users', value: activeCount, color: '#0F962D', icon: <SentimentSatisfiedAltIcon sx={{ fontSize: 32, color: '#0F962D' }} /> },
                {label: 'Inactive Users', value: inactiveCount, color: '#d84316', icon: <SentimentVeryDissatisfiedIcon sx={{ fontSize: 32, color: '#d84316' }} /> }
            ]);
        }
    };

    const handleUserEdit = (user) => {
        setUser(user);
        setOpenConfirmDialog(true);
    }

    const handleUserStatus = async () => {
        try {
          setDialogProgress(true);
          const url = `cms/create-user`;
          user.status = user.status ? false : true;
          const res = await fetcher.post(url, user);
          if (res?.status === 200) {
            getUsers();
          } else {
            setSnackbar({
              show: true,
              status: 'error',
              message: res?.response || res?.message
            });
          }
        } catch (err) {
          console.log(err);
        } finally {
          setDialogProgress(false);
          setUser(null);
          setOpenConfirmDialog(false);
        }
      };

    useEffect(() => {
        getUsers();
    }, []);

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
                                {users && users.map((user, index) => (
                                    <TableRow>
                                        <TableCell>{user.firstName}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            {user.status ? 
                                                <Chip label="Active" color="success" size="small" /> 
                                                : 
                                                <Chip label="Inactive" color="error" size="small" /> 
                                            }
                                        </TableCell>
                                        <TableCell> 
                                            <Link to="#" className="mr-3" onClick={() => handleUserEdit(user)}>
                                                <EditNoteIcon />
                                            </Link>
                                            <Link to='#' className="mr-3">
                                                <LockIcon />
                                            </Link> 
                                            <Link to="#">
                                                <CloseIcon />
                                            </Link>
                                        </TableCell>
                                    </TableRow> 
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>

            <Dialog open={openConfirmDialog}>
                { dialogProgress ? <CircularProgress /> : null }
                <DialogContent>
                    <Typography componebt="p">Are you sure you want to  {user?.status ? ( 'Deactivate') : ( 'Activate' )}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleUserStatus}>Ok</Button>
                </DialogActions>
            </Dialog>

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
            <SnackBar {...snackbar} onClose={toggleSnackbar} />

        </>
    )
}

export default Users;