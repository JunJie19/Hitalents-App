import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import { Modal } from 'react-bootstrap';
import jsPDF from 'jspdf';


const TableModal = (props) => {
    const [show, setShow] = useState(props.show);
    const [tableData, setTableData] = useState(props.tableData);

    const tableFieldTitle = _.zipObject(props.rowField, props.rowHeader);

    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    useEffect(() => {
        setTableData(props.tableData);
    }, [props.tableData]);

    const closeModal = () => {
        const { onClose } = props;
        setShow(false);
        onClose(false);
    }

    const generatePDF = (index) => {
        const { downloadField, downloadHeader } = props;

        const pdf = new jsPDF('p', 'in', 'letter');
        const pageHeight = pdf.internal.pageSize.height;
        const margin = 0.5;
        const size = 12;
        let curLines = [];
        let lastLine = pdf.splitTextToSize('', 7.5);
        let longStr = ''
        let verticalOffset = margin;

        let contents = [];
        const downloadFieldTitle = _.zipObject(downloadField, downloadHeader);
        
        _.forEach(downloadField, (key, i) => {
            contents.push(downloadFieldTitle[key] + ': \n' + tableData[index][key] || '')

            longStr = contents.join('\n\n')

            curLines = pdf.splitTextToSize(longStr, 7.5)
            verticalOffset = verticalOffset + (curLines.length + 0.5) * size / 72


            if (verticalOffset > pageHeight) {
                if (i === downloadField.length - 1) {
                    pdf.text(0.5, margin + size / 72, curLines)
                } else {
                    pdf.text(0.5, margin + size / 72, lastLine)

                    pdf.addPage();
                    verticalOffset = margin // Restart height position
                    contents = [downloadFieldTitle[key] + ': \n' + tableData[index][key] || '']
                }
            } else {
                if (i === downloadField.length - 1) {
                    pdf.text(0.5, margin + size / 72, curLines)
                } else {
                    lastLine = curLines
                }
            }
        })

        const fileName = tableData[index][downloadField[2]] + tableData[index][downloadField[3]] + '.pdf'
        pdf.save(fileName)
    }

    return (
        <Modal show={show} onHide={closeModal} size='xl'>
            <Modal.Header closeButton onHide={closeModal}>Job Matching</Modal.Header>
            <Modal.Body>
                <div id='htopdf' className="dataheader_expert">
                    {
                        tableData && tableData[0] ?
                            _.map(_.pick(tableFieldTitle, _.keys(tableData[0])), (value, key) => {
                                return <h6 key={`dataHeader-${key}`}>{value}</h6>
                            })
                            : null
                    }
                </div>

                {
                    _.map(tableData, (item, index) => {
                        return (
                            <div key={`tableModalRow-${index}`} className='database'>
                                <div id='HtoPdf' className="datatable_expert">
                                    {
                                        _.map(_.pick(item, props.rowField), (_value, _key) => {
                                            return <label key={`row-${_key}`}>{_value}</label>
                                        })

                                    }
                                    <button onClick={() => generatePDF(index)} className='more-info-btn'>Download</button>
                                </div>
                            </div>
                        )
                    })
                }
            </Modal.Body>
        </Modal>
    );
}

export default TableModal;