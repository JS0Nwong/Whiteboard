import { useEffect, useCallback, useState } from "react";
import { useSearchParams } from 'react-router-dom'

const useFilter = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const filterTasks = (filter, query, data, setFilteredData) => {
        var dataClone = structuredClone(data)
        for (const keys in dataClone) {
            Object.assign(dataClone, {
                [keys]: {
                    ...dataClone[keys],
                    tasks: dataClone[keys].tasks.filter(
                        (task) => task.task.toLowerCase().includes(query.toLowerCase())
                    )
                }
            })[dataClone]
        }
        setFilteredData(dataClone)

        setSearchParams({
            filterType: filter,
            filterQuery: query
        })
        return dataClone

    }

    const filterLabels = (filter, query, data, setFilteredData) => {
        const dataClone = structuredClone(data)
        for (const key in dataClone) {
            Object.assign(dataClone, {
                [key]: {
                    ...dataClone[key],
                    tasks: dataClone[key].tasks.filter((task) =>
                        task.labels.some(
                            (label) => label.label.toLowerCase().includes(query.toLowerCase())
                        ))
                }
            })[dataClone]
        }
        setFilteredData(dataClone)

        setSearchParams({
            filterType: filter,
            filterQuery: query
        })
        return dataClone
    }

    const filterAll = (query, data, setFilteredData) => {
        const dataClone = structuredClone(data)
        for (const key in dataClone) {
            Object.assign(dataClone, {
                [key]: {
                    ...dataClone[key],
                    tasks: dataClone[key].tasks.filter((task) => 
                        task.task.toLowerCase().includes(query.toLowerCase()) || 
                        task.labels.some(
                            (label) => label.label.toLowerCase().includes(query.toLowerCase())
                        )
                    )
                }
            })[dataClone]
        }
        setFilteredData(dataClone)
        setSearchParams({
             filterQuery: query
        })
        return dataClone
    }

    return {
        filterTasks,
        filterLabels,
        filterAll,
    }
}

export default useFilter