import React, { useState } from "react";
import FilterGroup from "./filterGroup";
import _ from "lodash";

import "../styles/search.css";

const Search = (props) => {
  const [filterInput, setFilterInput] = useState("");
  const [firstInit, setFirstInit] = useState(true);
  const [groupResults, setGroupResults] = useState(null);

  const handleGlobalFilterChange = (e) => {
    const { fullData } = props;
    const value = e.target.value || "";
    setFilterInput(value);
    setGroupResults(firstInit ? fullData : groupResults);
    setFirstInit(false);
    finalSearch();
  };

  const globalSearch = () => {
    const { fullData, dataFilterableField } = props;

    const filteredData = _.filter(fullData, (item) => {
      let condition = false;

      _.forEach(dataFilterableField, (_item, _index) => {
        condition =
          condition ||
          (item[_item] &&
            item[_item]
              .toString()
              .toLowerCase()
              .includes(filterInput.toLowerCase()));
      });
      return condition;
    });

    return filteredData;
  };

  const groupSearch = (groupResults) => {
    setGroupResults(groupResults);
    setFirstInit(false);
    finalSearch();
  };

  const finalSearch = () => {
    const { filterDataHandler, showGroupFilter, intersectionByKey } = props;

    const globalResults = globalSearch();

    if (showGroupFilter) {
      const finalResults = _.intersectionBy(
        globalResults,
        groupResults,
        intersectionByKey
      );
      filterDataHandler(finalResults);
    } else {
      filterDataHandler(globalResults);
    }
  };
  return (
    <div className="filters disp-c">
      <input
        className="filter-input"
        value={filterInput}
        onChange={handleGlobalFilterChange}
        placeholder={props.placeholder || "Global search"}
      />
      {props.showGroupFilter ? (
        <FilterGroup
          fullData={props.fullData}
          groupFilterField={props.groupFilterField}
          filterDataHandler={groupSearch}
        />
      ) : null}
    </div>
  );
};

export default Search;
