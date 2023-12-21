import React from "react";
import style from "./TicketComments.module.scss";
import { getAuthUser, hasAuthority, hasAuthorityById } from "../../../utils/authGuard";
import { AUTHORITY } from "../../../utils/constants";

const CommentArticle = ({ comment }) => {
    return(
        <article className={`${style.commentArticle} ${comment.userId === getAuthUser()?.profileId ? style.selfComment : ''}`}>
            <div className={style.commentDetail}>
                <div className={style.commentUserDetail}>
                    <strong>
                        { comment.userId === getAuthUser()?.profileId ? <>You</> : <>{comment.userName}</> }
                        { hasAuthorityById(comment.roleId) && hasAuthority(AUTHORITY.USER_QC) ? <span>QC User</span> : <span>DE User</span> }
                    </strong>
                </div>
                <div className={style.commentDuration}>
                    10th December 2023, 10:30am
                </div>
                <div>{comment.comment}</div>
            </div>
        </article>
    )
}

export default CommentArticle;