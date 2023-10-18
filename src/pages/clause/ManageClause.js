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
  Drawer,
  Chip
} from '@mui/material'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import fetcher from '../../utils/fetcher'
import CreateClause from './CreateClause';

const ManageClause = () => {

  const [panelState, setPanelState] = useState(false);
  const [clauseList, setClauseList] = useState([]);
  const [clause, setClause] = useState(null);
  const [progress, setProgress] = useState(false);
  const [dialogProgress, setDialogProgress] = useState(false);
  const [openStates, setOpenStates] = useState(Array(30).fill(false));
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openClauseDialog, setOpenClauseDialog] = useState(false);


  const fetchClauseList = async () => {
    try {
      setProgress(true);
      const res = await fetcher.get(`cms/clause-type-list/all`);
      setClauseList(res.response);
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

  const handleEditClause = (clause, index) => {
    handleMenuClose(index);
    setClause(clause);
    setPanelState(true);
  }

  const handleCloseClauseDialog = () => {
    setClause(null);
    setOpenClauseDialog(false);
    fetchClauseList();
  };

  const handleOpenConfirmDialog = (clause, index) => {
    handleMenuClose(index);
    setClause(clause);
    setOpenConfirmDialog(true);
  };

  const handleUpdateClauseStatus = async () => {
    try {
      setProgress(true);
      const status = clause.is_active ? 0 : 1;
      await fetcher.get(`cms/action-clause-type?clauseId=${clause.id}&status=${status}`);
      
      const index = clauseList.findIndex((clause) => clause.id === clause.id);
      clauseList[index].is_active = status;
      clause.is_active = status;
    } catch (error) {
      console.log(error);
    } finally {
      setProgress(false);
      setOpenConfirmDialog(false);
    }
  };

  useEffect(() => {
    fetchClauseList();
  }, []);

  const handleCloseEvent = () => { 
    setClause(null);
    fetchClauseList();
    setPanelState(false);
  };

  return (
    <>
      <div className='headingRow'>
        <h1>Manage Clause</h1>
        <button className='btn btn-primary' onClick={() => setPanelState(true)}>Create Clause</button>
      </div>   


      <div className='whiteContainer'>
        <div className='mb-3 d-flex justify-content-between align-items-center'>
          <div className='tableSearchFilter'>
            <input type='text' className='form-control' placeholder='Search Clause' />
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
                { clauseList.map((clause, index) => (
                  <TableRow key={index}>
                    <TableCell>
                          {clause.name}
                    </TableCell>
                    <TableCell>
                      {clause.desc}
                    </TableCell>
                    <TableCell>
                      {clause.is_active ? 
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
                        <MenuItem onClick={() => handleEditClause(clause, index)}>Edit</MenuItem>
                        <MenuItem onClick={() => handleOpenConfirmDialog(clause, index)}>
                          {clause?.is_active ? 'Deactivate' : 'Activate'}
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

      <Dialog open={openConfirmDialog}>
      { dialogProgress ? <CircularProgress /> : null }
        <DialogContent>
          <Typography componebt="p">Are you sure you want to  {clause?.is_active ? ( 'Deactivate') : ( 'Activate' )}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateClauseStatus}>Ok</Button>
        </DialogActions>
      </Dialog>


      {/* Create Clause panel */}
      <Drawer
        anchor="right"
        open={panelState}
        onClose={handleCloseEvent}
        PaperProps={{ 
          sx: {width: {xs: '100%', sm: '500px'}},
          style: { backgroundColor: '#f5f5f5', padding: '16px' } 
        }} 
      >
        <CreateClause closeEvent={handleCloseEvent} clause={clause}/>
      </Drawer>
    </>
  );



}

export default ManageClause;