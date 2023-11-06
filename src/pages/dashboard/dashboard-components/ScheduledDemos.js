import React from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import style from './../Dashboard.module.scss';

const ScheduledDemos = () => {
    return(
        <>
            <section className={`${style.whiteBox}`}>
                <div className={style.titleRow}>
                    <h2>Scheduled Demos</h2>
                </div>
                
                <div className={style.topCardVal}>
                    12
                </div>
                <p className={style.topCardText}>Demos scheduled this week</p>

                <div className={style.buttonLink}>
                    <button className="btn btn-default">All Demos <KeyboardArrowRightIcon /></button>
                </div>
            </section>        
        </>
    )
}

export default ScheduledDemos;