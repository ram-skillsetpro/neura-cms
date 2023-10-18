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
  Chip,
  Drawer
} from '@mui/material'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import fetcher from '../../utils/fetcher'
import CreateClausePrompt from './CreateClausePrompt';

const ClausePrompt = () => {

  const [panelState, setPanelState] = useState(false);
  const [clauseList, setClauseList] = useState([]);
  const [clause, setClause] = useState(null);
  const [progress, setProgress] = useState(false);
  const [dialogProgress, setDialogProgress] = useState(false);
  const [openStates, setOpenStates] = useState(Array(30).fill(false));
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const fetchClausePromptsList = async () => {
    try {
      setProgress(true);
      const res = await fetcher.get(`cms/list-clause-prompt/all`);
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

  const handleAddClausePrompt = (clause, index) => {
    handleMenuClose(index);
    const newCP = {clauseid: clause.clauseid, companyid: clause.companyid}
    setClause(newCP);
    setPanelState(true);
  }

  const handleEditClausePrompt = (clause, index) => {
    handleMenuClose(index);
    setClause(clause);
    setPanelState(true);
  }

  const handleOpenConfirmDialog = (clause, index) => {
    handleMenuClose(index);
    setClause(clause);
    setOpenConfirmDialog(true);
  };

  const handleUpdateClauseStatus = async () => {
    try {
      setProgress(true);
      const status = clause.isActive ? 0 : 1;
      await fetcher.get(`cms/action-clause-prompt?clpmid=${clause.id}&status=${status}`);
      
      const index = clauseList.findIndex((clause) => clause.id === clause.id);
      clauseList[index].isActive = status;
      clause.isActive = status;
    } catch (error) {
      console.log(error);
    } finally {
      setProgress(false);
      setOpenConfirmDialog(false);
    }
  };

  useEffect(() => {
    fetchClausePromptsList();
  }, []);

  const handleCloseEvent = () => { 
    setPanelState(false);
    fetchClausePromptsList();
  };

  return (
    <>
      <div className='headingRow'>
        <h1>Manage Clause Prompt</h1> 
        {/* <button className='btn btn-primary' onClick={() => setPanelState(true)}>Create Clause Prompt</button> */}
      </div>    


      <div className='whiteContainer'>
        <div className='mb-3 d-flex justify-content-between align-items-center'>
          <div className='tableSearchFilter'>
            <input type='text' className='form-control' placeholder='Search Clause Prompt' />
          </div>
        </div>

        {progress ? <CircularProgress /> : null}
        
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table className='dataTable'>
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: '300px' }}>Text</TableCell>
                  <TableCell style={{ width: '150px' }}>Status</TableCell>
                  <TableCell style={{ width: '100px' }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { clauseList.map((clause, index) => (
                  <TableRow key={index}>
                    <TableCell>
                          {clause.text}
                    </TableCell>
                    <TableCell>
                      {clause.isActive ?
                        <Chip label="Active" color="success" size="small" /> 
                        : 
                        <Chip label="Deactive" color="error" size="small" /> 
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
                        <MenuItem onClick={() => handleAddClausePrompt(clause, index)}>Add</MenuItem>
                        <MenuItem onClick={() => handleEditClausePrompt(clause, index)}>Edit</MenuItem>
                        <MenuItem onClick={() => handleOpenConfirmDialog(clause, index)}>
                          {clause?.isActive ? 'Deactivate' : 'Activate'}
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
          <Typography componebt="p">Are you sure you want to  {clause?.isActive ? ( 'Deactivate') : ( 'Activate' )}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateClauseStatus}>Ok</Button>
        </DialogActions>
      </Dialog>


      {/* Create Clause Prompt panel */}
      <Drawer
        anchor="right"
        open={panelState}
        onClose={handleCloseEvent}
        PaperProps={{ 
          sx: {width: {xs: '100%', sm: '500px'}},
          style: { backgroundColor: '#f5f5f5', padding: '16px' } 
        }} 
      >
        <CreateClausePrompt closeEvent={handleCloseEvent} clause={clause}/>
      </Drawer>
    </>
  );
}

export default ClausePrompt;