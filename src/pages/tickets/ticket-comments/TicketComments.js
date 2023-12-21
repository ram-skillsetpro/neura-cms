import React, { useEffect } from "react";
import style from "./TicketComments.module.scss";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CommentArticle from "./CommentArticle";
import fetcher from "../../../utils/fetcher";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SnackBar from "../../../components/SnackBar";

const TicketComments = ({ ticketDetails, closeEvent }) => {
    const [progress, setProgress] = React.useState(false);
    const [comments, setComments] = React.useState([]);
    const maxCharacterLimit = 500;
    const [snackbar, setSnackbar] = React.useState({
        show: false,
        status: "",
        message: "",
    });
    const toggleSnackbar = (value) => {
        setSnackbar(value);
    };

    const validationSchema = Yup.object().shape({
        comment: Yup.string().required('Comment is required').max(maxCharacterLimit, 'Comment exceeds character limit for required comment')
    });

    const initialValues = {
        comment: ''
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: () => {
            handleAddComment();
        }
    });

    const handleAddComment = async () => {
        try {
            setProgress(true);
            const res = await fetcher.post(`deqc/ticket-comments/add`, { fileId: ticketDetails.id, comment: formik.values.comment });
            if (res.status === 200) {
                fetchComments();
                formik.setValues(initialValues);
            } else {
                setSnackbar({
                    show: true,
                    status: 'error',
                    message: res.response
                });
            }
        } catch (err) {
            console.log(err);
        } finally {
            setProgress(false);
        }
    };

    const fetchComments = async () => {
        const res = await fetcher.get(`deqc/ticket-comments/view?fileId=${ticketDetails.id}`);
        if (res?.status === 200) {
            setComments(res.response);
        }
    };

    useEffect(() => {
        fetchComments();
        formik.validateForm();
    }, []);

    return (
        <>
            <SnackBar {...snackbar} onClose={toggleSnackbar} />
            <div className="createMainTitle">
                <h2>Comments</h2>
                <IconButton onClick={closeEvent}>
                    <CloseIcon />
                </IconButton>
            </div>

            <div className={style.commentsList}>
                {comments.map((comment, index) =>
                    <CommentArticle comment={comment} key={index} />
                )}
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className={style.commentForm}>
                    <div className="form-group">
                        <textarea
                            name="comment"
                            onChange={formik.handleChange}
                            value={formik.values.comment}
                            className="form-control"
                            placeholder="Please type your comments"
                        ></textarea>
                    </div>
                    <div className="d-flex justify-content-between">
                        {formik.errors.comment ? (
                            <div className={style.textlength}>{formik.errors.comment}</div>
                        ) : <div className={style.textlength}>
                            <strong>{maxCharacterLimit - formik.values.comment.length}</strong> character remaining
                        </div>
                        }
                        <button type="submit" className='btn btn-primary' disabled={!formik.isValid || progress}>Comment</button>
                    </div>
                </div>
            </form>

        </>
    )
}

export default TicketComments;