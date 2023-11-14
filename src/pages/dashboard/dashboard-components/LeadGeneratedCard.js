import React from "react";
import style from './../Dashboard.module.scss';

const LeadGeneratedCard = ({title, subTitle, value, image}) => {  
    return(
        <article className={`${style.whiteBox} ${style.leadGenArticle}`}>
            <h3>{title}</h3>
            <div className={style.leadGenVal}>
                {value ? value : null}
                {image ? <><img src={image} alt="" /></> : null}
            </div>
            <div className={style.leadGenSubTitle}>
                {subTitle}
            </div>
        </article>     
    )
}

export default LeadGeneratedCard;