import React from "react";
import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from 'react-router-dom';
import {PageUrls } from "../../utils/constants";


const Reports = () => {
    return(
        <> 
            <div className='headingRow'>
                <h1>Reports</h1>
            </div> 

            <div className='whiteContainer'>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer>
                        <Table className='dataTable'>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ minWidth: '250px' }}>Title</TableCell>
                                    <TableCell style={{ minWidth: '150px' }}>Reported By</TableCell>
                                    <TableCell style={{ minWidth: '150px' }}>DE</TableCell>
                                    <TableCell style={{ width: '150px' }}>QA</TableCell>
                                    <TableCell style={{ width: '150px' }}>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableCell><Link to={PageUrls.REPORT_DETAIL}>Report Title here...</Link></TableCell>
                                <TableCell>Reporting Manager</TableCell>
                                <TableCell>DE User Name</TableCell>
                                <TableCell>QA User Name</TableCell>
                                <TableCell>
                                    <Chip label="Open" color="default" size="small" />
                                    {/* <Chip label="In Progress" color="secondary" size="small" />
                                    <Chip label="Resoloved" color="primary" size="small" />
                                    <Chip label="Done" color="success" size="small" /> */}
                                </TableCell>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>

        </>
    )
}

export default Reports;