import React from "react";
import {Field, reduxForm} from "redux-form";
import {validate} from "../../utils/validators/validators"
import Button from "@material-ui/core/Button";
import s from "./Login.module.css"
import {renderCheckbox, renderTextField} from "../../FormsControls/FormsControls";




const LoginPage = (props) => {
    const { handleSubmit, pristine, reset, submitting, classes } = props



    return <>
        <div className={s.auth}>
        <form onSubmit={handleSubmit} className={s.loginForm}>
            <div className={s.formItem}>
                <Field name="email" component={renderTextField} label="Email" multiline={false} rows={1}  />
            </div>
            <div>
                <Field name="password" component={renderTextField} label="Password" multiline={false} rows={1}  />
            </div>
            <div className={s.formItem}>
                <Field name="rememberMe" component={renderCheckbox} label="Remember me" />
            </div>
            <div className={s.formItem}>
                <Button type="submit" disabled={pristine || submitting}
                        variant="outlined" size="small" color="primary" component='button' >
                    Login
                </Button>
                <Button type="button" disabled={pristine || submitting} onClick={reset}
                        variant="outlined" size="small" color="primary" component='button'>
                    Cancel
                </Button>
            </div>
            </form>
        </div>
        </>
}

const LoginReduxForm = reduxForm({
    form:"login",
    validate
})(LoginPage)

export default LoginReduxForm;

