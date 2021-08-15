import React, { useState, useEffect } from "react";
import _ from "lodash";
import InputRange from "./inputRange";

const FilterGroup = (props) => {
  const [objFilter, setObjFilter] = useState({});

  useEffect(() => createNumberRangeKeyForState(), []);
  const createNumberRangeKeyForState = () => {
    const { groupFilterField } = props;

    let obj = {};
    const numObj = _.filter(groupFilterField, (o) => {
      return o.type === "number";
    });
    const enumObj = _.filter(groupFilterField, (o) => {
      return o.type === "enumerate";
    });

    _.forEach(numObj, (o) => {
      obj[o.field] = { min: 0, max: 500000 };
    });

    _.forEach(enumObj, (o) => {
      obj[o.field] = "";
    });
    console.log('objFilter', obj);
    setObjFilter(obj);
  };

  const handleFilterChange = (value, key) => {
    setObjFilter((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    console.log('ahhhh', value, key)
    groupSearch();
  };

  const groupSearch = () => {
    const { fullData, filterDataHandler } = props;

    const filteredData = _.filter(fullData, (item) => {
      let condition = true;

      _.forEach(objFilter, (v, k) => {
        if (_.has(v, "min")) {
          const num = _.parseInt(item[k]);
          condition = condition && num >= v.min && num <= v.max;
        } else {
          const str = item[k];
          if (v !== "") {
            condition = condition && str === v;
          }
        }
      });
      return condition;
    });

    filterDataHandler(filteredData);
  };
  return (
    <form className="filter-form">
      <div className="controls">
        <div className="row">
          {_.map(props.groupFilterField, (item, index) => {
            if (item.type === "number") {
              return (
                <div
                  key={`filter-group-${index}`}
                  className="col-md-6 col-sm-12"
                  style={{ paddingRight: 0, paddingLeft: 0 }}
                >
                  <div className="form-group">
                    <label>{item.header}</label>
                    <InputRange
                      maxValue={500000}
                      minValue={0}
                      step={500}
                      onChange={(value) =>
                        setObjFilter((prevState) => ({
                          ...prevState,
                          [item.field]: value,
                        }))
                      }
                      onChangeComplete={(value) =>
                        handleFilterChange(value, item.field)
                      }
                      value={objFilter[item.field]}
                    />
                  </div>
                </div>
              );
            } else if (item.type === "enumerate") {
              return (
                <div
                  key={`filter-group-${index}`}
                  className="col-md-3 col-sm-12"
                >
                  <div className="form-group">
                    <label>{item.header}</label>
                    <select
                      className="form-control"
                      defaultValue=""
                      required
                      onChange={(e) =>
                        handleFilterChange(e.target.value, item.field)
                      }
                    >
                      <option value="">All</option>
                      {_.map(item.options, (_item, _index) => {
                        return (
                          <option key={`${item.field}-${_index}`} value={_item}>
                            {_item}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </form>
  );
};

export default FilterGroup;
