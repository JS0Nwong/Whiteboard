import { useState } from 'react'
import { Skeleton, Box, Dialog, DialogContent, Typography, useTheme } from '@mui/material'

export default function BoardError() {
    const [dialogOpen, setDialogOpen] = useState(true)
    const theme = useTheme()

    const handleClose = () => {

    }

    return (
        <>
            <Box sx={{
                height: "100dvh",
                display: "flex",
                flexDirection: 'column',
                minWidth: "100%",
            }}>
                <Box sx={{
                    p: 1,
                }}>
                    <Skeleton variant="rounded" width={"100%"} height={48} sx={{ background: 'rgb(64 64 64)' }} />
                </Box>
                <Box
                    sx={{
                        height: '100%',
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            md: "row"
                        },
                        width: "100%",
                        p: 1,
                    }}>
                    <Skeleton variant="rounded" width={"100%"} height={"100%"} sx={{ background: 'rgb(64 64 64)' }} />

                </Box>
            </Box>
            <Dialog
                open={dialogOpen}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                sx={{
                    ".MuiDialog-paper": {
                        background: theme.palette.currentTheme === "dark" ? "rgb(17 17 17)" : "rgb(229 231 235)",
                        border: "1px solid rgb(64 64 64)",
                        m: 1,
                    },
                    background: 'rgba(104, 104, 104, 0.25)'
                }}
            >
                <DialogContent>
                    <Typography>
                        Sorry, but you do not have permission to view this board.
                        You can request access from the owner to view this board.
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    )
}
