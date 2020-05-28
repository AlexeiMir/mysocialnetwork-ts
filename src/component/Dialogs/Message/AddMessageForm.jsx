import React from 'react'
import { reduxForm, Field } from 'redux-form'
import Button from "@material-ui/core/Button";
import {renderTextField} from "../../../FormsControls/FormsControls"

const AddMessageForm = ({handleSubmit,pristine, submitting}) => {

return <>
<form onSubmit={handleSubmit}>
<Field name="message" component={renderTextField} multiline={true} rows={2}/>
<Button type="submit" disabled={pristine || submitting}
                        variant="outlined" size="small" color="primary" component='button' >
                    Send
                </Button>
</form>

</>

}

const AddMessageFormRedux = reduxForm({
    form:"send-message"
})(AddMessageForm)

export default AddMessageFormRedux;