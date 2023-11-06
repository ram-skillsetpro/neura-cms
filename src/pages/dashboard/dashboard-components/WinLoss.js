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
                        Win loss - Progress bar here...
                </div>

                {/* <div className={style.buttonLink}>
                    <button className="btn btn-default">All Demos <KeyboardArrowRightIcon /></button>
                </div> */}
            </section>
        </>
    )
}

export default WinLoss;