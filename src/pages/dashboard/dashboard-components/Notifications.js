import React from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import style from './../Dashboard.module.scss';
import userImg from '../../../assets/images/profileImg.jpg'; 

const Notifications = () => {
    return(
        <>
            <section className={`${style.whiteBox}`}>
                <div className={style.titleRow}>
                    <h2>Notifications</h2>
                </div>
                
                <div className={style.notificationListBox}>
                    <article className={`${style.notificationArticle} ${style.unreadNotification}`}>
                        <div className={`${style.notiArtImg} ${style.notiUserOnline}`}>
                            <img src={userImg} alt="" />
                        </div>
                        <div className={style.notiArtCont}>
                            <h3>Mohit Sethi</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mauris arcu, pulvinar in semper ut, rutrum euismod justo.</p>
                        </div>
                    </article>

                    <article className={`${style.notificationArticle} ${style.unreadNotification}`}>
                        <div className={style.notiArtImg}>
                            <img src={userImg} alt="" />
                        </div>
                        <div className={style.notiArtCont}>
                            <h3>Mohit Sethi</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mauris arcu, pulvinar in semper ut, rutrum euismod justo.</p>
                        </div>
                    </article>

                    <article className={`${style.notificationArticle}`}>
                        <div className={style.notiArtImg}>
                            <img src={userImg} alt="" />
                        </div>
                        <div className={style.notiArtCont}>
                            <h3>Mohit Sethi</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mauris arcu, pulvinar in semper ut, rutrum euismod justo.</p>
                        </div>
                    </article>
                </div>

                <div className={style.buttonLink}>
                    <button className="btn btn-default">All Notifications <KeyboardArrowRightIcon /></button>
                </div>
            </section>
        </>
    )
}

export default Notifications;