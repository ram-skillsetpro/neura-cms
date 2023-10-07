import React, { useEffect, useState } from 'react';
import style from './Authorities.module.scss';
import { Table, TableCell, TableHead, TableRow, TableBody, IconButton, TableFooter, TablePagination } from '@mui/material'; 
import BorderColorIcon from '@mui/icons-material/BorderColor';

const Authorities = () => {
  const authsData = [
    {
      title: 'Publisher',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      authCount: 4,
      status: 'active'
    },
    {
      title: 'Game Administrator',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      authCount: 4,
      status: 'active'
    },
    {
      title: 'Finance',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      authCount: 4,
      status: 'active'
    },
    {
      title: 'Developer Admin',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      authCount: 4,
      status: 'active'
    },
  ]

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
          <button className='btn btn-primary'>Add New Authorities</button>
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
            { authsData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                      {item.title}
                </TableCell>
                <TableCell>
                      {item.desc}
                </TableCell>
                <TableCell>
                  {item.authCount}
                </TableCell>
                <TableCell>
                  {item.status}
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
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={5}
                count={12}
                rowsPerPage={10}
                // page={page}
                // SelectProps={{
                //   inputProps: {
                //     'aria-label': 'rows per page',
                //   },
                //   native: true,
                // }}
                // onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
                // ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div> 
    </>
  );



}

export default Authorities;
