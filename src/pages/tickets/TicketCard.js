import React from "react";
import style from './Tickets.module.scss';


const TicketCard = (props) => {
    const {label, value, color, icon} = props;
    return(
        <>
            <article className={style.ticketTopArt}>
                <div className={style.ticketTxt}>
                    <h3 style={{color: color}}>{value}</h3>
                    <p>{label}</p>
                </div>
                <div className={style.ticketIcon}>
                    {icon}
                </div>
            </article>
        </>
    )
}

export default TicketCard;