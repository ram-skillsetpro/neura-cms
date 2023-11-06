import React from "react"
import style from './../Dashboard.module.scss';

const NewLeads = () => {
    return(
        <> 
            <section className={`${style.whiteBox}`}>
                <div className={style.titleRow}>
                    <h2>New Leads</h2>
                </div> 
                
                <div className={style.Leadslist}>
                    <ul>
                        <li>Fruit2Go</li>
                        <li>Marshall's MKT</li>
                        <li>CCNT</li>
                        <li>Joana Mini-market</li>
                        <li>Little Brazil Vegan</li>
                        <li>Target</li>
                        <li>Organic Place</li>
                        <li>Morello's</li>
                    </ul>
                </div> 
            </section> 
        </>
    )
}

export default NewLeads;