import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import style from './TicketDetail.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import fetcher from '../../../utils/fetcher';
import { hasAuthority } from '../../../utils/authGuard';
import { AUTHORITY, ProcessMetaStatus, FileProcessStatus } from "../../../utils/constants";
import SnackBar from '../../../components/SnackBar';
import { CircularProgress, Dialog, DialogContent, DialogTitle, Drawer, IconButton, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TicketComments from '../ticket-comments/TicketComments';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ButtonAction } from '../../../utils/constants';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { parse, format } from 'date-fns';

const TicketDetail = () => {
    const [panelState, setPanelState] = useState(false);
    const [commentViewDialog, setCommentViewDialog] = useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [processedMeta, setProcessedMeta] = React.useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { ticketDetails } = location.state;
    const [userAction, setUserAction] = React.useState({});
    const [fileData, setFileData] = React.useState(null);
    const [progress, setProgress] = useState(false);
    const maxCharacterLimit = 500;

    const [snackbar, setSnackbar] = useState({
      show: false,
      status: "",
      message: "",
    });
    const toggleSnackbar = (value) => {
        setSnackbar(value);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded((prevExpanded) => ({
          ...prevExpanded,
          [panel]: isExpanded ? panel : false,
        }));
    };

    const handleInputChange = (sectionIndex, itemIndex, key, newValue) => {
        const updatedState = JSON.parse(JSON.stringify(processedMeta));
        const [subSelection, subIndex] = sectionIndex.toString().split('_');
        if (subIndex) {
            let currentItem = updatedState[subSelection].value[subIndex];
            currentItem.value = currentItem.value.map((subItem) => {
                if (subItem.key === key) {
                  return { key, value: newValue instanceof Date ? newValue.getTime() : newValue };
                } else {
                  return subItem;
                }
              });
        } else {
          let currentItem = updatedState[sectionIndex].value[itemIndex];
          currentItem = {
            value: newValue instanceof Date ? newValue.getTime() : newValue,
            key: currentItem.key,
          };
          updatedState[sectionIndex].value[itemIndex] = currentItem;
        }
        setProcessedMeta(updatedState);
        console.log(JSON.stringify(updatedState));
    };

    const saveInboxItem = async (status, comment) => {
        try {
            const payload = {
                id: ticketDetails.id,  
                status: status,
                comment: comment
            }
            if (hasAuthority(AUTHORITY.USER_DE)) {
                payload.deProcessedMeta = JSON.stringify(processedMeta);
            } else {
                payload.qcProcessedMeta = JSON.stringify(processedMeta);
            }

            const res = await fetcher.post(`deqc/save-inbox-item`, payload);
            setSnackbar({
              show: true,
              status: res.status === 200 ? 'success' : 'error',
              message: res.status === 200 ? 'Saved successfully' : res?.message
            });
        } catch (error) {
          console.log(error);
        }
    };

    const disableInput = (status) => {
      return status === userAction.ok || status === userAction.skip;
    };

  const renderAccordionContent = (data, parentIndex, status) => {
    return (
      <div>
        {data.map((item, itemIndex) => (
          <div key={itemIndex} className='form-group'>
            {typeof item.value === 'object' ? (
              // If the value is an object, render nested accordions
              <Accordion
                expanded={expanded[`panel${parentIndex}_${itemIndex}`]}
                onChange={handleChange(`panel${parentIndex}_${itemIndex}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${parentIndex}_${itemIndex}bh-content`}
                  id={`panel${parentIndex}_${itemIndex}bh-header`}
                >
                  <Typography>{item.key}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {renderAccordionContent(item.value, `${parentIndex}_${itemIndex}`, status)}
                </AccordionDetails>
              </Accordion>
            ) : (
              // If the value is not an object, check for "date" and render accordingly
              <>
                <div className='form-group'>
                  {item.key.toLowerCase().includes('date') ? (
                    // If item.key is "date," render the DatePicker component
                    <>
                      <label className='label-control'>{item.key}</label>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    className="datepickerStyle"
                                    name={item.key}
                                    value={!(typeof item.value === 'number') ? convertToDateObject(item.value) : item.value}
                                    onChange={(date) => handleInputChange(parentIndex, itemIndex, item.key, date)}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                    </>
                  ) : (
                    // If item.key is not "date," render the input field
                    <>
                      <label className='label-control'>{item.key}</label>
                      <input
                        name={item.key}
                        type="text"
                        className="form-control"
                        value={item.value}
                        onChange={(e) =>
                          handleInputChange(parentIndex, itemIndex, item.key, e.target.value)
                        }
                        disabled={disableInput(status)}
                      />
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  const convertToDateObject = (dateString) => {
    if (dateString && typeof dateString === 'string') {
      const dateObject = parse(dateString, 'dd/MM/yyyy', new Date());
      return dateObject;
    } else {
      return null;
    }
  };


  const handleMetaAction = (index, status) => {
    const updatedState = JSON.parse(JSON.stringify(processedMeta));
    const section = updatedState[index];
    section.status = status;
    updatedState[index] = section;
    setProcessedMeta(updatedState);
  };

  const handleUserAction = () => {
    if (hasAuthority(AUTHORITY.USER_DE)) {
      setProcessedMeta(JSON.parse(ticketDetails.deProcessedMeta));
      setUserAction({
        ok: ProcessMetaStatus.DE_VERIFIED,
        edit: ProcessMetaStatus.STANDARD,
        skip: ProcessMetaStatus.DE_SKIPPED,
        save: FileProcessStatus.DE_ASSIGNED,
        submit: FileProcessStatus.DE_DONE
      });
    } else if (hasAuthority(AUTHORITY.USER_QC)) {
      setProcessedMeta(JSON.parse(ticketDetails.qcProcessedMeta));
      setUserAction({
        ok: ProcessMetaStatus.QC_VERIFIED,
        edit: ProcessMetaStatus.STANDARD,
        skip: ProcessMetaStatus.QC_SKIPPED,
        save: FileProcessStatus.QC_ASSIGNED,
        submit: FileProcessStatus.QC_DONE,
        reject: FileProcessStatus.QC_REJECT
      });
    }
  }

  const readFile = async () => {
    setProgress(true);
    const res = await fetcher.get(`de-qc-read-file?fileId=${ticketDetails.id}`);
    setFileData(res);
    setProgress(false);
  };

  const commentValidationSchema = Yup.object().shape({
    comment: Yup.string().when('isCommentReq', (req, schema) => {
      if (req[0]) {
        return schema.required('Comment is required').max(maxCharacterLimit, 'Comment exceeds character limit for required comment');
      }
      return schema.max(maxCharacterLimit, 'Comment exceeds character limit');
    })
  });

  const initialValues =  {
    comment: '',
    status: 0,
    isCommentReq: false
  };

  const commentFormik = useFormik({
    initialValues: initialValues,
    validationSchema: commentValidationSchema,
    onSubmit: (values) => {
      saveInboxItem(values.status, values.comment);
    }
  });

    useEffect(() => {
      handleUserAction();
      readFile();
    }, []);

    const handleCloseEvent = () => { 
      setPanelState(false);
    };

    const handleOpenCommentDialog = (status, action) => {
      commentFormik.values.status = status;
      if (action === ButtonAction.REJECT) {
        commentFormik.values.isCommentReq = true;
        setCommentViewDialog(true);
      } else if (action === ButtonAction.SUBMIT) {
        commentFormik.values.isCommentReq = false;
        setCommentViewDialog(true);
      } else {
        saveInboxItem(status, commentFormik.values.comment);
      }
    };

    const handleCloseCommentPopup = () => {
      setCommentViewDialog(false);
      commentFormik.setValues(initialValues);
    };
    
    return(
        <> 
            <SnackBar {...snackbar} onClose={toggleSnackbar} />
            <div className='headingRow'>
                <h1>
                  <IconButton aria-label="Back" className='mr-2' onClick={() => navigate(-1)}>
                    <ArrowBackIcon />
                  </IconButton>
                  {ticketDetails?.fileName && ticketDetails.fileName.split('.')[0]} 
                </h1>

                <button className='btn btn-primary' onClick={() => setPanelState(true)}>Comments</button>
            </div> 

            <div className={style.ticketContainer}>
              <div className={style.ticketPDFArea}>
                {progress ? <div className='text-center py-4'><CircularProgress /></div> : null}
                { fileData && 
                  <object
                    data={`data:application/pdf;base64,${fileData}`}
                    width="100%"
                    height="500"
                    className={style.ticketPDF}
                  ></object>
                }
              </div>
              
              {processedMeta.length > 0 && (
                    <section className={style.ticketDetailForm}>
                        <div className={style.accBox}>
                            {processedMeta && processedMeta.map((section, index) => (
                                <Accordion
                                    key={index}
                                    expanded={expanded[`panel${index}`]}
                                    onChange={handleChange(`panel${index}`)}
                                >
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls={`panel${index}bh-content`}
                                      id={`panel${index}bh-header`}
                                    >
                                      <Typography sx={{ width: 'calc(95% - 24px)', fontSize: '14px', flexShrink: 0 }}>
                                        {section.key}
                                      </Typography>
                                      { section.status === userAction.ok && <TaskAltIcon color="success" /> }
                                      { section.status === userAction.skip && <TaskAltIcon color="error" /> }
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      {renderAccordionContent(section.value, index, section.status)}
                                      <div className={style.ticActionBtn}>
                                        <button className='btn btn-success' onClick={() => handleMetaAction(index, userAction.ok)}>Ok</button>
                                        <button className='btn btn-secondary' onClick={() => handleMetaAction(index, userAction.edit)}>Edit</button>
                                        <button className='btn btn-primary' onClick={() => handleMetaAction(index, userAction.skip)}>Skip</button> 
                                      </div>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </div>
                        <div className='text-center'>
                          { userAction?.reject && (
                            <button className='btn btn-primary mr-2' onClick={() => handleOpenCommentDialog(userAction.reject, ButtonAction.REJECT)}>Reject</button>
                          )}
                          <button className='btn btn-primary mr-2' onClick={() => handleOpenCommentDialog(userAction.save, ButtonAction.SAVE)}>Save</button>
                          <button className='btn btn-primary' onClick={() => handleOpenCommentDialog(userAction.submit, ButtonAction.SUBMIT)}
                            disabled={!processedMeta.every(section => section.status === userAction.ok || section.status === userAction.skip)}>Submit</button>
                          
                        </div>
                    </section>
              )}
            </div>


            {/* Ticket Comment panel */}
            <Drawer
                anchor="right"
                open={panelState}
                onClose={handleCloseEvent}
                PaperProps={{ 
                  sx: {width: {xs: '100%', sm: '500px'}},
                  style: { backgroundColor: '#f5f5f5', padding: '16px' } 
                }} 
              >
                <TicketComments ticketDetails={ticketDetails} closeEvent={handleCloseEvent} />
            </Drawer>


            {/* Ticket Comment Popup */}
            <Dialog className={style.authListModal} open={commentViewDialog}>
              <DialogTitle className={style.authModalHead}>
                Ticket Comments
              </DialogTitle>
              <IconButton
                aria-label="close" 
                onClick={handleCloseCommentPopup}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
              
              <DialogContent className={style.commentTextForm}>
              <form onSubmit={commentFormik.handleSubmit}>
                 <div className='form-group'>
                    <label className='label-control'>Comment <span>*</span></label>
                    <textarea
                      name="comment"
                      className='form-control'
                      value={commentFormik.values.comment}
                      onChange={commentFormik.handleChange}
                    />
                    {commentFormik.touched.comment && commentFormik.errors.comment ? (
                      <div className={style.textlength}>{commentFormik.errors.comment}</div>
                    ) : <div className={style.textlength}>
                        <strong>{maxCharacterLimit - commentFormik.values.comment.length}</strong> character remaining
                      </div>
                    }
                 </div>
                <div className="text-right">
                    <button className="btn btn-primary">Save</button>
                </div>
                </form>
              </DialogContent> 
            </Dialog>
        </>
    )
}

export default TicketDetail;