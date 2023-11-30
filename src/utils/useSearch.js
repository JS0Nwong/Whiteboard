import { useEffect, useState } from "react";

export default function useSearch(data, searchTerm) {
  useEffect(() => {
    getFilters(searchTerm);
  }, [searchTerm]);

  const getFilters = (search) => {
    if (search.match(/[:]/g)) {
      search.split(":");
      setFilter(search.split(":")[0]);
      setQuery(search.split(":")[1]);

      filter.toLowerCase() == "task" ? filterTasks(query) : filterLabels(query);
    } else {
      filterAll(search);
    }
  };

  const filterTasks = (query) => {
    var dataClone = structuredClone(data);
    for (const keys in dataClone) {
      Object.assign(dataClone, {
        [keys]: {
          ...dataClone[keys],
          tasks: dataClone[keys].tasks.filter((task) =>
            task.task.toLowerCase().includes(query.toLowerCase())
          ),
        },
      })[dataClone];
    }
    setFilteredData(dataClone);
    setSearchParams({
      filterType: filter,
      filterQuery: query,
    });
  };

  function filterLabels(query) {
    const dataClone = structuredClone(data);
    for (const key in dataClone) {
      Object.assign(dataClone, {
        [key]: {
          ...dataClone[key],
          tasks: dataClone[key].tasks.filter((task) =>
            task.labels.some((label) =>
              label.label.toLowerCase().includes(query.toLowerCase())
            )
          ),
        },
      })[dataClone];
    }
    setFilteredData(dataClone);
    setSearchParams({
      filterType: filter,
      filterQuery: query,
    });
  }

  function filterAll(query) {
    // var dataClone = structuredClone(clone)
    // for(const keys in dataClone) {
    //     dataClone[keys].tasks.filter((label) => {
    //         label.labels.filter(
    //             (label) => label.label.toLowerCase() === search.toLowerCase()
    //         )
    //     })
    //     Object.assign(dataClone, {
    //         [keys]: {
    //             ...dataClone[keys],
    //             tasks: dataClone[keys].tasks.filter(
    //                 (task) => task.task.toLowerCase().includes(search.toLowerCase())
    //             )
    //         }
    //     })
    // }
    // setFilteredData(dataClone)
  }
}
