import React from "react";
import style from "./TicketComments.module.scss";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CommentArticle from "./CommentArticle";

const TicketComments = ({closeEvent}) => {
    const comments = [
        {
            userType: 'DE',
            userName: 'Karan Sharma',
            detail: 'Task has been completed, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. '
        },
        {
            userType: 'QE',
            userName: 'self',
            detail: 'Some issues are pending. Lorem Ipsum is not simply random text. It has roots in a piece '
        },
    ]
    return(
        <>
            <div className="createMainTitle">
                <h2>Comments</h2>
                <IconButton onClick={closeEvent}>
                    <CloseIcon />
                </IconButton>
            </div>

            <div className={style.commentsList}>
                {comments.map((item, index) => 
                    <CommentArticle {...item} key={index} />
                )}
            </div>

            <div className={style.commentForm}>
                <div className="form-group"> 
                    <textarea className="form-control" placeholder="Please type your comments"></textarea>
                </div>
                <div className="text-right">
                    <button className="btn btn-primary">Comment</button>
                </div>
            </div>
        
        </>
    )
}

export default TicketComments;