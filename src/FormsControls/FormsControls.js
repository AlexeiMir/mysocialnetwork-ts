import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import React from "react";


export const renderTextField = ({
                                    label,
                                    input,
                                    meta: {touched, invalid, error},
                                    multiline,
                                    rows,
                                    placeholder,
                                    ...custom
                                }) => (
    <TextField
        label={label}
        multiline={multiline}
        rows={rows}
        id={label}
        placeholder={placeholder}
        variant="outlined"
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
)

export const renderCheckbox = ({input, label}) => (
    <div>
        <FormControlLabel
            control={
                <Checkbox
                    checked={input.value ? true : false}
                    onChange={input.onChange}
                />
            }
            label={label}
        />
    </div>
)