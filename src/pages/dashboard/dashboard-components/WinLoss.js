import React from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import style from './../Dashboard.module.scss';

const WinLoss = () => {
    return(
        <>
            <section className={`${style.whiteBox}`}>
                <div className={style.titleRow}>
                    <h2>Win/Loss %</h2>
                </div>
                
                <div className={style.winLossBox}>
                    <div className={`${style.winPercentVal} ${style.green}`}>84%</div>
                    <div className={style.progressBar}> 
                        <span style={{width: '84%'}}></span>
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