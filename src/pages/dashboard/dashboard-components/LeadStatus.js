import React from "react";
import style from './../Dashboard.module.scss';

const LeadStatus = ({dashboardMetrics}) => {
    return(
        <>
            <section className={`${style.whiteBox}`}>
                <div className={style.titleRow}>
                    <h2>Lead Status </h2>
                </div>
                
                <div className={style.leadStatusBox}>
                    <article className={`${style.leadStatusBar} ${style.allBar}`} style={{width: '100%'}}>
                        <span>All Leads</span>
                        <strong>{dashboardMetrics.totalLeads}</strong>
                    </article>

                    <article className={`${style.leadStatusBar} ${style.demoBar}`} style={{width: '55%'}}>
                        <span>Demo</span>
                        <strong>{dashboardMetrics.demoLeads}</strong>
                    </article>

                    <article className={`${style.leadStatusBar} ${style.closedBar}`} style={{width: '10%'}}>
                        <span>Closed</span>
                        <strong>{dashboardMetrics.closedLeads}</strong>
                    </article>
                </div>
 
            </section>
        </>
    )
}

export default LeadStatus;