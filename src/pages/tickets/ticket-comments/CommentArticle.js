import React from "react";
import style from "./TicketComments.module.scss";

const CommentArticle = (props) => {
    const { userType, userName, detail } = props;
    return(
        <article className={`${style.commentArticle} ${userName == 'self' ? style.selfComment : ''}`}>
            <div className={style.commentDetail}>
                <div className={style.commentUserDetail}>
                    <strong>
                        { userName == 'self' ? <>You</> : <>{userName}</> }
                        <span>{userType} User</span>
                    </strong>
                </div>
                <div className={style.commentDuration}>
                    10th December 2023, 10:30am
                </div>
                <div>{detail}</div>
            </div>
        </article>
    )
}

export default CommentArticle;