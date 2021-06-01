import React from 'react'
import {reduxForm, Field} from 'redux-form'
import Button from "@material-ui/core/Button";
import {renderTextField,createField,GetStringKeys} from "../../../FormsControls/FormsControls"
import {AddMessageFormType} from '../Dialogs'
import s from "./Message.module.css"

type AddMessageFormTypeKeys = GetStringKeys<AddMessageFormType>

const AddMessageForm: React.FC<> = ({handleSubmit, pristine, submitting,touched}) => {


    return <>
        <form onSubmit={handleSubmit} className={s.messageField}>
            {createField<AddMessageFormTypeKeys>('','newTextMessage', Textarea, {multiline:true, cols:150, rows:2, fullWidth:true} )}
            {/* <Field name="newTextMessage" component={renderTextField}
                   multiline={true} cols={150} rows={2} fullWidth={true} /> */}
            <Button type="submit" disabled={pristine || submitting}
                    variant="outlined" size="small" color="primary" component='button'>
                Send
            </Button>
        </form>

    </>

}

const AddMessageFormRedux = reduxForm({
    form: "send-message"
})(AddMessageForm)

export default AddMessageFormRedux;