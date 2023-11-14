import React from "react";
import style from './../Dashboard.module.scss';

const LeadStatus = () => {
    return(
        <>
            <section className={`${style.whiteBox}`}>
                <div className={style.titleRow}>
                    <h2>Lead Status </h2>
                </div>
                
                <div className={style.leadStatusBox}>
                    <article className={`${style.leadStatusBar} ${style.allBar}`} style={{width: '100%'}}>
                        <span>All Leads</span>
                        <strong>29</strong>
                    </article>

                    <article className={`${style.leadStatusBar} ${style.demoBar}`} style={{width: '55%'}}>
                        <span>Demo</span>
                        <strong>15</strong>
                    </article>

                    <article className={`${style.leadStatusBar} ${style.trialBar}`} style={{width: '35%'}}>
                        <span>Trial</span>
                        <strong>10</strong>
                    </article>

                    <article className={`${style.leadStatusBar} ${style.closedBar}`} style={{width: '10%'}}>
                        <span>Closed</span>
                        <strong>4</strong>
                    </article>
                </div>
 
            </section>
        </>
    )
}

export default LeadStatus;