import React from "react";
import style from './../Dashboard.module.scss';
import weeklyChart from '../../../assets/images/leadWeeklyChart.png';

const ChartLeadsWeekly = () => {  
    return(
        <>
            <section className={`${style.whiteBox}`}>
                <div className={style.titleRow}>
                    <h2>Leads Weekly Status</h2>
                    <div className={style.sortDropdown}>
                        <select className="form-control">
                            <option>Weekly</option>
                            <option>Monthly</option>
                        </select>
                    </div>
                </div>
 
                <div className={style.graphArea}>
                    <img src={weeklyChart} alt="" />
                </div>
            </section>        
        </>
    )
}

export default ChartLeadsWeekly;