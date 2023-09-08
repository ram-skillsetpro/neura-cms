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
import CreateClause from './Create';

const ManageClause = () => {

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
    setOpenClauseDialog(true);
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
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell></TableCell>
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
      
      <Dialog open={openClauseDialog}>
        <DialogContent>
            <CreateClause submitCallback={handleCloseClauseDialog} clause={clause} />
        </DialogContent>
          <IconButton className='close-button' onClick={handleCloseClauseDialog}><CloseIcon/></IconButton>
      </Dialog>

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

    </>
  );



}

export default ManageClause;