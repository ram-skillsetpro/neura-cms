import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Input,
  TableBody,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  Paper,
  Divider,
  InputBase,
  IconButton,
  CircularProgress,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import fetcher from '../../utils/fetcher';
import SnackBar from "../../components/SnackBar";

const ManageUser = () => {

  const [userList, setUserList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [progress, setProgress] = useState(false);
  const [dialogProgress, setDialogProgress] = useState(false);
  const [openStates, setOpenStates] = useState(Array(30).fill(false));
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openUserCompanyMapDialog, setOpenUserCompanyMapDialog] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [snackbar, setSnackbar] = useState({
    show: false,
    status: "",
    message: "",
  });
  const toggleSnackbar = (value) => {
    setSnackbar(value);
  };



  const fetchUserList = async (page) => {
    try {
      setProgress(true);
      const res = await fetcher.get(`cms/unapproved-demo-users?pgn=${page-1}`);
      setUserList(res.response.result);
      setTotalPages(Math.ceil(res.response.totct / res.response.perpg));
    } catch (error) {
      console.log(error);
    } finally {
      setProgress(false);
    }
  };

  const fetchCompanyList = async () => {
    try {
      const res = await fetcher.get(`/company-list`);
      setCompanyList(res.response);
    } catch (error) {
      console.log(error);
    }
  };


  // Function to handle menu open
  const handleMenuOpen = (index) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = true;
    setOpenStates(newOpenStates);
  };

  // Function to handle menu close
  const handleMenuClose = (index) => {
    const newOpenStates = [...openStates];
    newOpenStates[index] = false;
    setOpenStates(newOpenStates);
  };

  const handleOpenUserCompanyMapDialog = (user, index) => {
    handleMenuClose(index);
    setUser(user);
    setOpenUserCompanyMapDialog(true);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    fetchUserList(page);
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
      fetchUserList(currentPage);
    } catch (err) {
      console.log(err);
    } finally {
      setDialogProgress(false);
      setUser(null);
      setSelectedCompany('');
      setOpenUserCompanyMapDialog(false);
    }
  };

  useEffect(() => {
    fetchUserList(currentPage);
    fetchCompanyList();
  }, [currentPage]);

  return (
    <>
      {progress ? <CircularProgress /> : null}
      <TableContainer sx={{ maxHeight: "calc(100vh - 230px)" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { userList.map((user, index) => (
            <TableRow key={index}>
              <TableCell>
                  <Typography component="p">
                    {user.lastName}
                  </Typography>
              </TableCell>
              <TableCell>
              <Typography component="p">
                    {user.email}
                  </Typography>
              </TableCell>
              <TableCell>
                <Typography component="p"> {user.userName} </Typography>
              </TableCell>
              <TableCell>
                <Typography component="p"> {user.companyName} </Typography>
              </TableCell>
              <TableCell>
                <Button
                  id={`basic-button-${index}`}
                  aria-controls={`basic-menu-${index}`}
                  aria-haspopup="true"
                  onClick={() => handleMenuOpen(index)}
                >
                  <BiDotsVerticalRounded />
                </Button>
                <Menu
                  id={`basic-menu-${index}`}
                  anchorEl={openStates[index] ? document.getElementById(`basic-button-${index}`) : null}
                  open={openStates[index] || false}
                  onClose={() => handleMenuClose(index)}
                  MenuListProps={{
                    'aria-labelledby': `basic-button-${index}`
                  }}
                >
                  <MenuItem onClick={() => handleOpenUserCompanyMapDialog(user, index)}>Activate</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
    
    <Stack spacing={2} sx={{ margin: "20px 0 0", flexDirection: "row-reverse" }}>
        <Pagination count={totalPages} color="primary" page={currentPage} onChange={handlePageChange} />
      </Stack>

      
      <Dialog open={openUserCompanyMapDialog}>
        {dialogProgress ? <CircularProgress /> : null}
        <DialogContent>
          <Typography component="p">Are you sure you want to Activate?</Typography>
          <FormControl fullWidth>
            <InputLabel>Select a Company</InputLabel>
            <Select
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUserCompanyMapDialog(false)}>Cancel</Button>
          <Button disabled={!selectedCompany} variant="contained" onClick={handleUpdateUserCompanyMapping}>Save</Button>
        </DialogActions>
      </Dialog>
      <SnackBar {...snackbar} onClose={toggleSnackbar} />
    </>
  );



}

export default ManageUser;