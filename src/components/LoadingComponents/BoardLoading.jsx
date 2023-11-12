import React from 'react'
import { Skeleton, Box } from '@mui/material'

export default function BoardLoading() {
    return (
        <>
            <Box style={{
                height: "100dvh",
                display: "flex",
                flexDirection: 'column',
                minWidth: "100%"
            }}>
                <Box sx={{
                    m: 1,
                    border: "1px solid rgba(229, 229, 229, 0.25)",
                    borderRadius: '4px',
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}></Box>
                <Box
                    sx={{
                        height: '100%',
                        maxHeight: "91%",
                        display: "flex",
                        flexDirection: "row",
                        flex: "1, 1, auto",
                        position: "fixed",
                        bottom: '5px',
                        overflowX: 'auto',
                        overflowY: "hidden",
                        width: "100%",
                    }}>
                </Box>
            </Box>
        </>
    )
}
