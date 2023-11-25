import { useEffect, useState } from "react";

export default function useSearch(data, searchTerm) {
  function getFilters(search) {
    if (search.match(/[:]/g)) {
      search.split(":");
      setFilter(search.split(":")[0]);
      setQuery(search.split(":")[1]);

      filter.toLowerCase() == "task" ? filterTasks(query) : filterLabels(query);
    } else {
      filterAll(search);
    }
  }
  getFilters(search);

  function filterTasks(query) {
    var dataClone = structuredClone(clone);
    for (const keys in dataClone) {
      Object.assign(dataClone, {
        [keys]: {
          ...dataClone[keys],
          tasks: dataClone[keys].tasks.filter((task) =>
            task.task.toLowerCase().includes(query.toLowerCase())
          ),
        },
      })[dataClone];
      setSearchResult(dataClone);
    }
  }

  function filterLabels(query) {
    // for(const key in data) {
    //     console.log(
    //         data[key].tasks.filter((label) =>
    //         label.labels.filter(
    //             (label) => label.label.toLowerCase() === query.toLowerCase()
    //         ))
    //     )
    // }
  }

  function filterAll(search) {}

  //   return null;
}
