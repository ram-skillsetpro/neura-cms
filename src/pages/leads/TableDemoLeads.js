import React from "react";
import { IconButton, Table, TableBody, TableCell, TableHead, TableRow, Chip, Drawer } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { longToDate } from '../../utils/utility';
import CreateLead from "./CreateLead";
import { useState } from "react";

const TableDemoLeads = ({closeEvent, userList, companyList, packageList}) => {
    const [panelState, setPanelState] = useState(false);
    const [lead, setLead] = useState(null);

    const handleCloseEvent = () => { 
        setPanelState(false);
        closeEvent();
    };

    const handleEditLead = (lead, index) => {
        setLead(lead);
        setPanelState(true);
      }

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
                            <IconButton aria-label="Edit" className="editBtn" onClick={() => handleEditLead(user)}>
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

            <Drawer
                anchor="right"
                open={panelState}
                onClose={handleCloseEvent}
                PaperProps={{ 
                    sx: {width: {xs: '100%', sm: '700px'}},
                    style: { backgroundColor: '#f5f5f5', padding: '16px' } 
                }} 
                >

                {/* NOTE: please rename as "CreateCompany" */}
                <CreateLead closeEvent={handleCloseEvent} lead={lead} companyList={companyList} packageList={packageList} />
            </Drawer>

        </>
    )
}

export default TableDemoLeads;