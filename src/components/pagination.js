import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-js-pagination';
import '../styles/pagination.css'

const Pagination = (props) => {
    const [activePage, setActivePage] = useState(props.activePage);
    const [totalItemsCount, setTotalItemsCount] = useState(props.totalItemsCount);

    useEffect(() => {
        setActivePage(props.activePage);
    }, [props.activePage]);
    useEffect(() => {
        setTotalItemsCount(props.totalItemsCount);
    }, [props.totalItemsCount]);

    const handlePageChange = (PageNumber) => {
        const { onPageChange } = props;
        setActivePage(PageNumber);
        onPageChange(PageNumber);
    }

    return (
        <ReactPaginate
            activePage={activePage}
            itemsCountPerPage={props.itemsCountPerPage}
            pageRangeDisplayed={props.pageRangeDisplayed || 5}
            totalItemsCount={totalItemsCount}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
        />
    )
}

export default Pagination;