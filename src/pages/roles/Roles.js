import React, { useEffect, useState } from 'react';
import style from './Roles.module.scss';
import { Table, TableCell, TableHead, TableRow, TableBody, IconButton, TablePagination, Drawer, Chip, Paper, TableContainer } from '@mui/material'; 
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CreateRole from './CreateRole';
import fetcher from '../../utils/fetcher';

const Roles = () => {
  const [panelState, setPanelState] = useState(false);
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState(null);
  const [displayRoles, setDisplayRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const fetchRoles = async () => {
    try {
      const res = await fetcher.get(`roles`);
      setRoles(res.response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDisplayedRoles = () => {
    const displayedRoles = roles.slice(
      currentPage * rowsPerPage,
      currentPage * rowsPerPage + rowsPerPage
    );
    setDisplayRoles(displayedRoles);
  }

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  const handleCloseEvent = () => {
    setRole(null);
    fetchRoles();
    setPanelState(false);
  };

  const handleRoleEdit = (role) => {
    setRole(role);
    setPanelState(true);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    fetchDisplayedRoles();
  }, [currentPage, roles, rowsPerPage]);

  return (
    <>  
      <div className='headingRow'>
        <h1>Roles</h1>
        <button className='btn btn-primary' onClick={() => setPanelState(true)}>Create Role</button>
      </div> 

      <div className='whiteContainer'>
        <div className='mb-3 d-flex justify-content-between align-items-center'>
          <div className='tableSearchFilter'>
            <input type='text' className='form-control' placeholder='Search Roles' />
          </div>
          {/* <button className='btn btn-primary' onClick={() => setPanelState(true)}>Add New Role</button> */}
        </div>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table className='dataTable'>
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: '150px' }}>Title</TableCell>
                  <TableCell style={{ minWidth: '250px' }}>Description</TableCell>
                  <TableCell style={{ minWidth: '150px' }}>Authorities</TableCell>
                  <TableCell style={{ width: '100px' }}>Status</TableCell>
                  <TableCell style={{ width: '100px' }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { displayRoles.map((role, index) => (
                  <TableRow key={index}>
                    <TableCell>
                          {role.name}
                    </TableCell>
                    <TableCell>
                          {role.description}
                    </TableCell>
                    <TableCell>
                      {role?.authCount}
                    </TableCell>
                    <TableCell>
                      {role.status ? 
                        <Chip label="Active" color="success" size="small" /> 
                        : 
                        <Chip label="Inactive" color="error" size="small" /> 
                      }
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleRoleEdit(role)} aria-label="Edit" className={style.editBtn}>
                        <BorderColorIcon />
                    </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={roles.length}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div> 


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
          <CreateRole closeEvent={handleCloseEvent} role={role}/>
        </Drawer>
    </>
  );



}

export default Roles;
