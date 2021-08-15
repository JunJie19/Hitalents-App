import React, { useState, useEffect } from "react";
import _ from "lodash";
import InfoEditModal from "./infoEditModal";
import ConfirmDeleteModal from "./confirmDeleteModal";

const ModalOpsRow = (props) => {
  const [showInfo, setShowInfo] = useState(false);
  const [selOption, setSelOption] = useState("");
  const [data, setData] = useState(props.rowData);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setData(props.rowData);
  }, [props.rowData]);

  const handleSelect = (e) => {
    if (e.target.value === "moreinfo") {
      setShowInfo(!showInfo);
    } else if (e.target.value === "delete") {
      setShowModal(true);
    }
  };

  const closeInfoHandler = (hide) => {
    setShowInfo(hide);
  };

  const handleDataChange = (data) => {
    setData(data);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const confirmDelete = () => {
    const { onRowDelete, dataIdentifier } = props;
    const id = data[dataIdentifier];

    onRowDelete(id);
    setShowModal(false);
  };

  return (
    <div className="database">
      <div className={`datatable_${props.useClass}`}>
        {_.map(_.pick(data, props.rowLessField), (value, key) => {
          return <label key={`row-${key}`}>{value}</label>;
        })}

        {props.role === "__admin__" ? (
          <select
            className="more-info-btn"
            value={props.selOption}
            onChange={handleSelect}
          >
            <option value="">Please Select</option>
            <option value="moreinfo">More info</option>
            <option value="delete">Delete</option>
          </select>
        ) : (
          <select
            className="more-info-btn"
            value={selOption}
            onChange={handleSelect}
          >
            <option value="">Please Select</option>
            <option value="moreinfo">More info</option>
          </select>
        )}
      </div>
      <ConfirmDeleteModal
        showModal={showModal}
        handleClose={handleClose}
        confirmDelete={confirmDelete}
      />
      <InfoEditModal
        show={showInfo}
        close={closeInfoHandler}
        allowEdit={props.role === "__admin__" ? true : false}
        onDataChange={props.role === "__admin__" ? handleDataChange : null}
        onEditConfirm={props.role === "__admin__" ? props.onEditConfirm : null}
        modalHeader={props.modalHeader}
        headers={props.rowMoreHeader}
        fileds={props.rowMoreField}
        data={data}
      />
    </div>
  );
};

export default ModalOpsRow;
