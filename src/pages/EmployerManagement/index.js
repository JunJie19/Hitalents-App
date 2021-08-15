import React, { useState, useEffect } from "react";
import { fetchReq } from "../../utils/utils";
import Search from "../../components/search";

const dataField = [
  "id",
  "title",
  "first_name",
  "last_name",
  "organization",
  "email",
  "phone_no",
  "nationality",
];

const EmployerManagement = (props) => {
  const [data, setData] = useState(null);
  const [filterData, setFilterData] = useState(null);

  useEffect(() => {
    fetchReq("/api/fetchEmployer")
      .then((data) => {
        setData(data);
        setFilterData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const filterDataHandler = (filterData) => {
    setFilterData(filterData);
  };

  return (
    <div className="database">
      <div className="search">
        <Search
          fullData={data}
          dataFilterableField={dataField}
          filterDataHandler={filterDataHandler}
        />
      </div>

      <div className="dataheader_expert"></div>
    </div>
  );
};

export default EmployerManagement;
