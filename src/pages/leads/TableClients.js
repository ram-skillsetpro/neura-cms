import React from "react";
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';

const TableClients = () => {
    return(
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ minWidth: '200px' }}>Company Logo</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>Company Name</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>Contact Name</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>Email</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>Mobile</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>Package Name</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>Package Start Date</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>Package End Date</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>Status</TableCell>
                        <TableCell style={{ minWidth: '100px' }}></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    <TableRow>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                        <TableCell>
                            <IconButton aria-label="Edit" className="editBtn">
                                <BorderColorIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}

export default TableClients;