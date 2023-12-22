import React, { useEffect, useState } from "react";
import style from './../Dashboard.module.scss';
import fetcher from "../../../utils/fetcher";
import LineChart from "../../shared/LineChart";

const ChartLeadGenerated = () => {

    const [data, setData] = useState({});

    const fetchLeadCount = async () => {
        const res = await fetcher.get(`weak-wise-lead-count`);
        setData(res.response);
    };

    useEffect(() => {
        fetchLeadCount();
    }, []);

    return(
        <>
            <section className={`${style.whiteBox}`}>
                <div className={style.titleRow}>
                    <h2>Leads Generated</h2>
                </div>
 
                <div className={style.graphArea}>
                    <LineChart data={data} />
                </div>
            </section>        
        </>
    )
}

export default ChartLeadGenerated;