import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import { Button, Modal } from "react-bootstrap";
import { isValidDate } from "../utils/utils";
import { currencyList } from "../asset/currencyList";
import { countryList } from "../asset/countryList";
import { jobTypeList } from "../asset/jobTypeList";
import { distanceList } from "../asset/distanceList";
import Category from "../asset/category";
import { placeholder } from "../asset/placeholder";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles/signup.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const firstColumnsHeader = [
  "Id",
  "Job Title",
  "Job Type",
  "Employer",
  "Location",
  "Salary",
];

const secondColumnsHeader = [
  "Distance",
  "Currency",
  "Show Employer",
  "Start",
  "Close",
];

const fixHtmlPdf = (text) =>
  text.replace(/[\u0100-\uffff]/g, function (ch) {
    switch (ch) {
      case "“":
      case "”�":
        return '"';
      case "’":
      case "‘":
        return "'";
      default:
        return "";
    }
  });

const InfoEditModal = (props) => {
  const htmlToPdfRef = useRef(null);
  const [show, setShow] = useState();
  const [showInput, setShowInput] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);
  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  const fieldTitle = _.zipObject(props.fileds, props.headers);

  const closeModal = () => {
    const { close } = props;
    setShow(false);
    close(show);
  };

  const clickEdit = (e) => {
    e.preventDefault();
    setShowInput(true);
  };

  const clickConfirm = (e) => {
    e.preventDefault();

    const { onEditConfirm } = props;
    setShowInput(!showInput);
    onEditConfirm(data);
  };

  const handleTextChange = (e, key, dataCk) => {
    const { onDataChange } = props;

    let tmp_data;
    if (dataCk || dataCk === "") {
      tmp_data = Object.assign(data, {
        [key]: dataCk,
      });
    } else {
      tmp_data = Object.assign(data, {
        [key]: e.target.value,
      });
    }
    setData(tmp_data);
    onDataChange(data);
  };

  const generatePDF = () => {
    const { fileds } = props;

    const doc = new jsPDF();
    const tableHeaders = _.compact(_.drop(fileds, 6), _.dropRight(fileds, 7));
    const tableValues = _.map(tableHeaders, (value) => {
      return data[value];
    });
    const firstTableHeaders = _.dropRight(fileds, 12);
    const firstTableValues = _.map(firstTableHeaders, (value) => {
      return data[value];
    });
    let finalY = doc.lastAutoTable.finalY; // The y position on the page
    let finalX = doc.lastAutoTable.finalX;

    autoTable(doc, {
      theme: "grid",
      styles: { overflow: "linebreak", textColor: [0, 0, 0] },
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
      columnStyles: { halign: "center" },
      head: [firstColumnsHeader],
      body: [firstTableValues],
      didParseCell: function (hookData) {
        if (
          hookData.cell.raw === "Id" ||
          hookData.cell.raw === "Salary" ||
          hookData.cell.raw === "Location" ||
          hookData.cell.raw === "Job Title" ||
          hookData.cell.raw === "Job Type" ||
          hookData.cell.raw === "Employer"
        ) {
          hookData.cell.styles.fillColor = [220, 220, 220];
        }
      },
    });

    autoTable(doc, {
      theme: "grid",
      styles: { overflow: "linebreak", textColor: [0, 0, 0] },
      margin: { top: finalY + 15, bottom: 0, left: 0, right: 0 },
      columnStyles: { halign: "center" },
      head: [secondColumnsHeader],
      body: [tableValues],
      didParseCell: function (hookData) {
        if (
          hookData.cell.raw === "Show Employer" ||
          hookData.cell.raw === "Close" ||
          hookData.cell.raw === "Start" ||
          hookData.cell.raw === "Distance" ||
          hookData.cell.raw === "Currency"
        ) {
          hookData.cell.styles.fillColor = [248, 248, 255];
        }
      },
    });

    doc.fromHTML(
      fixHtmlPdf(htmlToPdfRef.current.children[11].outerHTML) +
        fixHtmlPdf(htmlToPdfRef.current.children[12].outerHTML) +
        fixHtmlPdf(htmlToPdfRef.current.children[13].outerHTML) +
        fixHtmlPdf(htmlToPdfRef.current.children[14].outerHTML) +
        fixHtmlPdf(htmlToPdfRef.current.children[15].outerHTML) +
        fixHtmlPdf(htmlToPdfRef.current.children[16].outerHTML),
      20,
      40,
      {
        width: 170,
        margin: { top: finalY + 15, bottom: 0, left: 10, right: 10 },
      }
    );
    doc.save();
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={closeModal}
    >
      <Modal.Header
        closeButton
        onHide={closeModal}
        id="contained-modal-title-vcenter"
      >
        {props.modalHeader}
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={clickConfirm}>
          <div
            id="htmlTopdf"
            ref={htmlToPdfRef}
            className="content-general-info"
          >
            {showInput
              ? _.map(_.pick(data, props.fileds), (value, key) => {
                  if (
                    key === "id" ||
                    key === "expert_id" ||
                    key === "project_id" ||
                    key === "matching_id"
                  ) {
                    // readonly input
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <input
                          className="form-control"
                          readOnly
                          defaultValue={value}
                        />
                      </div>
                    );
                  } else if (key === "show_employer_name") {
                    // required select
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <select
                          className="form-control"
                          required
                          defaultValue={value}
                          onChange={(e) => this.handleTextChange(e, key)}
                        >
                          <option value="Y">Yes</option>
                          <option value="N">No</option>
                        </select>
                      </div>
                    );
                  } else if (key === "job_type") {
                    // required select
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <select
                          className="form-control"
                          required
                          defaultValue={value}
                          onChange={(e) => handleTextChange(e, key)}
                        >
                          {_.map(jobTypeList, (_item, _index) => {
                            return (
                              <option key={`job_type-${_index}`} value={_item}>
                                {_item}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    );
                  } else if (key === "currency") {
                    // required select
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <select
                          className="form-control"
                          required
                          defaultValue={value}
                          onChange={(e) => handleTextChange(e, key)}
                        >
                          {_.map(currencyList, (_item, _index) => {
                            if (_item === "") {
                              return (
                                <option
                                  key={`currency-${_index}`}
                                  value={_item}
                                >
                                  Please select
                                </option>
                              );
                            } else {
                              return (
                                <option
                                  key={`currency-${_index}`}
                                  value={_item}
                                >
                                  {_item}
                                </option>
                              );
                            }
                          })}
                        </select>
                      </div>
                    );
                  } else if (key === "nationality") {
                    // required select
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <select
                          className="form-control"
                          required
                          defaultValue={value}
                          onChange={(e) => handleTextChange(e, key)}
                        >
                          {_.map(countryList, (_item, _index) => {
                            if (_item === "") {
                              return (
                                <option
                                  key={`nationality-${_index}`}
                                  value={_item}
                                >
                                  Please select
                                </option>
                              );
                            } else {
                              return (
                                <option
                                  key={`nationality-${_index}`}
                                  value={_item}
                                >
                                  {_item}
                                </option>
                              );
                            }
                          })}
                        </select>
                      </div>
                    );
                  } else if (key === "distance") {
                    // required select
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <select
                          className="form-control"
                          required
                          defaultValue={value}
                          onChange={(e) => handleTextChange(e, key)}
                        >
                          {_.map(distanceList, (_item, _index) => {
                            if (_item === "") {
                              return (
                                <option
                                  key={`nationality-${_index}`}
                                  value={_item}
                                >
                                  Please select
                                </option>
                              );
                            } else {
                              return (
                                <option
                                  key={`nationality-${_index}`}
                                  value={_item}
                                >
                                  {_item}
                                </option>
                              );
                            }
                          })}
                        </select>
                      </div>
                    );
                  } else if (key === "start_date" || key === "close_date") {
                    // required date
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <input
                          type="date"
                          className="form-control"
                          required
                          defaultValue={
                            isValidDate(value)
                              ? new Date(value).toISOString().substr(0, 10)
                              : value
                          }
                          onChange={(e) => handleTextChange(e, key)}
                        />
                      </div>
                    );
                  } else if (
                    key === "job_title" ||
                    key === "location" ||
                    key === "employer" ||
                    key === "area" ||
                    key === "salary" ||
                    key === "title" ||
                    key === "first_name" ||
                    key === "last_name" ||
                    key === "email" ||
                    key === "expertise"
                  ) {
                    // required input
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <input
                          className="form-control"
                          required
                          placeholder={placeholder[key]}
                          defaultValue={value}
                          onChange={(e) => handleTextChange(e, key)}
                        />
                      </div>
                    );
                  } else if (key === "category") {
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <select
                          className="form-control"
                          required
                          defaultValue={value}
                          onChange={(e) => handleTextChange(e, key)}
                        >
                          {_.map(Category, (_item, _index) => {
                            if (_item === "") {
                              return (
                                <option
                                  key={`nationality-${_index}`}
                                  value={_item}
                                >
                                  Please select
                                </option>
                              );
                            } else {
                              return (
                                <option
                                  key={`nationality-${_index}`}
                                  value={_item}
                                >
                                  {_item}
                                </option>
                              );
                            }
                          })}
                        </select>
                      </div>
                    );
                  } else if (key === "phone_no" || key === "level") {
                    // non-required input
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <input
                          className="form-control"
                          placeholder={placeholder[key]}
                          defaultValue={value}
                          onChange={(e) => handleTextChange(e, key)}
                        />
                      </div>
                    );
                  } else {
                    // non-required textarea
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <CKEditor
                          editor={ClassicEditor}
                          config={{
                            placeholder: placeholder[key],

                            toolbar: [
                              "heading",
                              "|",
                              "bold",
                              "italic",
                              "blockQuote",
                              "link",
                              "numberedList",
                              "bulletedList",
                              "|",
                              "undo",
                              "redo",
                            ],
                          }}
                          data={value}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            handleTextChange(event, key, data);
                          }}
                        />
                      </div>
                    );
                  }
                })
              : _.map(_.pick(data, props.fileds), (value, key) => {
                  // if (key === 'employer' && data.show_employer_name === 'N') {
                  //     return null;
                  // } else
                  if (
                    key === "show_employer_name" ||
                    key === "application_complete" ||
                    key === "featured"
                  ) {
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <div className="newline-text">
                          {value === "Y" ? "Yes" : value === "N" ? "No" : value}
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={`modal-${key}`} className="columns-merge">
                        <h2>{fieldTitle[key]}</h2>
                        <div className="newline-text">
                          <div dangerouslySetInnerHTML={{ __html: value }} />
                        </div>
                      </div>
                    );
                  }
                })}
          </div>
          {props.allowEdit ? (
            showInput ? (
              <Button type="submit"> Save </Button>
            ) : (
              <Button onClick={clickEdit}> Edit </Button>
            )
          ) : null}
          <Button onClick={generatePDF}>Download</Button>
          {/* window.print */}
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default InfoEditModal;
