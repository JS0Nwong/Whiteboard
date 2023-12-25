import { useState, useEffect, useContext } from 'react'
import { clsx } from "clsx"

import { DataGrid } from '@mui/x-data-grid'
import { Box, useTheme, createTheme } from '@mui/material'
import Searchbar from './Searchbar'
import { ThemeContext } from '../../utils/useTheme'
import sanitizeHtml from "sanitize-html";

export default function List({ data, orderBy }) {

    const { theme } = useContext(ThemeContext)
    const [filtered, setFiltered] = useState(null)
    const [dataRows, setDataRows] = useState(null)

    const preprocessData = (order, rowData) => {
        const rows = []
        filtered !== null ?
            order.map((key, index) => {
                filtered[key].tasks.map((task, index) => {
                    Object.assign(task, {
                        ...task,
                        status: key,
                        associatedColor: filtered[key].columnColor
                    })
                    rows.push(task)
                })
            })
            :
            order.map((key, index) => {
                rowData[key].tasks.map((task, index) => {
                    Object.assign(task, {
                        ...task,
                        status: key,
                        associatedColor: rowData[key].columnColor
                    })
                    rows.push(task)
                })
            })
        setDataRows(rows)
    }

    const rows = dataRows

    const columns = [
        { field: "task", headerName: "Title", minWidth: "400", headerClassName: "list-header" },
        {
            field: "status",
            headerName: "Status",
            renderCell: (params) => {
                return (<span style={{
                    border: `2px solid rgb(${params.row.associatedColor})`,
                    borderRadius: "999px",
                    padding: ".2rem 1rem .2rem 1rem",
                }}>
                    {params.value}
                </span>)
            },
            minWidth: 500,
            headerClassName: "list-header",
        },
        {
            field: "description",
            headerName: "Description",
            renderCell: (params) => (
                <span dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(params.value, {
                        allowedTags: [
                            "h1", "h2", "h3", "h4",
                            "h5", "h6", "blockquote",
                            "hr", "li", "ol", "p", "pre",
                            "ul", "b", "code",
                            "i", "mark", "q", "s", "span", "strong", "sub", "sup",
                        ]
                    })
                }} />
            ),
            minWidth: 420, flex: "1",
            headerClassName: "list-header"
        },
    ]

    useEffect(() => {
        preprocessData(orderBy, data)
    }, [data, filtered])

    return (
        <>
            <Box>
                <Searchbar
                    data={data}
                    setFilteredData={setFiltered}
                />
            </Box>
            <Box sx={{ height: "100%", width: '100%', p: 1 }}>
                {dataRows !== null ? <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 100 },
                        },
                    }}
                    sx={{
                        border: "1px solid rgb(64 64 64)",
                        background:
                            theme === true ? "rgb(20 20 20)" : "rgb(229 231 235)",
                        '.list-header': {
                            backgroundColor:
                                theme === true ? "rgb(30 30 30)" : "rgb(209 213 219)",
                        },
                        "&.MuiDataGrid-columnHeadersInner": {
                            borderBottom: "1px solid rgb(82 82 82)",
                        },
                        "& .MuiDataGrid-cell": {
                            borderTop: 0,
                            borderRight: 0,
                            borderLeft: 0,
                            borderBottom: "1px solid rgb(82 82 82)",
                        },
                        ".MuiButtonBase-root ": {
                            color: "rgb(163 163 163)"
                        },
                        ".MuiDataGrid-menuIconButton": {
                            color: "rgb(163 163 163)"
                        },
                        ".MuiDataGrid-columnHeaderTitle": {
                            fontFamily: "Poppins",
                            fontWeight: "500"
                        },
                        '&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus': {
                            outline: 'none',
                        },
                    }}
                /> : <></>
                }
            </Box>
        </>
    )
}
