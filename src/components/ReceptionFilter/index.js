import React, { useState } from 'react';
import './ReceptionFilter.css';
import { FaPlusSquare, FaTrash } from 'react-icons/fa';

const ReceptionFilter = (props) => {
  const { sort, setSort, setDateFilter, filterByDate, initialData, setData } =
    props;
  const [showDateFilter, setShowDateFilter] = useState(false);

  const clearSortAndFilter = () => {
    setShowDateFilter(false);
    setDateFilter({});
    setSort({});
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
            <button id="dateFilterConfirmBtn" onClick={() => filterByDate()}>
              Filter
            </button>
            <button
              id="clearDateFilterBtn"
              onClick={() => clearSortAndFilter()}
            >
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
          onChange={({ target }) =>
            setSort((oldSort) => ({ ...oldSort, sortParam: target.value }))
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
            onChange={({ target }) =>
              setSort((oldSort) => ({ ...oldSort, order: target.value }))
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
