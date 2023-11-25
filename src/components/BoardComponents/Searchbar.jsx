import { useEffect, useState } from 'react'
import { Box, Input, InputAdornment } from '@mui/material'
import useDebounce from '../../utils/useDebounce'
import useStore from '../../store'
import SortIcon from '@mui/icons-material/Sort';

import useSearch from '../../utils/useSearch';

export default function Searchbar({setFilteredData}) {
    const { data } = useStore()

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
    }
    
    // useEffect(() => {
    //     search.trim() === '' ? clearSearch() : setFilteredData(searchResult)
    // }, [data, search, setFilteredData])

    useDebounce(() => {
        function getFilters(search) {
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
        getFilters(search)

        function filterTasks(query) {
            var dataClone = structuredClone(clone)
            for (const keys in dataClone) {
                Object.assign(dataClone, {
                    [keys]: {
                        ...dataClone[keys],
                        tasks: dataClone[keys].tasks.filter((task) => task.task.toLowerCase().includes(query.toLowerCase()))
                    }
                })[dataClone]
                setFilteredData(dataClone)
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

        function filterAll(search) {

        }
    }, [clone, search], 800)

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
                    }
                }}
                autoComplete="off"
                onChange={(e) => setSearch(e.target.value)}
            />
        </Box>
    )
}
