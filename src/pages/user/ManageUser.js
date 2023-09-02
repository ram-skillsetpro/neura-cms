import React, { useEffect, useState } from 'react';
import {
  Button,
  TableContainer,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  Menu,
  MenuItem,
  Pagination,
  Stack,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  Breadcrumbs,
  Link,
  Tabs,
  Tab,
  Paper
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
  const [openUserCompanyMapDialog, setOpenUserCompanyMapDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [currentUserTab, setCurrentUserTab] = useState(0);
  const [snackbar, setSnackbar] = useState({
    show: false,
    status: "",
    message: "",
  });
  const toggleSnackbar = (value) => {
    setSnackbar(value);
  };

  const handleUserTabChange = (e, tabIndex) => {
    setUserList([]);
    setCurrentPage(1);
    setCurrentUserTab(tabIndex);
  };

  const fetchUserList = async (page) => {
    try {
      setProgress(true);
      if (currentUserTab) {
        const res = await fetcher.get(`cms/approved-demo-users?pgn=${page-1}`);
        setUserList(res.response.result);
        setTotalPages(Math.ceil(res.response.totct / res.response.perpg));
      } else {
        const res = await fetcher.get(`cms/unapproved-demo-users?pgn=${page-1}`);
        setUserList(res.response.result);
        setTotalPages(Math.ceil(res.response.totct / res.response.perpg));
      }
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

  const handleOpenConfirmDialog = (user, index) => {
    handleMenuClose(index);
    setUser(user);
    setOpenConfirmDialog(true);
  };

  const handleDeactivateUser = async () => {
    try {
      const res = await fetcher.get(`cms/deactivate-company?companyId=${user.companyId}`);
      setSnackbar({
        show: true,
        status: 'success',
        message: res.response
      });
      fetchUserList(currentPage);
    } catch (err) {
      console.log(err);
    } finally {
      setUser(null);
      setOpenConfirmDialog(false);
    }
  }

  useEffect(() => {
    fetchUserList(currentPage);
    fetchCompanyList();
  }, [currentPage, currentUserTab]);

  return (
    <>
     {/* <Breadcrumbs aria-label="breadcrumb" sx={{margin: "20px 0 50px"}}>
        <Link underline="hover" color="inherit" href="/">
          Files
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="#"
        >
          Core
        </Link>
        <Link
          underline="hover"
          color="text.primary"
          href="#"
          aria-current="page"
        >
          Breadcrumbs
        </Link>
      </Breadcrumbs> */}
      <Typography variant="h3" className='page-heading'>
      Manage User
      </Typography>
      {/* <Typography className='subtitle'>
      3 Files, 2 Uploading
      </Typography> */}
      {progress ? <CircularProgress /> : null}
      <Tabs value={currentUserTab} onChange={handleUserTabChange} component={Paper} style={{marginBottom:"5px"}}>
        <Tab label='Unapproved User' />
        
          <Tab label='Approved User' />
        
      </Tabs>
      <TableContainer sx={{ maxHeight: "calc(100vh - 230px)" }} component={Paper}>
          {currentUserTab === 0 && (
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
                      {user.lastName}
                </TableCell>
                <TableCell>
                      {user.email}
                </TableCell>
                <TableCell>
                  {user.userName}
                </TableCell>
                <TableCell>
                  {user.companyName}
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
        )}
        { currentUserTab === 1 && (
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
                      {user.lastName}
                </TableCell>
                <TableCell>
                      {user.email}
                </TableCell>
                <TableCell>
                  {user.userName}
                </TableCell>
                <TableCell>
                  {user.companyName}
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
                    <MenuItem onClick={() => handleOpenConfirmDialog(user, index)}>Deactivate</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        )}
      </TableContainer>
    <Stack spacing={2} sx={{ margin: "20px 0 0", flexDirection: "row-reverse" }}>
        <Pagination count={totalPages} color="primary" page={currentPage} onChange={handlePageChange} />
      </Stack>

      
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

      <Dialog open={openConfirmDialog}>
        <DialogContent>
          <Typography componebt="p">Are you sure you want to Deactivate?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDeactivateUser}>Ok</Button>
        </DialogActions>
      </Dialog>
      <SnackBar {...snackbar} onClose={toggleSnackbar} />
    </>
  );



}

export default ManageUser;