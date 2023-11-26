import { useEffect, useState } from 'react'
import { Box, Input, InputAdornment } from '@mui/material'
import useDebounce from '../../utils/useDebounce'
import useStore from '../../store'
import SortIcon from '@mui/icons-material/Sort';
import { useSearchParams } from 'react-router-dom'

import useSearch from '../../utils/useSearch';

export default function Searchbar({setFilteredData}) {
    // get board data from global state store
    const { data } = useStore()
    const [searchParams, setSearchParams] = useSearchParams()

    const [search, setSearch] = useState('') 
    // get user search query from search bar

    const [clone, setDataClone] = useState(structuredClone(data)) 
    // don't want to directly manipulate data from database so we create 
    // a clone of it after getting it in global state

    const [searchResult, setSearchResult] = useState(null)
    // set search result after searching

    const [filter, setFilter] = useState('')
    // sets the filter type if there is one eg. task, label

    const [query, setQuery] = useState('')
    // sets the search query if there is a filter preceding the query

    const clearSearch = () => {
        setSearchResult(null)
        setFilteredData(null)
        if(searchParams.has('filterType') || searchParams.has('filterQuery')) {
            searchParams.delete('filterType')
            searchParams.delete('filterQuery')
            setSearchParams(searchParams)
        }
    }

    const getFilters = (search) => {
        if (search.match(/[:]/g)) {
            search.split(":")
            setFilter(search.split(":")[0])
            setQuery(search.split(":")[1])

            filter.toLowerCase() == "task" ? 
            filterTasks(query) : filterLabels(query)
        }
        else {
            filterAll(search)
        }
    }

    const filterTasks = (query) => {
        var dataClone = structuredClone(clone)
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
    }

    function filterLabels(query) {
        const dataClone = structuredClone(clone)
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
    }

    function filterAll(query) {
        const dataClone = structuredClone(clone)
        for (const key in dataClone) {
            Object.assign(dataClone, {
                [key]: {
                    ...dataClone[key],
                    tasks: dataClone[key].tasks.filter((task) => {
                        // task.task.toLowerCase().includes(query.toLowerCase())
                        // task.labels.some(
                        //     (label) => label.label.toLowerCase().includes(query.toLowerCase())
                        // )
                    })
                }
            })[dataClone]
        }
        setFilteredData(dataClone)
        setSearchParams({
            filterQuery: query
        })
    }
    
    useEffect(() => {
        query.trim() || search.trim() === '' ? clearSearch() : setFilteredData(searchResult)
    }, [data, search, setFilteredData])

    useEffect(() => {
        search !== "" ? getFilters(search) : setFilteredData(null)
    }, [search])

    // useDebounce(() => {
    //    getFilters(search)
    // }, [clone, search], 800)

    return (
        <Box sx={{
            m: 1,
        }}>
            <Input
                fullWidth
                disableUnderline
                placeholder={'Filter by keyword or fields'}
                startAdornment={
                    <InputAdornment position="start">
                      <SortIcon sx={{color: "#888"}}/>
                    </InputAdornment>
                  }
                sx={{
                    pl: 1,
                    pr: 1,
                    overflow: "visible",
                    fontWeight: "400",
                    fontSize:"13px",
                    border: "1px solid #555",
                    borderRadius: "4px",
                    "&.MuiInputBase-root ": {
                        "&.Mui-focused ": {
                            border: "1px solid #aaa"
                        }
                    },
                }}
                autoComplete="off"
                onChange={(e) => setSearch(e.target.value)}
            />
        </Box>
    )
}
