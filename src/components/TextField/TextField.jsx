/* eslint-disable react/prop-types */
import React from 'react';
import TextField from '@material-ui/core/TextField';


export default function BasicTextFields({id, placeholder, handleChange, name, handleFocus, fullWidth, multiline, Icon}) {

  return (
    <TextField
          id={id}
          name={name}
          style={{ margin: 8 }}
          placeholder={Icon ? `${<Icon/>} ${placeholder}`: placeholder }
          fullWidth={fullWidth}
          multiline={multiline}
          onFocus={handleFocus}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
  );
}