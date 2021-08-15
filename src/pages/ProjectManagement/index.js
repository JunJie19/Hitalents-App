import React, { useState, useEffect } from "react";
import _ from "lodash";
import { fetchReq } from "../../utils/utils";
import Search from "../../components/search";
import ModalOpsTable from "../../components/modalOpsTable";
import AddProjectModal from "../../components/addProjectModal";
import Pagination from "../../components/pagination";
import { itemsCountPerPage, sliceData } from "../../asset/paginationConfig";
import {
  projectDataLessField,
  projectDataLessHeader,
  projectDataMoreField,
  projectDataMoreHeader,
} from "../../asset/dataFieldHeader";
import ReactGA from "react-ga";

const ProjectManagement = (props) => {
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [displayData, setDisplayData] = useState(null);
  const [sortKey, setSortKey] = useState("project_id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [activePage, setActivePage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    receiveUpdateData();
  }, []);

  const receiveUpdateData = () => {
    fetchReq("/api/fetchProject/all")
      .then((data) => {
        const [totalItemsCount, slice] = sliceData(data, offset);
        setData(data);
        setFilterData(data);
        setTotalItemsCount(totalItemsCount);
        setDisplayData(slice);
      })
      .catch((err) => alert(err));
  };

  const filterDataHandler = (filterData) => {
    const [totalItemsCount, slice] = sliceData(filterData, offset);
    setTotalItemsCount(totalItemsCount);
    setFilterData(filterData);
    setDisplayData(slice);
  };

  const handlePageClick = (pageNumber) => {
    const pageIndex = pageNumber - 1;
    const offset = pageIndex * itemsCountPerPage;
    setActivePage(pageNumber);
    setOffset(offset);
    const [totalItemsCount, slice] = sliceData(filterData, offset);
    setTotalItemsCount(totalItemsCount);
    setDisplayData(slice);
  };

  const rowDeleteHandler = (id) => {
    const url = `/api/deleteProject/${id}`;
    fetchReq(url)
      .then((feedback) => {
        _.remove(data, (item, index) => {
          return item["project_id"] === id;
        });
        _.remove(filterData, (item, index) => {
          return item["project_id"] === id;
        });
        setData(data);
        setFilterData(filterData);
        const [totalItemsCount, slice] = sliceData(filterData, offset);
        setTotalItemsCount(totalItemsCount);
        setDisplayData(slice);
      })
      .catch((err) => alert(err));
  };

  const handleToggleAdd = () => {
    setShowAdd(!showAdd);
  };

  const closeAddHandler = (hide) => {
    setShowAdd(hide);
  };

  const addHandler = (obj) => {
    fetchReq("/api/addProject", {
      body: JSON.stringify({
        record: obj,
      }),
    })
      .then((feedback) => {
        setShowAdd(false);
        receiveUpdateData();
      })
      .catch((err) => alert(err));
  };

  const editConfirmHandler = (record) => {
    fetchReq("/api/editProject", {
      body: JSON.stringify({
        record,
      }),
    })
      .then((feedback) => {})
      .catch((err) => alert(err));
  };

  const sortTableHandler = (key) => {
    const order =
      key === sortKey
        ? _.filter(["desc", "asc"], (o) => o !== sortOrder)[0]
        : "desc";
    const temp_data = _.orderBy(filterData, key, order);
    setFilterData(temp_data);
    setSortKey(key);
    setSortOrder(order);
    const [totalItemsCount, slice] = sliceData(filterData, offset);
    setTotalItemsCount(totalItemsCount);
    setDisplayData(slice);
  };

  return (
    <div className="database">

        <div className="search">
            <Search
                fullData={data}
                dataFilterableField={projectDataLessField.concat(projectDataMoreField)}
                filterDataHandler={filterDataHandler}
            />
            {props.role === '__admin__' ? <button className="search-btn" onClick={handleToggleAdd}>Add</button> : null}
        </div>
        <AddProjectModal show={showAdd} close={closeAddHandler} onAdd={addHandler} />

        <ModalOpsTable
            useClass={'project'}
            data={displayData}
            dataIdentifier={'project_id'}
            rowLessField={projectDataLessField}
            rowMoreField={projectDataMoreField}
            rowLessHeader={projectDataLessHeader}
            rowMoreHeader={projectDataMoreHeader}
            onRowDelete={rowDeleteHandler}
            onEditConfirm={editConfirmHandler}
            onSortTable={sortTableHandler}
            sortKey={sortKey}
            sortOrder={sortOrder}
            modalHeader={'Project Info'}
            role={props.role}
        />
        <hr />
        <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={totalItemsCount}
            onPageChange={handlePageClick}
        />

    </div>
)
};

export default ProjectManagement;
