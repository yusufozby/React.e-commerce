import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

function FormInput({ name, label, required }) {
  const { control } = useFormContext();
  

  return (
    <Grid  xs={12} sm={6}>
      <TextField
    
        style={{width:"95%"}}
        name={name}
        control={control}
        label={label}
        fullWidth
        required={required}
      
      />
    </Grid>
  );
}

export default FormInput;