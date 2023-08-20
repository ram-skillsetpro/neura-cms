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
  Checkbox
} from '@mui/material'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import fetcher from '../../utils/fetcher'
import Create from './Create';

const ManageCompany = () => {

  const [companyList, setCompanyList] = useState([]);
  const [company, setCompany] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [progress, setProgress] = useState(false);
  const [dialogProgress, setDialogProgress] = useState(false);
  const [openStates, setOpenStates] = useState(Array(companyList.length).fill(false));
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openCompanyDialog, setOpenCompanyDialog] = useState(false);


  const fetchCompanyList = async (page) => {
    try {
      setProgress(true);
      const cmpres = await fetcher.post(`cms/list-all-company?pgn=${page-1}`);
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
    setOpenCompanyDialog(true);
  }

  const handleOpenConfirmDialog = (company, index) => {
    handleMenuClose(index);
    setCompany(company);
    setOpenConfirmDialog(true);
  };

  const handleCloseCompanyDialog = () => {
    setCompany(null);
    setOpenCompanyDialog(false);
    fetchCompanyList(currentPage);
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
      {progress ? <CircularProgress /> : null}
      <TableContainer sx={{ maxHeight: "calc(100vh - 230px)" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { companyList.map((company, index) => (
            <TableRow key={index}>
              <TableCell>
                
                  <Typography component="p">
                    {company.companyCode}
                  </Typography>
                
              </TableCell>
              <TableCell>
              <Typography component="p">
                    {company.name}
                  </Typography>
              </TableCell>
              <TableCell>
                <Typography component="p"> {company.description} </Typography>
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
                  open={openStates[index]}
                  onClose={() => handleMenuClose(index)}
                  MenuListProps={{
                    'aria-labelledby': `basic-button-${index}`
                  }}
                >
                  <MenuItem onClick={() => handleEditCompany(company, index)}>Edit</MenuItem>
                  <MenuItem onClick={() => handleOpenConfirmDialog(company, index)}>{ company?.isActive ? ('Deactivate') : ('Activate') }</MenuItem>
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
      
      <Dialog open={openCompanyDialog}>
        <DialogContent>
          <Create submitCallback={handleCloseCompanyDialog} company={company} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCompanyDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      
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
    </>
  );



}

export default ManageCompany;