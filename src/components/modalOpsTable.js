import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import ModalOpsRow from '../components/modalOpsRow';

const ModalOpsTable = (props) => {

    const [data, setData] = useState(props.data);
    const [sortKey, setSortKey] = useState(props.sortKey);
    const [sortOrder, setSortOrder] = useState(props.sortOrder);
    //const [lessFieldTitle, setLessFieldTitle] = useState();

    const lessFieldTitle = () => _.zipObject(props.rowLessField, props.rowLessHeader);

    useEffect(() => {
        setData(props.data);
    }, [props.data]);
    useEffect(() => {
        setSortKey(props.sortKey);
    }, [props.sortKey]);
    useEffect(() => {
        setSortOrder(props.sortOrder);
    }, [props.sortOrder]);

    return (
        <div className='table-box'>
            <div className={`dataheader_${props.useClass}`}>
                {
                    data && data[0] ?
                        _.map(_.pick(lessFieldTitle, _.keys(data[0])), (value, key) => {
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
                _.map(data, (item, index) => {
                    return <ModalOpsRow
                        useClass={props.useClass}
                        role={props.role}
                        key={`dataRow-${index}`}
                        rowData={item}
                        dataIdentifier={props.dataIdentifier}
                        rowLessField={props.rowLessField}
                        rowMoreField={props.rowLessField.concat(props.rowMoreField)}
                        rowMoreHeader={props.rowLessHeader.concat(props.rowMoreHeader)}
                        onRowDelete={props.role === '__admin__' ? props.onRowDelete : null}
                        onEditConfirm={props.role === '__admin__' ? props.onEditConfirm : null}
                        modalHeader={props.modalHeader}
                    />
                })
            }

        </div>
    );
}

export default ModalOpsTable;