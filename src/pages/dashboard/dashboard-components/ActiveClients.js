import React from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import style from './../Dashboard.module.scss';

const ActiveClients = ({dashboardMetrics}) => {
    return(
        <>
            <section className={`${style.whiteBox}`}>
                <div className={style.titleRow}>
                    <h2>Active Clients</h2>
                </div>
                
                <div className={style.topCardVal}>
                {dashboardMetrics.activeClients}
                </div>
                <p className={style.topCardText}>Total Active Clients</p>

                {/* <div className={style.buttonLink}>
                    <button className="btn btn-default">All Clients <KeyboardArrowRightIcon /></button>
                </div> */}
            </section>        
        </>
    )
}

export default ActiveClients;