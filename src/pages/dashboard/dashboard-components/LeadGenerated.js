import React from "react";
import style from './../Dashboard.module.scss';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'; 
import leadChart from '../../../assets/images/leadChart.png';

const LeadGenerated = () => {  
    return(
        <>
            <section className={`${style.whiteBox}`}>
                <div className={style.titleRow}>
                    <h2>Leads Generated</h2>
                    <div className={style.sortDropdown}>
                        <select className="form-control">
                            <option>Weekly</option>
                            <option>Monthly</option>
                        </select>
                    </div>
                </div>
 
                <div className={style.graphArea}>
                    <img src={leadChart} alt="" />
                </div>
            </section>        
        </>
    )
}

export default LeadGenerated;