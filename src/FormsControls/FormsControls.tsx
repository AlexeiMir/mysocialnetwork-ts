import React from "react"
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
;

type FormsControlPropsType = {
    meta: WrappedFieldMetaProps
}

export const Textarea = (props) => {
    const {touched, invalid, error, input, ...restProps} = props
    const {multiline, rows, fullWidth, name, placeholder,label, custom} = restProps
    return <TextField
        label={label}
        multiline={multiline}
        rows={rows}
        fullWidth={fullWidth}
        id={name}
        placeholder={placeholder}
        variant="outlined"
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...custom}
    />
}

export const CheckboxInput = (props) => {
    const {input,label, ...restProps} = props
   return <div>
    < FormControlLabel
    control = {
    <Checkbox
        checked={input.value ? true : false}
        onChange={input.onChange}
    />
}
    label = {label}
    />
</div>
}


/*
export const renderTextField = ({
                                    label,
                                    input,
                                    meta: {touched, invalid, error},
                                    multiline,
                                    rows,
                                    fullWidth,
                                    placeholder,
                                    ...custom
                                }) => (
    <TextField
        label={label}
        multiline={multiline}
        rows={rows}
        fullWidth={fullWidth}
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
*/

export function createField<FormKeysType extends string>(placeholder: string | undefined,
                           name:FormKeysType,
                           component: React.FC<WrappedFieldProps>,
                           props={},
                           text="") {
    return <div>
        <Field name={name} component={component} {...props}/>{text}
        </div>

}

export type GetStringKeys<T> = Extract<keyof T, string>