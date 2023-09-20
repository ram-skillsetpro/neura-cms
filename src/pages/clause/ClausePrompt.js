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
  IconButton
} from '@mui/material'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import fetcher from '../../utils/fetcher'
import CloseIcon from '@mui/icons-material/Close';
import AddClausePrompt from './AddClausePrompt';

const ClausePrompt = () => {

  const [clauseList, setClauseList] = useState([]);
  const [clause, setClause] = useState(null);
  const [progress, setProgress] = useState(false);
  const [dialogProgress, setDialogProgress] = useState(false);
  const [openStates, setOpenStates] = useState(Array(30).fill(false));
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openClauseDialog, setOpenClauseDialog] = useState(false);


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
    setOpenClauseDialog(true);
  }

  const handleEditClausePrompt = (clause, index) => {
    handleMenuClose(index);
    setClause(clause);
    setOpenClauseDialog(true);
  }

  const handleCloseClauseDialog = () => {
    setClause(null);
    setOpenClauseDialog(false);
    fetchClausePromptsList();
  };

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

  return (
    <>
      <Typography variant="h3" className='page-heading'>
      Manage Clause
      </Typography>
      {progress ? <CircularProgress /> : null}
      <TableContainer sx={{ maxHeight: "calc(100vh - 230px)" }} component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Text</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { clauseList.map((clause, index) => (
            <TableRow key={index}>
              <TableCell>
                    {clause.text}
              </TableCell>
              <TableCell>
                {clause.isActive ? 'Active' : 'Deactive'}
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
      
      <Dialog open={openClauseDialog}>
        <DialogContent>
            <AddClausePrompt submitCallback={handleCloseClauseDialog} clause={clause} />
        </DialogContent>
          <IconButton className='close-button' onClick={handleCloseClauseDialog}><CloseIcon/></IconButton>
      </Dialog>

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

    </>
  );



}

export default ClausePrompt;