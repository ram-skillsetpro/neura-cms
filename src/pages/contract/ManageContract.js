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
  IconButton,
  Drawer
} from '@mui/material'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import fetcher from '../../utils/fetcher'
import CloseIcon from '@mui/icons-material/Close';
import CreateContract from './Create';
import CreateContractNew from './CreateContract';

const ManageContract = () => {

  const [panelState, setPanelState] = useState(false);
  const [contractList, setContractList] = useState([]);
  const [contract, setContract] = useState(null);
  const [progress, setProgress] = useState(false);
  const [dialogProgress, setDialogProgress] = useState(false);
  const [openStates, setOpenStates] = useState(Array(30).fill(false));
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openContractDialog, setOpenContractDialog] = useState(false);


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
    setOpenContractDialog(true);
  }

  const handleCloseContractDialog = () => {
    setContract(null);
    setOpenContractDialog(false);
    fetchContractList();
  };

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

  useEffect(() => {
    fetchContractList();
  }, []);

  const handleCloseEvent = () => { 
    setPanelState(false);
  };

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
                  <TableCell style={{ width: '100px' }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { contractList.map((contract, index) => (
                  <TableRow key={index}>
                    <TableCell>
                          {contract.name}
                    </TableCell>
                    <TableCell>
                      {contract.desc}
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
        </Paper>
      </div>
      
      
      <Dialog open={openContractDialog}>
        <DialogContent>
            <CreateContract submitCallback={handleCloseContractDialog} contract={contract} />
        </DialogContent>
          <IconButton className='close-button' onClick={handleCloseContractDialog}><CloseIcon/></IconButton>
      </Dialog>

      <Dialog open={openConfirmDialog}>
      { dialogProgress ? <CircularProgress /> : null }
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
        <CreateContractNew closeEvent={handleCloseEvent} />
      </Drawer>

    </>
  );



}

export default ManageContract;