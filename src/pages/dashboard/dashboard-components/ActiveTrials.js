import React from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import style from './../Dashboard.module.scss';

const ActiveTrials = ({dashboardMetrics}) => {
    return(
        <>
            <section className={`${style.whiteBox}`}>
                <div className={style.titleRow}>
                    <h2>Active Trials</h2>
                </div>
                
                <div className={style.topCardVal}>
                    {dashboardMetrics.activeTrials} 
                    <span className={style.upIcon}><CallMadeIcon /></span>
                    {/* <span className={style.downIcon}><CallReceivedIcon /></span> */}
                </div>
                <p className={style.topCardText}>Increase compared to last week</p>

                {/* <div className={style.buttonLink}>
                    <button className="btn btn-default">All Active Trials <KeyboardArrowRightIcon /></button>
                </div> */}
            </section>        
        </>
    )
}

export default ActiveTrials;