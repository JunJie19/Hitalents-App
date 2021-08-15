import React, { useState, useEffect } from "react";
import _ from "lodash";
import { fetchReq } from "../../utils/utils";
import Search from "../../components/search";
import ModalOpsTables from "../../components/modalOpsTables";
import Pagination from "../../components/pagination";
import { itemsCountPerPage, sliceData } from "../../asset/paginationConfig";
import {
  projectMatchingDataLessField,
  projectMatchingDataLessHeader,
  expertDataLessField,
  expertDataLessHeader,
  expertDataMoreField,
  expertDataMoreHeader,
} from "../../asset/dataFieldHeader";
import ReactGA from "react-ga";

const ProjectMatching = () => {
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [displayData, setDisplayData] = useState(null);
  const [innerData, setInnerData] = useState(null);
  const [sortKey, setSortKey] = useState("matching_id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [activePage, setActivePage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
    fetchReq("/api/fetchProjectMatching")
      .then((data) => {
        const [totalItemsCount, slice] = sliceData(data, offset);
        setData(data);
        setFilterData(data);
        setTotalItemsCount(totalItemsCount);
        setDisplayData(slice);
      })
      .catch((err) => alert(err));
  }, []);

  const filterDataHandler = (filterData) => {
    const [totalItemsCount, slice] = sliceData(filterData, offset);

    setTotalItemsCount(totalItemsCount);
    setFilterData(filterData);
    setDisplayData(slice);
  };

  const rowClickHandler = (project_id) => {
    const url = `/api/fetchProjectExpert/${project_id}`;
    fetchReq(url)
      .then((data) => {
        setInnerData(data);
      })
      .catch((err) => alert(err));
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
          dataFilterableField={projectMatchingDataLessField}
          filterDataHandler={filterDataHandler}
        />
      </div>

      <ModalOpsTables
        outerLessHeader={projectMatchingDataLessHeader}
        outerLessField={projectMatchingDataLessField}
        innerLessHeader={expertDataLessHeader}
        innerLessField={expertDataLessField}
        innerMoreHeader={expertDataLessHeader.concat(expertDataMoreHeader)}
        innerMoreField={expertDataLessField.concat(expertDataMoreField)}
        outerData={displayData}
        onSortTable={sortTableHandler}
        sortKey={sortKey}
        sortOrder={sortOrder}
        outerDataIdentifier={'project_id'}
        onRowClick={rowClickHandler}
        innerData={innerData}
      />

      <hr />
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        onPageChange={handlePageClick}
      />
    </div>
  );
};

export default ProjectMatching;
