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
  Paper,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  TablePagination,
  Drawer,
  Chip
} from '@mui/material'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import fetcher from '../../utils/fetcher'
import CreateContract from './CreateContract';

const ManageContract = () => {

  const [panelState, setPanelState] = useState(false);
  const [contractList, setContractList] = useState([]);
  const [displayContracts, setDisplayContracts] = useState([]);
  const [contract, setContract] = useState(null);
  const [progress, setProgress] = useState(false);
  const [openStates, setOpenStates] = useState(Array(30).fill(false));
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchContractList = async () => {
    try {
      setProgress(true);
      const res = await fetcher.get(`cms/contract-type-list/all`);
      setContractList(res.response);
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

  const handleEditContract = (contract, index) => {
    handleMenuClose(index);
    setContract(contract);
    setPanelState(true);
  }

  const handleOpenConfirmDialog = (contract, index) => {
    handleMenuClose(index);
    setContract(contract);
    setOpenConfirmDialog(true);
  };

  const handleUpdateContractStatus = async () => {
    try {
      setProgress(true);
      const status = contract.is_active ? 0 : 1;
      await fetcher.get(`cms/action-contract-type?contractId=${contract.id}&status=${status}`);
      
      const index = contractList.findIndex((contract) => contract.id === contract.id);
      contractList[index].is_active = status;
      contract.is_active = status;
    } catch (error) {
      console.log(error);
    } finally {
      setProgress(false);
      setOpenConfirmDialog(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  const fetchDisplayedContracts = () => {
    const displayedContracts = contractList.slice(
      currentPage * rowsPerPage,
      currentPage * rowsPerPage + rowsPerPage
    );
    setDisplayContracts(displayedContracts);
  }

  const handleCloseEvent = () => { 
    setContract(null);
    fetchContractList();
    setPanelState(false);
  };

  useEffect(() => {
    fetchContractList();
  }, []);

  useEffect(() => {
    fetchDisplayedContracts();
  }, [currentPage, contractList, rowsPerPage]);

  return (
    <>
      <div className='headingRow'>
        <h1>Manage Contract</h1>
        <button className='btn btn-primary' onClick={() => setPanelState(true)}>Create Contract</button>
      </div>  

      <div className='whiteContainer'>
        <div className='mb-3 d-flex justify-content-between align-items-center'>
          <div className='tableSearchFilter'>
            <input type='text' className='form-control' placeholder='Search Contract' />
          </div>
        </div>

        {progress ? <CircularProgress /> : null}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table className='dataTable'>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '250px' }}>Name</TableCell>
                  <TableCell style={{ minWidth: '300px' }}>Description</TableCell>
                  <TableCell style={{ width: '100px' }}>Status</TableCell>
                  <TableCell style={{ width: '100px' }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { displayContracts.map((contract, index) => (
                  <TableRow key={index}>
                    <TableCell>
                          {contract.name}
                    </TableCell>
                    <TableCell>
                      {contract.desc}
                    </TableCell>
                    <TableCell>
                      {contract.is_active ? 
                        <Chip label="Active" color="success" size="small" /> 
                        : 
                        <Chip label="Inactive" color="error" size="small" /> 
                      } 
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
                        <MenuItem onClick={() => handleEditContract(contract, index)}>Edit</MenuItem>
                        <MenuItem onClick={() => handleOpenConfirmDialog(contract, index)}>
                          {contract?.is_active ? 'Deactivate' : 'Activate'}
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={contractList.length}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> 
        </Paper>
      </div>

      <Dialog open={openConfirmDialog}>
        <DialogContent>
          <Typography componebt="p">Are you sure you want to  {contract?.is_active ? ( 'Deactivate') : ( 'Activate' )}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateContractStatus}>Ok</Button>
        </DialogActions>
      </Dialog>


      {/* Create Contract panel */}
      <Drawer
        anchor="right"
        open={panelState}
        onClose={handleCloseEvent}
        PaperProps={{ 
          sx: {width: {xs: '100%', sm: '500px'}},
          style: { backgroundColor: '#f5f5f5', padding: '16px' } 
        }} 
      >
        <CreateContract closeEvent={handleCloseEvent} contract={contract}/>
      </Drawer>

    </>
  );

}

export default ManageContract;