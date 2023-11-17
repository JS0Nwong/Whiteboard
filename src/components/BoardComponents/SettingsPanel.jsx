import React from 'react'
import {
  Popover,
  Box,
  Typography,
  Divider,
  IconButton,
  Button,
  Select,
  Checkbox,
  MenuItem,
  FormControl,
  ListItemText,
  InputLabel,
  OutlinedInput 
} from "@mui/material"

import BoardViewSetting from './BoardViewSetting';
import TaskViewSetting from './TaskViewSetting';


export default function SettingsPanel({open, onClose, anchor}) {


  return (
    <>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={onClose}
        anchorEl={anchor}
        sx={{
          ".MuiPopover-paper": {
            background: "rgb(23 23 23)",
            border: "1px solid rgb(64 64 64)",
            width: { xs: "auto", md: "20%" }
          },
        }}
      >
        <Box sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}>
          <Typography 
            fontFamily="Poppins" 
            fontWeight="500" 
            fontSize="14px"
          >Settings</Typography>

          <Typography
            fontFamily="Poppins"
            fontWeight="400"
            fontSize="14px"
            sx={{
              color: "rgb(82 82 82)"
            }}
          >Change the settings of this board
          </Typography>
        </Box>

        <Box sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          justifyContent: "space-between",
        }}>
          <BoardViewSetting />
          <TaskViewSetting />
        </Box>
      </Popover>
    </>
  )
}
