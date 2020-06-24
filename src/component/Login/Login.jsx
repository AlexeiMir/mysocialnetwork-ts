import React from "react";
import {Field, reduxForm} from "redux-form";
import {validate} from "../../utils/validators/validators"
import Button from "@material-ui/core/Button";
import s from "./Login.module.css"
import {renderCheckbox, renderTextField} from "../../FormsControls/FormsControls";
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 250,
    },
    title: {
        fontSize: 14,
    }
});


const LoginPage = (props) => {
    const classes = useStyles();
    const {handleSubmit, pristine, reset, submitting, captchaUrl} = props


    return <>
        <div className={s.auth}>
            <div className={s.loginDate}>
                <h3>Email: free@samuraijs.com</h3>
                <h4>Password: free</h4>
            </div>
            <div>
                <form onSubmit={handleSubmit} className={s.loginForm}>
                    <div className={s.formItem}>
                        <Field name="email" component={renderTextField} label="Email" multiline={false} rows={1}/>
                    </div>
                    <div>
                        <Field name="password" component={renderTextField} label="Password" multiline={false} rows={1}/>
                    </div>
                    <div className={s.formItem}>
                        <Field name="rememberMe" component={renderCheckbox} label="Remember me"/>
                    </div>
                    <div className={s.formItem}>
                        <Button type="submit" disabled={pristine || submitting}
                                variant="outlined" size="small" color="primary" component='button'>
                            Login
                        </Button>
                        <Button type="button" disabled={pristine || submitting} onClick={reset}
                                variant="outlined" size="small" color="primary" component='button'>
                            Cancel
                        </Button>
                        <div>
                            {captchaUrl && <img src={captchaUrl}/>}
                            {captchaUrl &&
                            <Field name="captchaUrl" component={renderTextField} multiline={false} rows={1}/>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
}

const LoginReduxForm = reduxForm({
    form: "login",
    validate
})(LoginPage)

export default LoginReduxForm;

