import React, { useEffect, useState } from 'react';
import style from './Authorities.module.scss';
import { Table, TableCell, TableHead, TableRow, TableBody, IconButton, TablePagination, Drawer, Paper, TableContainer, Chip } from '@mui/material'; 
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CreateAuthority from './CreateAuthority';
import fetcher from '../../utils/fetcher';

const Authorities = () => {
  const [panelState, setPanelState] = useState(false);
  const [authorities, setAuthorities] = useState([]);
  const [authority, setAuthority] = useState(null);
  const [displayAuthorities, setDisplayAuthorities] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState('');


  const fetchAuthorities = async () => {
    try {
      const res = await fetcher.get(`authorities`);
      setAuthorities(res.response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDisplayedAuthorities = () => {
    if (searchInput) {
      const filteredAuthorities = authorities.filter((authority) =>
        authority.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setCount(filteredAuthorities.length);
      setDisplayAuthorities(filteredAuthorities.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage));
      return;
    }

    const displayedAuthorities = authorities.slice(
      currentPage * rowsPerPage,
      currentPage * rowsPerPage + rowsPerPage
    );
    setCount(authorities.length);
    setDisplayAuthorities(displayedAuthorities);
  }

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setCurrentPage(0);
  };

  const handleCloseEvent = () => {
    setAuthority(null);
    fetchAuthorities();
    setPanelState(false);
  };

  const handleAuthorityEdit = (authority) => {
    setAuthority(authority);
    setPanelState(true);
  };

  const filterAuthorities = (txt) => {
    setCurrentPage(0);
    setSearchInput(txt);
  };

  useEffect(() => {
    fetchAuthorities();
  }, []);

  useEffect(() => {
    fetchDisplayedAuthorities();
  }, [searchInput, currentPage, authorities, rowsPerPage]);

  return (
    <>  
      <div className='headingRow'>
        <h1>Authorities</h1>
        <button className='btn btn-primary' onClick={() => setPanelState(true)}>Create Authority</button>
      </div> 

      <div className='whiteContainer'>
        <div className='mb-3 d-flex justify-content-between align-items-center'>
          <div className='tableSearchFilter'>
            <input type='text' className='form-control' placeholder='Search Authority' onChange={(e) => filterAuthorities(e.target.value)}/>
          </div> 
        </div>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table className='dataTable'>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '200px' }}>Title</TableCell>
                  <TableCell style={{ minWidth: '250px' }}>Description</TableCell> 
                  <TableCell style={{ width: '100px' }}>Status</TableCell>
                  <TableCell style={{ width: '100px' }}></TableCell>
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
                      {item.status ? 
                        <Chip label="Active" color="success" size="small" /> 
                        : 
                        <Chip label="Inactive" color="error" size="small" /> 
                      } 
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleAuthorityEdit(item)} aria-label="Edit" className={style.editBtn}>
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
            count={count}
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
          <CreateAuthority closeEvent={handleCloseEvent} authority={authority}/>
        </Drawer>
    </>
  );



}

export default Authorities;
