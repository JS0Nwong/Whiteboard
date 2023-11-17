import { useEffect, useState, useRef } from 'react'
import { Box, Icon, IconButton, Typography, Button, useTheme } from '@mui/material'
import Task from './Task'

import { Draggable, Droppable } from '@hello-pangea/dnd'
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import AddIcon from '@mui/icons-material/Add';

import AddTaskForm from "./AddTaskForm"
import ColumnPopover from './ColumnPopover'
import AddColumnForm from './AddColumnForm'

export default function Column({
    index,
    data,
    columnName,
    handleAddTask,
    handleRemoveColumn,
    handleRemoveTask,
    handleColumnUpdate,
    handleTaskUpdate,
}) 
{
    const [addTask, setAddTask] = useState(false)
    const [openPopover, setOpenPopOver] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [openEdit, setOpenEdit ] = useState(false)
    const theme = useTheme()

    const anchorRef = useRef()

    const handleOpenPopover = () => {
        setOpenPopOver(!openPopover)
        setAnchorEl(anchorRef.current)
    }

    return (
        <>
            <Draggable 
                draggableId={columnName} 
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
                            borderRadius: '4px',
                            border: "1px solid rgb(64 64 64)",
                            m: 1,
                            width: "100%",
                            minWidth: "300px",
                            maxWidth: "300px",
                            backgroundColor: theme.palette.currentTheme === "dark" ? "rgb(17 17 17)" : "rgb(229 231 235)",
                            position: "relative",
                        }}>
                        {/* Column Header (Title, Description, Tasks Number, Color, Settings) */}
                        <Box sx={{
                            display: "flex",
                            flexDirection: 'column',
                            m: 1,
                        }}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: 'inherit'
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    width: 'inherit',
                                }}>
                                    <Box sx={{
                                        width: "13px",
                                        height: "13px",
                                        background: `rgba(${data.columnColor.replace(/['"]+/g, '')}, 0.3)`,
                                        border: `2px solid rgba(${data.columnColor.replace(/['"]+/g, '')}, 1)`,
                                        borderRadius: "999px",
                                        mr: 1,
                                    }}>

                                    </Box>
                                    <Typography
                                        fontWeight="600"
                                        fontFamily="Raleway"

                                    >
                                        {columnName}
                                    </Typography>

                                    <Typography
                                        fontWeight="500"
                                        fontSize="14px"
                                        sx={{
                                            ml: 1,
                                            color: "rgb(115 115 115)",
                                        }}
                                    >
                                        {data.tasks.length}
                                    </Typography>
                                </Box>

                                <IconButton
                                    sx={{
                                        m: 0,
                                        p: 0,
                                    }}
                                    onClick={() => handleOpenPopover()}
                                >
                                    <DotsHorizontalIcon style={{
                                        width: "20px",
                                        height: "20px",
                                        color: 'rgba(163, 163, 163, 1)'
                                    }} 
                                    ref={anchorRef}
                                    />
                                </IconButton>
                            </Box>
                            <Typography variant='subtitle2' fontFamily="Poppins"sx={{
                                color: "rgb(82 82 82)"
                            }}>
                                {data.description}
                            </Typography>
                        </Box>

                        {/* Task List (All current tasks within the category column) */}
                        <Droppable 
                            droppableId={columnName} 
                            type="TASK"
                            direction="vertical"
                        >
                            {(provided, snapshot) => (
                                <Box
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    sx={{
                                        m: 1,
                                        maxHeight: "100%",
                                        height: '100%',
                                        overflowY: 'auto',
                                        "&::-webkit-scrollbar": {
                                            width: "2px",
                                        },
                                        "&::-webkit-scrollbar-thumb": {
                                            width: "4px",
                                            background: "rgb(58 58 58)",
                                            borderRadius: "99px",
                                        },
                                    }}
                                >
                                    {data.tasks.map((task, index) => (
                                        <Task 
                                            key={task.id}
                                            id={task.id}
                                            task={task.task}
                                            index={index}
                                            handleRemoveTask={() => handleRemoveTask(columnName, task.id)}
                                            associatedColumn={columnName}
                                            handleTaskUpdate={handleTaskUpdate}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </Box>
                            )}
                        </Droppable>

                        {/* Add Task to Column Button */}
                        <Box sx={{
                            backgroundColor:theme.palette.currentTheme === "dark" ? "rgb(17 17 17)" : "rgb(229 231 235)",
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            p: 1,
                        }}>
                            <Button
                                disableRipple
                                variant='text'
                                startIcon={<AddIcon />}
                                sx={{
                                    textTransform: 'none',
                                    color: 'rgb(115 115 115)',
                                    width: "100%",
                                    justifyContent: "flex-start",
                                    "&:hover": {
                                        backgroundColor: "rgb(34 34 34)"
                                    },
                                    fontFamily: "Poppins",
                                }}
                                onClick={() => setAddTask(!addTask)}
                            >
                                Add Item
                            </Button>
                        </Box>
                    </Box>
                )}
            </Draggable>
            {addTask && <AddTaskForm 
                open={addTask} 
                onClose={() => setAddTask(!addTask)} 
                handleAddTask={handleAddTask}
                columnName={columnName}
            />}
            {openPopover && <ColumnPopover 
                open={openPopover}
                onClose={() => setOpenPopOver(!openPopover)} 
                anchor={anchorEl}
                number={data.tasks.length}
                handleRemoveColumn={() => handleRemoveColumn(columnName)}
                setOpenEdit={() => setOpenEdit(!openEdit)}
            />}
            {/* Edit column */}
            {openEdit && <AddColumnForm 
                open={openEdit}
                onClose={() => setOpenEdit(!openEdit)}
                mode={'edit'}
                existingColumnName={columnName}
                currentColor={data.columnColor}
                currentDescription={data.description}
                handleColumnUpdate={handleColumnUpdate}
            />}
        </>
    )
}
