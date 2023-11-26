import React, { useEffect, useState} from "react";
import style from './../Dashboard.module.scss';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import userImg from '../../../assets/images/profileImg.jpg';
import { longToDate } from "../../../utils/utility";
import { TablePagination } from "@mui/material";

const DemoManagers = ({salesManagers}) => {
    const [displayManagers, setDisplayManagers] = useState([]);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(4);

    const fetchDisplayedManagers = () => {
        const displayedManagers = salesManagers.slice(
          currentPage * rowsPerPage,
          currentPage * rowsPerPage + rowsPerPage
        );
        setCount(salesManagers.length);
        setDisplayManagers(displayedManagers);
    }

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setCurrentPage(0);
    };

    useEffect(() => {
        console.log(salesManagers);
        fetchDisplayedManagers();
    }, [currentPage, salesManagers, rowsPerPage]);

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
                    {displayManagers.map((item, index) => 
                        <article className={style.demoManArticle}>
                            <div className={style.demoArtImg}>
                                <img src={userImg} alt={item.userName} />
                            </div>
                            <div className={style.demoArtCont}>
                                <h3>{item.userName}</h3>
                                <p>{longToDate(item.createdOn)}</p>
                                <p className={style.compName}>
                                    {item.email}
                                </p>
                            </div>
                            <div className={style.demoArtAction}>

                            </div>
                        </article>
                    )}
                </div> 
                <div className={style.buttonLink}>
                    {/* <button className="btn btn-default">All Managers <KeyboardArrowRightIcon /></button> */}
                    <TablePagination
                        rowsPerPageOptions={[4, 8]}
                        component="div"
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={currentPage}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </section>        
        </>
    )
}

export default DemoManagers;