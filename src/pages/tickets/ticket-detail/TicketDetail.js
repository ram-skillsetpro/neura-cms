import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import style from './TicketDetail.module.scss';
import { useLocation } from 'react-router-dom';
import fetcher from '../../../utils/fetcher';
import { hasAuthority } from '../../../utils/authGuard';
import { AUTHORITY, ProcessMetaStatus, FileProcessStatus } from "../../../utils/constants";
import SnackBar from '../../../components/SnackBar';
import { CircularProgress } from '@mui/material';

const TicketDetail = () => {
    const [expanded, setExpanded] = React.useState(false);
    const [processedMeta, setProcessedMeta] = React.useState([]);
    const location = useLocation();
    const { ticketDetails } = location.state;
    const [userAction, setUserAction] = React.useState({});
    const [fileData, setFileData] = React.useState(null);
    const [progress, setProgress] = useState(false);
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
                  return { key, value: newValue };
                } else {
                  return subItem;
                }
              });
        } else {
          let currentItem = updatedState[sectionIndex].value[itemIndex];
          currentItem = {
            value: newValue,
            key: currentItem.key,
          };
          updatedState[sectionIndex].value[itemIndex] = currentItem;
        }
        setProcessedMeta(updatedState);
        console.log(JSON.stringify(updatedState));
    };

    const saveInboxItem = async (status) => {
        try {
            const payload = {
                id: ticketDetails.id,  
                status: status
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
                  // If the value is not an object, render input field
                  <>
                    <div className='form-group'>
                        <label>{item.key}</label>
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
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        );
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
        submit: FileProcessStatus.QC_DONE
      });
    }
  }

  const readFile = async () => {
    setProgress(true);
    const res = await fetcher.get(`de-qc-read-file?fileId=${ticketDetails.id}`);
    setFileData(res);
    setProgress(false);
  };

    useEffect(() => {
      handleUserAction();
      readFile();
    }, []);
    
    return(
        <>
            {progress ? <CircularProgress /> : null}
            <SnackBar {...snackbar} onClose={toggleSnackbar} />
            <div className='headingRow'>
                <h1>{ticketDetails?.fileName && ticketDetails.fileName.split('.')[0]}</h1>
            </div> 

            <div className={style.ticketContainer}>
                { fileData && 
                  <object
                    data={`data:application/pdf;base64,${fileData}`}
                    width="100%"
                    height="500"
                    className={style.ticketPDF}
                  ></object>
                }
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
                          <button className='btn btn-primary mr-2' onClick={() => saveInboxItem(userAction.save)}>Save</button>
                          <button className='btn btn-primary' onClick={() => saveInboxItem(userAction.submit)}
                            disabled={!processedMeta.every(section => section.status === userAction.ok || section.status === userAction.skip)}>Submit</button>
                        </div>
                    </section>
                )}
            </div>
        </>
    )
}

export default TicketDetail;