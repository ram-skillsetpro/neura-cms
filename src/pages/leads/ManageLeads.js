import React, { useEffect, useState } from 'react';
import {
  Button,
  TableContainer, 
  Typography, 
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
  Tabs,
  Tab,
  Paper,
  Drawer
} from '@mui/material'; 
import fetcher from '../../utils/fetcher';
import SnackBar from "../../components/SnackBar";
import TablePendingLeads from './TablePendingLeads';
import TableDemoLeads from './TableDemoLeads';
import TableClients from './TableClients';
import CreateLead from './CreateLead';

const ManageLeads = () => {
  const [panelState, setPanelState] = useState(false);
  const [userList, setUserList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [packageList, setPackageList] = useState([]);
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
    setTotalPages(1);
    setCurrentUserTab(tabIndex);
  };

  const fetchUserList = async (page) => {
    try {
      setProgress(true);
      if (currentUserTab === 1) {
        const res = await fetcher.get(`cms/approved-leads/demo/${page}`);
        setUserList(res.response.result);
        setTotalPages(Math.ceil(res.response.totct / res.response.perpg));
      } else if (currentUserTab === 2) {
        const res = await fetcher.get(`cms/approved-leads/client/${page}`);
        if (res?.status === 200) {
          setUserList(res.response.result);
          setTotalPages(Math.ceil(res.response.totct / res.response.perpg));
        }
      } else {
        const res = await fetcher.get(`cms/unapproved-leads/${page}`);
        if (res?.status === 200) {
          setUserList(res.response.result);
          setTotalPages(Math.ceil(res.response.totct / res.response.perpg));
        }
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

  const fetchPackageList = async () => {
    try {
      const res = await fetcher.get(`/packages-list`);
      setPackageList(res.response);
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
  }, [currentPage, currentUserTab]);

  useEffect(() => {
    fetchCompanyList();
    fetchPackageList();
  }, []);

  const handleCloseEvent = () => { 
    setPanelState(false);
    fetchUserList(currentPage);
  };

  return (
    <> 
      <div className='headingRow'>
        <h1>Manage Leads</h1>
        <button className='btn btn-primary' onClick={() => setPanelState(true)}>Create Lead</button>
      </div>
      

      <div className='whiteContainer'>
        <div className='mb-3 d-flex justify-content-between align-items-center'>
          <div className='tableSearchFilter'>
            <input type='text' className='form-control' placeholder='Search Leads' />
          </div>
        </div>

        
        <Tabs value={currentUserTab} onChange={handleUserTabChange} style={{marginBottom:"5px"}}>
          <Tab label='Pending Leads' /> 
          <Tab label='Demo Leads' /> 
          <Tab label='Clients' /> 
        </Tabs>

        { progress ? 
          <div className='text-center py-4'>
            <CircularProgress />
          </div> 
          : 
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
              {currentUserTab === 0 && (
                <TablePendingLeads userList={userList} />
              )}

              { currentUserTab === 1 && (
                <TableDemoLeads
                  closeEvent={handleCloseEvent}
                  userList={userList}
                  companyList={companyList}
                  packageList={packageList}
                />
              )}

              { currentUserTab === 2 && (
                <TableClients userList={userList}n/>
              )}
            </TableContainer> 

            <Stack spacing={2} sx={{ margin: "20px 0 0", flexDirection: "row-reverse" }}>
              <Pagination count={totalPages} color="primary" page={currentPage} onChange={handlePageChange} />
            </Stack>
          </Paper>
        }
      </div>
      

      
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


      {/* Create Lead panel */}
      <Drawer
          anchor="right"
          open={panelState}
          onClose={handleCloseEvent}
          PaperProps={{ 
            sx: {width: {xs: '100%', sm: '500px'}},
            style: { backgroundColor: '#f5f5f5', padding: '16px' } 
          }} 
        >
          <CreateLead closeEvent={handleCloseEvent} companyList={companyList} lead={null} packageList={packageList} />
        </Drawer>
    </>
  );



}

export default ManageLeads;
