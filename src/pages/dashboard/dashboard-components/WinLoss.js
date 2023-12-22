import React, { useEffect, useState } from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import style from './../Dashboard.module.scss';

//allClosedTickets / (allClosedTickets + allOpenTickets)
const WinLoss = ({dashboardMetrics}) => {
    const [data, setData] = useState('0%');

    const calculateWinLoss = () => {
        const denominator = dashboardMetrics.allClosedTickets + dashboardMetrics.allOpenTickets;

        // Check if the denominator is not zero before calculating
        const cal = denominator !== 0 ? Math.round(dashboardMetrics.allClosedTickets / denominator) : '0';
        setData(isNaN(cal) ? '0%' : cal + '%');
    };

    useEffect(() => {
        calculateWinLoss();
    }, [dashboardMetrics]); 

    return(
        <>
            <section className={`${style.whiteBox}`}>
                <div className={style.titleRow}>
                    <h2>Win/Loss %</h2>
                </div>
                
                <div className={style.winLossBox}>
                    <div className={`${style.winPercentVal} ${style.green}`}>{data}</div>
                    <div className={style.progressBar}> 
                        <span style={{width: data}}></span>
                    </div>
                </div>

                <div className={style.buttonLink}>
                    <button className="btn btn-default">All Leads <KeyboardArrowRightIcon /></button>
                </div>
            </section>
        </>
    )
}

export default WinLoss;