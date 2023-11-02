import React from "react";
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';

const TableDemoLeads = ({userList}) => {
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
                        <TableCell style={{ minWidth: '200px' }}>Start Date</TableCell>
                        <TableCell style={{ minWidth: '200px' }}>End Date</TableCell>
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
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell>
                        <TableCell> </TableCell> 
                        <TableCell>
                            <IconButton aria-label="Edit" className="editBtn">
                                <BorderColorIcon />
                            </IconButton>
                            {/* <Button
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
                            <MenuItem onClick={() => handleOpenConfirmDialog(user, index)}>Deactivate</MenuItem>
                            </Menu> */}
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
        </>
    )
}

export default TableDemoLeads;