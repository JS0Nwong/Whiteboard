import { useState, useCallback } from 'react'
import { Box } from '@mui/material'
import Column from './Column'
import AddColumn from './AddColumn'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'

import useFirebaseHooks from '../../utils/firebaseHooks'
import useReorder from '../../utils/reorder'

export default function Board({ columns, id, orderBy }) {
    const { updateBoard, updateColumnKeys } = useFirebaseHooks()
    const { reorder, reorderMap, moveBetween } = useReorder()
    const [tasks, setTasks] = useState(structuredClone(columns))
    const [loading, setLoading] = useState(false)

    const [keys, setKeys] = useState(orderBy)

    const handleBoardUpdate = async(data) => {
        await updateBoard(id, data)
        setTasks(data)
    }

    const handleOrderUpdate = async(keys) => {
        await updateColumnKeys(id, keys)
        setKeys(keys)
    }

    const handleRemoveColumn = async (name) => {
        const clone = structuredClone(tasks)
        delete clone[name]

        try {
            await handleOrderUpdate(Object.keys(clone))
            await handleBoardUpdate(clone)
        } catch (error) {
            console.log(error)
        }

    }

    const handleTaskUpdate = async (task, currentTask, description, columnName) => {
        const clone = structuredClone(tasks)
        clone[columnName].tasks.find((task) => task.task === currentTask).task = task
        try {
            await handleBoardUpdate(clone)
        } catch (error) {
            console.log(error)
        }
    }

    
    const handleColumnUpdate = async(original, newColumn, description, color) => {
        console.log(original, newColumn, description, color)
        var dataClone = structuredClone(tasks)

        if (original !== newColumn) {
            delete Object.assign(dataClone, {
                [newColumn]: {
                    columnColor: color,
                    description: description,
                    tasks: dataClone[original].tasks,
                }
            })[original]

        }
        else {
            Object.assign(dataClone, {
                [original]: {
                    columnColor: color,
                    description: description,
                    tasks: dataClone[original].tasks,
                }
            })[original]
        }

        try {
            setTasks(dataClone)
            setKeys(Object.keys(dataClone))
            await handleBoardUpdate(dataClone)
            await handleOrderUpdate(Object.keys(dataClone))
        } catch (error) {
            console.log(error)
        }
    }

    const handleRemoveTask = useCallback(async (column, task) => { 
        const data = structuredClone(tasks)
        const removed = data[column].tasks.findIndex((t) => t.id === task)
        data[column].tasks.splice(removed, 1)
        try {
            await handleBoardUpdate(data)
        } catch (error) {
            console.log(error)
        }
    }, [tasks])

    const handleAddTask = async (task, labels, columnName) => {
        if (!task.trim()) return
        var data = structuredClone(tasks)

        data[columnName].tasks.push(
            { task: task, id: crypto.randomUUID(), labels: [] }
        )

        try {
            await handleBoardUpdate(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddColumn = async(columnName, description, color) => {
        var clone = structuredClone(tasks)
        clone = Object.assign({
            [columnName]: {
                columnColor: color,
                description: description,
                tasks: [],
            }
        }, clone)

        try {
            await handleBoardUpdate(clone)
            await handleOrderUpdate(Object.keys(clone))
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleDragEnd = async (result) => {
        if(result.combine) {
            if(result.type === "COLUMN") {
                const shallowCopy = [...keys]
                shallowCopy.splice(result.source.index, 1)
                setKeys(shallowCopy)
                return
            }

            const column = tasks[result.source.droppableId]
            const withTaskRemoved = [...column]

            withTaskRemoved.splice(result.source.index, 1)

            const orderedTasks = {
                ...tasks,
                [result.source.droppableId]: withTaskRemoved
            }
            setTasks(orderedTasks)
        }

        // dropped no where
        if (!result.destination) {return}

        const source = result.source
        const destination = result.destination

        // did not move anywhere can break early
        if (source.droppableId === destination.droppableId &&
            source.index === destination.index) {return}

        // reordering columns
        if (result.type === "COLUMN") {
            const reorderedOrder = reorder(keys, source.index, destination.index)
            handleOrderUpdate(reorderedOrder)
            setKeys(reorderedOrder);
            return;
        }

        // reordering tasks
        const data = reorderMap({
            tasks: tasks,
            source,
            destination,
        })
        handleBoardUpdate(data.tasks)
        setTasks(data.tasks)
    }

    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable
                    droppableId={id}
                    type="COLUMN"
                    direction="horizontal"
                >
                    {(provided) => (
                        <Box
                            {...provided.droppableProps}
                            ref={provided.innerRef}
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

                            {keys.map((key, index) => (
                                <Column
                                    key={key}
                                    columnName={key}
                                    data={tasks[key]}
                                    handleAddTask={handleAddTask}
                                    index={index}
                                    handleRemoveColumn={handleRemoveColumn}
                                    handleRemoveTask={handleRemoveTask}
                                    handleColumnUpdate={handleColumnUpdate}
                                    handleTaskUpdate={handleTaskUpdate}
                                />
                            ))}
                            {provided.placeholder}
                            <AddColumn addColumn={handleAddColumn} />
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}
