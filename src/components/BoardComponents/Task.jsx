import {useState, useRef} from 'react'
import { Box, Chip, Typography, IconButton } from '@mui/material'
import { Draggable } from '@hello-pangea/dnd'

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import TaskPopover from './TaskPopover'


export default function Task({id, index, task, status, number, handleRemoveTask}) {
    const [openPopover, setOpenPopOver] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);

    const anchorRef = useRef()

    const handleOpenPopover = () => {
        setOpenPopOver(!openPopover)
        setAnchorEl(anchorRef.current)
    }

    return (
        <>
            <Draggable
                draggableId={id}
                index={index}
            >
                {(provided, snapshot) => (
                    <Box
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "rgb(30 30 30)",
                            border: "1px solid rgba(229, 229, 229, 0.1)",
                            borderRadius: "4px",
                            p: 1,
                            mt: 1,
                            "&:first-of-type": {
                                mt: 0
                            },
                            "&:last-child": {
                                mb: 7,
                            },
                            "&:hover": {
                                border: "1px solid rgba(229, 229, 229, 0.25)",
                            }
                        }}
                    >
                        {/* Task Number and Status of Task */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                            <Box sx={{
                                width: "13px",
                                height: "13px",
                                background: "rgba(255, 0, 0, 0.3)",
                                border: "2px solid red",
                                borderRadius: "999px",
                                mr: 1,
                            }}>
                            </Box>
                            <IconButton sx={{
                                m: 0,
                                p: 0,
                            }}
                            onClick={() => handleOpenPopover()}
                            >
                                <DotsHorizontalIcon 
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    color: 'rgba(163, 163, 163, 1)'
                                }} 
                                ref={anchorRef}

                                />
                            </IconButton>
                        </Box>

                        {/* Task Description */}
                        <Box sx={{
                            mt: 1,
                        }}>
                            <Typography
                                variant='body2'
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: "5",
                                    WebkitBoxOrient: "vertical",
                                }}
                            >
                                {task}
                            </Typography>
                        </Box>

                        {/* Task Tags/Additonal Information */}
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            mt: 1
                        }}>
                            <Chip
                                label="Chip Filled"
                                size='small'
                            />
                        </Box>
                    </Box>
                )}
            </Draggable>
            {openPopover && <TaskPopover 
                open={openPopover}
                onClose={() => setOpenPopOver(!openPopover)} 
                anchor={anchorEl}
                handleRemoveTask={() => handleRemoveTask()}
            />}
        </>
    )
}
