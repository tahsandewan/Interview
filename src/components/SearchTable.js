import React, { useState, useEffect, Fragment,useCallback } from 'react';

import "./TableStyle.css";
import { connect } from "react-redux";
import { dataFetch } from "../actions/searchAction"
import useDebounce from "./useDebounce";

const SearchTable = (props) => {
    useEffect(() => {
        props.dataFetch(dataPerPage, "")

    }, []);
    const [search, setSearch] = useState("");
    const [dataPerPage, setDataPerPage] = useState(10);
    const [debounceVal, setDebounceVal] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(props.data?.total / dataPerPage);
    const startIndex = (currentPage - 1) * dataPerPage;
    const endIndex = startIndex + dataPerPage;

    const onPageChange = (page) => {
        setDataPerPage(page)
        props.dataFetch(page, search)

    }
    const setSearchUser = (text) => {
        setSearch(text.toLowerCase())
        debouncedSearch(text);
        // props.dataFetch(dataPerPage, text.toLowerCase())

    }
    const handleClear = () => {
        setSearch("")
        props.dataFetch(dataPerPage, "")

    }
    const goToPage = (page) => {
        setCurrentPage(page)
        props.dataFetch(dataPerPage, "", page)

    }
    const totalData = props?.data?.total;
    const startData = (currentPage - 1) * dataPerPage + 1;
    const endData = Math.min(currentPage * dataPerPage, totalData);
    const debouncedSearch = useDebounce((value) => {
        props.dataFetch(dataPerPage, value.toLowerCase())
        console.log("Searching for:", value);
      }, 500);
    
    return (
        <div className="table-container">
            <div className='inpur_search'>
                <input
                    type="text"
                    placeholder="Search area"
                    className="search-input"
                    value={search}
                    onChange={(e) => {setSearchUser(e.target.value)}}
                />
                {search && (
                    <button onClick={handleClear} style={{ marginLeft: '10px' }}>
                        Clear
                    </button>
                )}
            </div>
            <table className="custom-table">
                {!props.dataLoader?<Fragment>
                    
                        <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!props.dataLoader && props.data?.data?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.name.split(" ")[0]}</td>
                                <td>{item?.name.split(" ")[1]}</td>
                                <td>{item.email}</td>
                                <td>{new Date(item.created_at).toLocaleDateString()}</td>
    
                            </tr>
                        ))}
    
                    </tbody>
                    
                </Fragment>
                
                   : <div className="loader-container">
                        <div className="loader"></div>
                    </div> 

                    }

            </table>
            <div className="pagination">
                <div className="rows-per-page">
                    <label>Rows per page</label>
                    <select
                        value={dataPerPage}
                        onChange={(e) => onPageChange(Number(e.target.value))}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
                <div className="row-info">
                    {startData}-{endData} of {totalData}
                </div>
                <div className="pagination-controls">

                    <button
                        className="pagination-button"
                        onClick={() => goToPage(1)}
                        disabled={currentPage === 1}
                    >
                        {"<<"}
                    </button>
                    <button
                        className="pagination-button"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        {"<"}
                    </button>
                    <button
                        className="pagination-button"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        {">"}
                    </button>
                    <button
                        className="pagination-button"
                        onClick={() => goToPage(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        {">>"}
                    </button>
                </div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => ({
    data: state.userData.data,
    dataLoader: state.userData.datafetchLoading,


});

const mapDispatchToProps = (dispatch) => ({
    dataFetch: (paginate, text, page) => dispatch(dataFetch(paginate, text, page)),

});

export default connect(mapStateToProps, mapDispatchToProps)(SearchTable);

