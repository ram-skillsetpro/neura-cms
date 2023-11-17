import React from "react";
import style from './Users.module.scss';


const UserCard = (props) => {
    const {label, value, color, icon} = props;
    return(
        <>
            <article className={style.userTopArt}>
                <div className={style.userArtTxt}>
                    <h3 style={{color: color}}>{value}</h3>
                    <p>{label}</p>
                </div>
                <div className={style.userArtIcon}>
                    {icon}
                </div>
            </article>
        </>
    )
}

export default UserCard;