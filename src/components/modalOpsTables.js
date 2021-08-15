import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import TableModal from './tableModal';

const ModalOpsTables = (props) => {
    const [outerData, setOuterData] = useState(props.outerData);
    const [innerData, setInnerData] = useState(props.innerData);
    const [showInfo, setShowInfo] = useState(false);
    const [sortKey, setSortKey] = useState(props.sortKey);
    const [sortOrder, setSortOrder] = useState(props.sortOrder);

    const tableFieldTitle = _.zipObject(props.outerLessField, props.outerLessHeader);

    useEffect(() => {
        setOuterData(props.outerData);
    }, [props.outerData]);
    useEffect(() => {
        setOuterData(props.innerData);
    }, [props.innerData]);
    useEffect(() => {
        setOuterData(props.sortKey);
    }, [props.sortKey]);
    useEffect(() => {
        setOuterData(props.sortOrder);
    }, [props.sortOrder]);

    const handleToggleShow = (id) => {
        const { onRowClick } = props;
        setShowInfo(true);
        onRowClick(id);
    }

    const closeModalHandler = (hide) => {
        setShowInfo(hide);
    }

    return (
        <div className='table-box'>
            <div className="dataheader_project_matching">
                {
                    outerData && outerData[0] ?
                        _.map(_.pick(tableFieldTitle, _.keys(outerData[0])), (value, key) => {
                            return <h6 key={`dataHeader-${key}`} className="dataheader-title" onClick={() => props.onSortTable(key)}>
                                <span>{value}</span>
                                {sortKey === key ? 
                                    (sortOrder === 'asc' ? 
                                        <i className="fa fa-sort-asc" aria-hidden="true"></i> :
                                        <i className="fa fa-sort-desc" aria-hidden="true"></i>)
                                : null}
                            </h6>
                        })
                        : null
                }
            </div>

            {
                _.map(outerData, (item, index) => {
                    return (
                        <div key={`outerTableRow-${index}`} className='database'>
                            <div className="datatable_project_matching">
                                {
                                    _.map(_.pick(item, props.outerLessField), (_value, _key) => {
                                        return <label key={`row-${_key}`}>{_value}</label>
                                    })
                                }
                                <button className='more-info-btn' onClick={() => handleToggleShow(item[props.outerDataIdentifier])}> More Info</button>
                            </div>
                        </div>
                    )
                })
            }
            <TableModal
                key={`row-more-info`}
                rowHeader={props.innerLessHeader}
                rowField={props.innerLessField}
                downloadField={props.innerMoreField}
                downloadHeader={props.innerMoreHeader}
                tableData={innerData}
                onClose={(hide) => closeModalHandler(hide)}
                show={showInfo}
            />
        </div>

    );
}

export default ModalOpsTables;

