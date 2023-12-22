import React, { useContext } from 'react'
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Select,
  Checkbox,
  MenuItem,
  FormControl,
  ListItemText,
  InputLabel,
  OutlinedInput,
  useTheme
} from "@mui/material"
import { ThemeContext } from '../../utils/useTheme';  
const names = [
  'List',
  'Cards',
  'Roadmap'
];


export default function BoardViewSetting() {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const {theme} = useContext(ThemeContext)

  return (
    <Box sx={{
      display: "flex",
      flexDirection: 'row',
      width: "100%",
      justifyContent: "space-between",
      mt: 1,
      color: theme ? "rgb(255 255 255)" : "rgb(23 23 23 )"
    }}>
      <Typography
        fontFamily="Poppins"
        fontWeight="500"
        fontSize="14px"
        sx={{ width: "100%" }}>
        Board View
      </Typography>
      <Select
        inputProps={{
          MenuProps: {
            MenuListProps: {
              sx: {
                backgroundColor: theme ? "rgb(38 38 38)" :'rgb(245 245 245)',
              }
            }
          }
        }}
        size='small'
        variant='outlined'
        fullWidth
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        defaultValue={
          window.localStorage.getItem('board-view') !== null ? 
          window.localStorage.getItem('board-view') : 'Cards'
        }
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
            pl: 1,
            color: theme ? "rgb(255 255 255)" : "rgb(23 23 23 )"
          },
        }}
      >
        {names.map((name) => (
          <MenuItem
            key={name}
            value={name}
            disableGutters
            sx={{
              color: theme ? "rgb(255 255 255)" :'rgb(23 23 23)',
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
