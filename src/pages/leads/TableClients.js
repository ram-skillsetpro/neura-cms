import React from "react";
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, Chip } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { longToDate } from '../../utils/utility';

const TableClients = ({userList}) => {
    return(
        <>
            <Table className='dataTable'>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ minWidth: '200px' }}>Company Logo</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>Company Name</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>Contact Name</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>Email</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>Phone No.</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>Package Name</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>Package Start Date</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>Package End Date</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>Status</TableCell>
                        <TableCell style={{ minWidth: '100px' }}></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                  { userList.map((user, index) => (
                    <TableRow key={index}>
                        <TableCell> </TableCell>
                        <TableCell>{user.companyName}</TableCell>
                        <TableCell>{user.userName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone} </TableCell>
                        <TableCell>{longToDate(user.packageStartDate)}</TableCell>
                        <TableCell>{longToDate(user.packageEndDate)}</TableCell>
                        <TableCell>
                            {user.status ? 
                                <Chip label="Active" color="success" size="small" /> 
                                : 
                                <Chip label="Inactive" color="error" size="small" /> 
                            }
                        </TableCell>
                        <TableCell>
                            <IconButton aria-label="Edit" className="editBtn">
                                <BorderColorIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
        </>
    )
}

export default TableClients;