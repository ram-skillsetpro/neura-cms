import React, { useEffect, useState } from 'react';
import {
  Button, 
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
  Paper,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Drawer,
  TableFooter,
  TablePagination,
  TableContainer
} from '@mui/material'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import fetcher from '../../utils/fetcher'
import CreateCompany from './CreateCompany';

const ManageCompany = () => {

  const [companyList, setCompanyList] = useState([]);
  const [company, setCompany] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [progress, setProgress] = useState(false);
  const [dialogProgress, setDialogProgress] = useState(false);
  const [openStates, setOpenStates] = useState(Array(30).fill(false));
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [panelState, setPanelState] = useState(false);


  const fetchCompanyList = async (page) => {
    try {
      setProgress(true);
      const cmpres = await fetcher.post(`cms/list-all-company?pgn=${page}`);
      setCompanyList(cmpres.response.result);
      setTotalPages(Math.ceil(cmpres.response.totct / cmpres.response.perpg));
    } catch (error) {
      console.log(error);
    } finally {
      setProgress(false);
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

  const handleEditCompany = (company, index) => {
    handleMenuClose(index);
    setCompany(company);
    setPanelState(true);
  }

  const handleOpenConfirmDialog = (company, index) => {
    handleMenuClose(index);
    setCompany(company);
    setOpenConfirmDialog(true);
  };

  const handleCloseEvent = () => {
    setCompany(null);
    fetchCompanyList(currentPage);
    setPanelState(false);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    fetchCompanyList(page);
  };

  const handleUpdateCompanyStatus = async () => {
    try {
      setDialogProgress(true);
      const cmpRes = await fetcher.get(`cms/company-details?companyId=${company.id}`);
      cmpRes.response.isActive = !company.isActive;
      await fetcher.post('cms/edit-company', cmpRes.response);
      fetchCompanyList(currentPage);
    } catch (err) {
      console.log(err);
    } finally {
      setDialogProgress(false);
      setCompany(null);
      setOpenConfirmDialog(false);
    }
  };

  useEffect(() => {
    fetchCompanyList(currentPage);
  }, [currentPage]);


  return (
    <>
      <div className='headingRow'>
        <h1>Manage Company</h1>
        <button className='btn btn-primary' onClick={() => setPanelState(true)}>Add Company</button>
      </div>


      <div className='whiteContainer'>
        <div className='mb-3 d-flex justify-content-between align-items-center'>
          <div className='tableSearchFilter'>
            <input type='text' className='form-control' placeholder='Search Company' />
          </div>
        </div>


        {progress ? <CircularProgress /> : null} 
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table className='dataTable'>
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: '100px' }}>Code</TableCell>
                  <TableCell style={{ minWidth: '200px' }}>Name</TableCell>
                  <TableCell style={{ minWidth: '250px' }}>Description</TableCell>
                  <TableCell style={{ width: '100px' }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { companyList.map((company, index) => (
                  <TableRow key={index}>
                    <TableCell>
                          {company.companyCode}
                    </TableCell>
                    <TableCell>
                          {company.name}
                    </TableCell>
                    <TableCell>
                      {company.description}
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
                        <MenuItem onClick={() => handleEditCompany(company, index)}>Edit</MenuItem>
                        <MenuItem onClick={() => handleOpenConfirmDialog(company, index)}>
                          {company?.isActive ? 'Deactivate' : 'Activate'}
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>


              {/* <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={roles.length}
                    rowsPerPage={rowsPerPage}
                    page={currentPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter> */}
            </Table> 
          </TableContainer>
    
          <Stack spacing={2} sx={{ margin: "20px 0 0", flexDirection: "row-reverse" }}>
            <Pagination count={totalPages} color="primary" page={currentPage} onChange={handlePageChange} />
          </Stack>

        </Paper>
      </div>

      <Dialog open={openConfirmDialog}>
      { dialogProgress ? <CircularProgress /> : null }
        <DialogContent>
          <Typography componebt="p">Are you sure you want to  {company?.isActive ? ( 'Deactivate') : ( 'Activate' )}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateCompanyStatus}>Ok</Button>
        </DialogActions>
      </Dialog>

        

      {/* Create Role panel */}
      <Drawer
          anchor="right"
          open={panelState}
          onClose={handleCloseEvent}
          PaperProps={{ 
            sx: {width: {xs: '100%', sm: '500px'}},
            style: { backgroundColor: '#f5f5f5', padding: '16px' } 
          }} 
        >

          {/* NOTE: please rename as "CreateCompany" */}
          <CreateCompany closeEvent={handleCloseEvent} company={company} />
        </Drawer>


    </>
  );



}

export default ManageCompany;
