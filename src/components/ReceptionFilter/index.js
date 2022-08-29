import React, { useState } from 'react';
import './ReceptionFilter.css';
import { FaPlusSquare, FaTrash } from 'react-icons/fa';

const ReceptionFilter = (props) => {
  const {
    sort,
    setSort,
    setDateFilter,
    dateFilterFunction,
    initialData,
    setData,
  } = props;
  const [showDateFilter, setShowDateFilter] = useState(false);

  const clearFunction = () => {
    setShowDateFilter(false);
    setDateFilter({});
    setData(initialData);
  };

  return (
    <div id="filter">
      <div id="dateFilter">
        {showDateFilter ? (
          <>
            <div id="dateFilterInputs">
              <input
                type="date"
                className="inputField"
                onChange={(e) =>
                  setDateFilter((oldDateFilter) => ({
                    ...oldDateFilter,
                    from: e.target.value,
                  }))
                }
              />
              <input
                type="date"
                className="inputField"
                onChange={(e) =>
                  setDateFilter((oldDateFilter) => ({
                    ...oldDateFilter,
                    to: e.target.value,
                  }))
                }
              />
            </div>
            <button
              id="dateFilterConfirmBtn"
              onClick={() => dateFilterFunction()}
            >
              Filter
            </button>
            <button id="clearDateFilterBtn" onClick={() => clearFunction()}>
              <FaTrash />
            </button>
          </>
        ) : null}
        {!showDateFilter ? (
          <button id="dateFilterBtn" onClick={() => setShowDateFilter(true)}>
            <FaPlusSquare />
          </button>
        ) : null}
      </div>
      <div id="sort">
        <select
          className="inputField"
          onChange={(e) =>
            setSort((oldSort) => ({ ...oldSort, sortParam: e.target.value }))
          }
        >
          <option value="" hidden>
            Choose Filter
          </option>
          <option value="patient_name">Name</option>
          <option value="appointment_time">Date</option>
          <option value="doctorId">Doctor</option>
        </select>
        {sort.sortParam ? (
          <select
            className="inputField sortOrder"
            defaultValue="ascending"
            onChange={(e) =>
              setSort((oldSort) => ({ ...oldSort, order: e.target.value }))
            }
          >
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        ) : null}
      </div>
    </div>
  );
};

export default ReceptionFilter;
