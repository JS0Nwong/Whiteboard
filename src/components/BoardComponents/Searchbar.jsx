import { useEffect, useState } from 'react'
import { Box, Input, InputAdornment } from '@mui/material'
import useDebounce from '../../utils/useDebounce'
import useStore from '../../store'
import SortIcon from '@mui/icons-material/Sort';
import { useSearchParams } from 'react-router-dom'

import useFilter from '../../utils/useFilter';

export default function Searchbar({ setFilteredData }) {

    const {filterTasks, filterLabels, filterAll} = useFilter()

    const { data } = useStore()
    // get board data from global state store
    
    const [searchParams, setSearchParams] = useSearchParams()

    const [search, setSearch] = useState('')
    // get user search query from search bar

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

            filter.toLowerCase() === "task" ? 
            filterTasks(filter, query, data, setFilteredData) : filterLabels(filter, query, data, setFilteredData)
        }
        else {
            filterAll(search, data, setFilteredData)
        }
    }
    
    useEffect(() => {
        query.trim() !== "" || search.trim() === '' ? clearSearch() : setFilteredData(searchResult)
    }, [data, search, setFilteredData])

    useEffect(() => {
        search !== "" ? getFilters(search) : setFilteredData(null)
    }, [search])

    // useDebounce(() => {
    //     search !== "" ? getFilters(search) : setFilteredData(null)
    // }, [data, search], 200)
    

    return (
        <Box sx={{
            m: 1,
        }}>
            <Input
                fullWidth
                disableUnderline
                placeholder={'Filter by keyword or fields'}
                defaultValue={
                    searchParams.has('filterType') && searchParams.has('filterQuery') ?
                        `${searchParams.get('filterType')}:${searchParams.get('filterQuery')}` :
                        searchParams.get('filterQuery')
                }
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
