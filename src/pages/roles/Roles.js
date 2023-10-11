import React, { useEffect, useState } from 'react';
import style from './Roles.module.scss';
import { Table, TableCell, TableHead, TableRow, TableBody, IconButton, TableFooter, TablePagination, Drawer } from '@mui/material'; 
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CreateRole from './CreateRole';
import fetcher from '../../utils/fetcher';

const Roles = () => {
  const [panelState, setPanelState] = useState(false);
  const [roles, setRoles] = useState([]);
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
    setCurrentPage(0);
    fetchRoles();
    setPanelState(false);
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
      </div> 

      <div className='whiteContainer'>
        <div className='mb-3 d-flex justify-content-between align-items-center'>
          <div className='tableSearchFilter'>
            <input type='text' className='form-control' placeholder='Search Roles' />
          </div>
          <button className='btn btn-primary' onClick={() => setPanelState(true)}>Add New Role</button>
        </div>

        <Table className='dataTable'>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Authorities</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
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
                  {role.status ? 'Active' : 'Inactive'}
                </TableCell>
                <TableCell>
                  <IconButton aria-label="Edit" className={style.editBtn}>
                    <BorderColorIcon />
                </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
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
          </TableFooter>
        </Table>
      </div> 


      {/* Create Role panel */}
      <Drawer
          anchor="right"
          open={panelState}
          onClose={() => setPanelState(false)}
          PaperProps={{ 
            sx: {width: {xs: '100%', sm: '500px'}},
            style: { backgroundColor: '#f5f5f5', padding: '16px' } 
          }} 
        >
          <CreateRole closeEvent={handleCloseEvent} />
        </Drawer>
    </>
  );



}

export default Roles;
