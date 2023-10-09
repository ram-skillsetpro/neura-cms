import React, { useEffect, useState } from 'react';
import style from './Authorities.module.scss';
import { Table, TableCell, TableHead, TableRow, TableBody, IconButton, TableFooter, TablePagination, Drawer } from '@mui/material'; 
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CreateAuthority from './CreateAuthority';
import fetcher from '../../utils/fetcher'

const Authorities = () => {
  const [panelState, setPanelState] = useState(false);
  const [authorities, setAuthorities] = useState([]);
  const [displayAuthorities, setDisplayAuthorities] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const fetchAuthorities = async () => {
    try {
      const res = await fetcher.get(`authorities`);
      setAuthorities(res.response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDisplayedAuthorities = () => {
    const displayedAuthorities = authorities.slice(
      currentPage * rowsPerPage,
      currentPage * rowsPerPage + rowsPerPage
    );
    setDisplayAuthorities(displayedAuthorities);
  }

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  useEffect(() => {
    fetchAuthorities();
  }, []);

  useEffect(() => {
    fetchDisplayedAuthorities();
  }, [currentPage, authorities, rowsPerPage]);

  return (
    <>  
      <div className='headingRow'>
        <h1>Authorities</h1>
      </div> 

      <div className='whiteContainer'>
        <div className='mb-3 d-flex justify-content-between align-items-center'>
          <div className='tableSearchFilter'>
            <input type='text' className='form-control' placeholder='Search Roles' />
          </div>
          <button className='btn btn-primary' onClick={() => setPanelState(true)}>Add New Authorities</button>
        </div>

        <Table className='dataTable'>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell> 
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { displayAuthorities.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                      {item.name}
                </TableCell>
                <TableCell>
                      {item.description}
                </TableCell> 
                <TableCell>
                  {item.status ? 'Active' : 'Inactive'}
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
                  count={authorities.length}
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
          <CreateAuthority closeEvent={() => setPanelState(false)} />
        </Drawer>
    </>
  );



}

export default Authorities;
