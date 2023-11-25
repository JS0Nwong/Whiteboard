import React, { useEffect } from 'react'
import {clsx} from "clsx"

import { DataGrid } from '@mui/x-data-grid'
import { Box, useTheme, createTheme } from '@mui/material'


export default function List({data}) {

    const theme = useTheme()

    const DataGridTheme = createTheme({
        components: {
            MuiDataGrid: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'red',
                    },
                    cell: {
                        backgroundColor: "yellow"
                    },
                    columnHeader: {
                        backgroundColor: "green"
                    }
                },
            },
        },
    });

    const checkKeysUnderObject = (obj, res) => {
        for(let key in obj) {
            if(key) {
                res.push(obj[key].label)
            }
        }
    }

    const getColors = (obj, res) => {
        for(let key in obj) {
            if(key) {
                res.push(obj[key].color)
            }
        }
    }

    const columns = [
        { field: "task", headerName: "Title", minWidth: "400", headerClassName: "list-header" },
        { field: "status", headerName: "Status", minWidth: 500, headerClassName: "list-header", },
        { field: "description", headerName: "Description", minWidth: 420, flex: "1", headerClassName: "list-header" },
    ]

    const rows = data

    return (
        <Box sx={{ height: "100%", width: '100%', p: 1 }}>
            <DataGrid
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
                        theme.palette.currentTheme === "dark" ? "rgb(20 20 20)" : "rgb(229 231 235)",
                    '.list-header': {
                        backgroundColor: 
                            theme.palette.currentTheme === "dark" ? "rgb(30 30 30)" : "rgb(226 232 240)",
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
                    ".MuiDataGrid-cellContent[title='InProgress']": {
                        border: '1px solid red',
                        borderRadius: "999px",
                        padding: ".2rem 1rem .2rem 1rem",
                    }
                }}
            />
        </Box>
    )
}
