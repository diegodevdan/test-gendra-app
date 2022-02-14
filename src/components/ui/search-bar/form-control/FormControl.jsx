import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const FormControlUpdated = ({typeName, typeParameter, handleChange, defaultValue}) => {
  return (
    <FormControl fullWidth>

      <InputLabel id="type-search">{typeName}</InputLabel>
      <Select
        name="typeParameter"
        labelId="type-search"
        value={defaultValue}
        label="Type"
        onChange={handleChange}
      >
        {typeParameter.map(({value, name }) => (
          <MenuItem
            key={value}
            value={value}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default FormControlUpdated
