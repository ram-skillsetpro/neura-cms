import React, { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import style from './TicketDetail.module.scss';
import { useSearchParams } from 'react-router-dom';
import fetcher from '../../utils/fetcher';
import { hasAuthority } from '../../utils/authGuard';
import { AUTHORITY } from "../../utils/constants";

const TicketDetail = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [expanded, setExpanded] = React.useState(false);
    const [deProcessedMeta, setDeProcessedMeta] = React.useState([]);
    const [processedMeta, setProcessedMeta] = React.useState([]);


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

    const openFile = async (id) => {
        try {
          const res = await fetcher.post(`deqc/open-assign?fileId=${id}`);
          setProcessedMeta(JSON.parse(hasAuthority(AUTHORITY.USER_DE) ? res.response.deProcessedMeta : res.response.qcProcessedMeta));
        } catch (error) {
          console.log(error);
        }
    };

    const saveInboxItem = async (status) => {
        try {
            const payload = {
                id: searchParams.get('id'),  
                status: status
            }
            if (hasAuthority(AUTHORITY.USER_DE)) {
                payload.deProcessedMeta = JSON.stringify(processedMeta);
            } else {
                payload.qcProcessedMeta = JSON.stringify(processedMeta);
            }

            const res = await fetcher.post(`deqc/save-inbox-item`, payload);
            console.log(res);
        } catch (error) {
          console.log(error);
        }
    };

    const disableInput = (status) => {
        if (hasAuthority(AUTHORITY.USER_DE)) {
            return status === 2 || status === 6;
        } else {
            return status === 4 || status === 7;
        }
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
        //console.log(updatedState);
    };

    useEffect(() => {
        openFile(searchParams.get('id'));
    }, []);
    return(
        <>
            <div className='headingRow'>
                <h1>Ticket Detail Title here... </h1>

                <div className={style.timerBox}>
                    <AccessAlarmIcon />
                    <span>02:45</span>
                </div>
            </div> 

            <div className={style.ticketContainer}>
                <object 
                    data="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20210101201653/PDF.pdf" 
                    width="100%"     
                    height="500"
                    className={style.ticketPDF}> 
                </object> 

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
                                    <Typography>{section.key}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {renderAccordionContent(section.value, index, section.status)}
                                        {hasAuthority(AUTHORITY.USER_DE) ? (
                                            <div className={style.ticActionBtn}>
                                                <button className='btn btn-success' onClick={() => handleMetaAction(index, 2)}>Ok</button>
                                                <button className='btn btn-secondary' onClick={() => handleMetaAction(index, 0)}>Edit</button>
                                                <button className='btn btn-primary' onClick={() => handleMetaAction(index, 6)}>Skip</button> 
                                            </div>
                                        ) : (
                                            <div className={style.ticActionBtn}>
                                                <button className='btn btn-success' onClick={() => handleMetaAction(index, 4)}>Ok</button>
                                                <button className='btn btn-secondary' onClick={() => handleMetaAction(index, 0)}>Edit</button>
                                                <button className='btn btn-primary' onClick={() => handleMetaAction(index, 7)}>Skip</button> 
                                            </div>
                                        )}
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </div>
                        {hasAuthority(AUTHORITY.USER_DE) ? (
                            <div className='text-center'>
                                <button className='btn btn-primary' onClick={() => saveInboxItem(5)}>Save</button>
                                <button className='btn btn-primary' onClick={() => saveInboxItem(6)}
                                    disabled={!processedMeta.every(section => section.status === 2 || section.status === 6)}>Submit</button>
                            </div>
                        ) : (
                            <div className='text-center'>
                                <button className='btn btn-primary' onClick={() => saveInboxItem(7)}>Save</button>
                                <button className='btn btn-primary' onClick={() => saveInboxItem(8)}
                                    disabled={!processedMeta.every(section => section.status === 4 || section.status === 7)}>Submit</button>
                            </div>
                        )}
                    </section>
                )}
            </div>
        </>
    )
}

export default TicketDetail;