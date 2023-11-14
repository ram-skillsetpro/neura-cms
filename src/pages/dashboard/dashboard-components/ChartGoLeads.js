import React from "react";
import style from './../Dashboard.module.scss';
import goLeadsChart from '../../../assets/images/goLeadsChart.png';

const ChartGoLeads = () => {  
    return(
        <>
            <section className={`${style.whiteBox}`}>
                <div className={style.titleRow}>
                    <h2>Geo Leads</h2>
                    <div className={style.sortDropdown}>
                        <select className="form-control">
                            <option>Weekly</option>
                            <option>Monthly</option>
                        </select>
                    </div>
                </div>
 
                <div className={style.graphArea}>
                    <img src={goLeadsChart} alt="" />
                </div>
            </section>        
        </>
    )
}

export default ChartGoLeads;