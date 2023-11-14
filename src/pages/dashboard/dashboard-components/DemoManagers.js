import React from "react";
import style from './../Dashboard.module.scss';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import userImg from '../../../assets/images/profileImg.jpg'; 

const DemoManagers = () => {
    const managerItems = [
        {image: userImg, name: 'Mohit Sethi', date: '23 Oct 2023 | 5 pm', company: 'Delhivery'},
        {image: userImg, name: 'Mohit Sethi', date: '23 Oct 2023 | 5 pm', company: 'Delhivery'},
        {image: userImg, name: 'Mohit Sethi', date: '23 Oct 2023 | 5 pm', company: 'Delhivery'},
    ]; 
    return(
        <>
            <section className={`${style.whiteBox}`}>
                <div className={style.titleRow}>
                    <h2>Demo Manager</h2>
                    <div className={style.sortDropdown}>
                        <label>Sort by:</label>
                        <select className="form-control">
                            <option>Newest</option>
                        </select>
                    </div>
                </div>

                <div className={style.demoManagers}>
                    {managerItems.map((item, index) => 
                        <article className={style.demoManArticle}>
                            <div className={style.demoArtImg}>
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className={style.demoArtCont}>
                                <h3>{item.name}</h3>
                                <p>{item.date}</p>
                                <p className={style.compName}>
                                    {item.company}
                                </p>
                            </div>
                            <div className={style.demoArtAction}>

                            </div>
                        </article>
                    )}
                </div> 

                <div className={style.buttonLink}>
                    <button className="btn btn-default">All Managers <KeyboardArrowRightIcon /></button>
                </div>
            </section>        
        </>
    )
}

export default DemoManagers;