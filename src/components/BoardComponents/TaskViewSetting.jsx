import { useState, useContext } from 'react'
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
  OutlinedInput,
  useTheme
} from "@mui/material"
import { BoardContext } from "../../utils/useBoardSettings"
const names = [
  'Compact',
  'Default',
  'Detailed',
];

export default function BoardViewSetting() {
  const { palette } = useTheme()
  const { taskView, toggleTask } = useContext(BoardContext)

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    toggleTask(value)
  };
  return (
    <Box sx={{
      display: "flex",
      flexDirection: 'row',
      width: "100%",
      justifyContent: "space-between",
      mt: 1,
    }}>
      <Typography
        fontFamily="Poppins"
        fontWeight="500"
        fontSize="14px"
        sx={{ width: "100%" }}>
        Task View
      </Typography>
      <Select
        inputProps={{
          MenuProps: {
            MenuListProps: {
              sx: {
                backgroundColor: palette.currentTheme === "dark" ? "rgb(38 38 38)" :'rgb(245 245 245)',
              }
            }
          }
        }}
        size='small'
        variant='outlined'
        fullWidth
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        value={window.localStorage.getItem('task-view') !== null ? window.localStorage.getItem('task-view') : 'Default'}
        onChange={handleChange}
        sx={{
          m: 0,
          p: 0,
          "&:label": {
            color: "#fff"
          },
          ".MuiSelect-outlined": {
            border: '1px solid rgb(64 64 64)',
            m: 0,
            p: 0,
          },
          ".MuiListItemText-primary": {
            pl: 1
          },
        }}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            disableGutters
            sx={{
              color: palette.currentTheme === "dark" ? "rgb(255 255 255)" :'rgb(23 23 23)',
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: '500',
              p: 1,
            }}
          >
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}
