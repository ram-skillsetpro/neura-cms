import React, { useState } from "react";
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress } from "@mui/material";
import {
    Button,
    Typography, 
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    InputLabel,
    Select  } from '@mui/material'; 
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { daysDifference } from "../../utils/utility";
import fetcher from '../../utils/fetcher';
import SnackBar from "../../components/SnackBar";

const TablePendingLeads = ({userList, companyList}) => {

    const [user, setUser] = useState(null);
    const [dialogProgress, setDialogProgress] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [openUserCompanyMapDialog, setOpenUserCompanyMapDialog] = useState(false);
    const [snackbar, setSnackbar] = useState({
        show: false,
        status: "",
        message: "",
    });
    const toggleSnackbar = (value) => {
        setSnackbar(value);
    };

    const handleOpenUserCompanyMapDialog = (user) => {
        setUser(user);
        setOpenUserCompanyMapDialog(true);
    };

    const handleUpdateUserCompanyMapping= async () => {
        try {
          setDialogProgress(true);
          const res = await fetcher.post(`cms/map-demo-user`,  {companyId: selectedCompany, user: user.id});
          if (res.status !== 200) {
            setSnackbar({
              show: true,
              status: 'error',
              message: res.response
            });
          }
        } catch (err) {
          console.log(err);
        } finally {
          setDialogProgress(false);
          setSelectedCompany('');
          setOpenUserCompanyMapDialog(false);
        }
      };

    return(
        <>
            <Table className='dataTable'>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ minWidth: '200px' }}>Company Name</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>Contact Name</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>Email</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>Phone No.</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>Pending from Days</TableCell>
                        <TableCell style={{ width: '100px' }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { userList.map((user, index) => (
                    <TableRow key={index}>
                        <TableCell>{user.companyName}</TableCell>
                        <TableCell>{user.userName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{daysDifference(user.createdOn)}</TableCell>
                        <TableCell>
                            <IconButton aria-label="Edit" className="editBtn" onClick={() => handleOpenUserCompanyMapDialog(user)}>
                                <BorderColorIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={openUserCompanyMapDialog}>
                {dialogProgress ? <CircularProgress /> : null}
                <DialogContent>
                <box className="form-bx">
                <Typography component="p" style={{marginBottom:"10px"}}>Are you sure you want to Activate?</Typography>
                <FormControl fullWidth size="small">
                    <InputLabel id="select-company">Select a Company</InputLabel>
                    <Select
                    labelId="select-company"
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                    >
                    {companyList.map((company) => (
                        <MenuItem key={company.id} value={company.id}>
                        {company.name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                </box>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setOpenUserCompanyMapDialog(false)}>Cancel</Button>
                <Button disabled={!selectedCompany} variant="contained" onClick={handleUpdateUserCompanyMapping}>Save</Button>
                </DialogActions>
            </Dialog>
            <SnackBar {...snackbar} onClose={toggleSnackbar} />
        </>
    )
}

export default TablePendingLeads;