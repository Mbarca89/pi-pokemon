import React from "react";
import style from './Home.module.css'

const Pagination = ({totalCards,currentPage,nextPage,prevPage,firstPage,lastPage,showJump}) => {
    
    const cardsPerPage = 12
    let pages = []
    for(let i = 1; i<=Math.ceil(totalCards / cardsPerPage);i++){
        pages.push(i)
    }
    return (
        <div className={style.pagination}>
            <button className={style.arrow} onClick={firstPage}>1</button>
            <button className={style.button} onClick={prevPage}>Anterior</button>
            <button className={style.current} onClick={showJump}>{currentPage}</button>
            <button className={style.button} onClick={nextPage}>Siguiente</button>
            <button className={style.arrow} onClick={lastPage}>{Math.ceil(totalCards / cardsPerPage)}</button>            
        </div>
    )
}

export default Pagination