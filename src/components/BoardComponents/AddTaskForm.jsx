import { useState } from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Typography,
  IconButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Stack
} from '@mui/material'
import { Cross1Icon } from '@radix-ui/react-icons'

export default function AddTaskForm({ 
  open, 
  onClose, 
  handleAddTask, 
  columnName, 
  mode,
  currentTask,
  handleTaskUpdate
}) {
  const [task, setTask] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    if(mode === "edit") { 
      handleTaskUpdate(task, currentTask, description, columnName)
      onClose()
    }
    else {
      if(!task.trim()) alert('name cannot be empty')
      handleAddTask(task, description, columnName) 
      onClose()
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{
          ".MuiDialog-paper": {
            background: 'rgb(17 17 17)',
            border: "1px solid rgb(64 64 64)",
            m: 1,
          }
        }}
      >
        <DialogContent>
          <DialogTitle sx={{
            color: 'white',
            fontWeight: "500",
            fontSize: "1rem"
          }}>
            {mode === 'edit' ? `Edit Item for ${columnName}` : `New Item for ${columnName}`}
          </DialogTitle>

          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Cross1Icon />
          </IconButton>

          <DialogContent sx={{
            display: 'flex',
            flexDirection: "column",
            alignItems: "center",
            justifyContent: 'center'
          }}>

            <form>
              <Box sx={{
                display: 'flex',
                flexDirection: "column"
              }}>

                <FormControl required>
                  <FormLabel sx={{
                    "&.MuiFormLabel-root": {
                      color: "white"
                    },
                    ".Mui-focused": {
                      color: "white"
                    },
                    ".MuiFormLabel-asterisk": {
                      color: "red"
                    },
                    mt: 1,
                  }}>Item: </FormLabel>
                  <Input
                    placeholder={currentTask !== undefined ? currentTask : "Task"}
                    disableUnderline
                    sx={{
                      color: "#FFFFFF",
                      pl: 1,
                      pr: 1,
                      overflow: "visible",
                      fontWeight: "500",
                      border: "1px solid #555",
                      borderRadius: "4px",
                      "&.MuiInputBase-root ": {
                        "&.Mui-focused ": {
                          border: "1px solid #aaa"
                        }
                      }
                    }}
                    autoComplete="off"
                    onChange={(e) => setTask(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel sx={{
                    "&.MuiFormLabel-root": {
                      color: "white"
                    },
                    ".Mui-focused": {
                      color: "white"
                    },
                    mt: 1,
                  }}>Labels: </FormLabel>
                </FormControl>
              </Box>
            </form>

          </DialogContent>

          <DialogActions>
            <Button
              variant='contained'
              autoFocus
              onClick={onClose}
              size="small"
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              autoFocus
              onClick={() => handleSubmit()}
              size="small"
              sx={{
                m: 2,
                background: "white",
                color: "#232323",
                "&:hover": {
                  background: "white",
                }
              }}
            >
              {mode === "edit" ? "Save" : "Add"}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}
