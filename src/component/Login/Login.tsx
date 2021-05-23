import React from "react";
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {useDispatch, useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {validate} from "../../utils/validators/validators"
import Button from "@material-ui/core/Button";
import s from "./Login.module.css"
import {createField, Textarea, CheckboxInput, GetStringKeys} from "../../FormsControls/FormsControls";
import {makeStyles} from '@material-ui/core/styles';
import {selectCaptchaUrl, selectIsAuth} from "../../redux/auth-selectors";
import {login} from "../../redux/auth-reducer";

const useStyles = makeStyles({
    root: {
        minWidth: 250,
    },
    title: {
        fontSize: 14,
    }
});

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginPage: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> =
    ({handleSubmit, pristine, reset, submitting, captchaUrl}) => {
    const classes = useStyles();

    return <>
        <div className={s.auth}>
            <div className={s.loginDate}>
                <h3>Email: free@samuraijs.com</h3>
                <h4>Password: free</h4>
            </div>
            <div>
                <form onSubmit={handleSubmit} className={s.loginForm}>
                    <div className={s.formItem}>
                        {createField<LoginFormValuesTypeKeys>('Email', 'email',Textarea,
                            {multiline:false,rows:1,label:"Email"})}
                        {/*<Field name="email" component={renderTextField} label="Email" multiline={false} rows={1}/>*/}
                    </div>
                    <div>
                        {createField<LoginFormValuesTypeKeys>('password', 'password',Textarea,
                            {multiline:false,rows:1,label:"Password"})}
                       {/* <Field name="password" component={renderTextField} label="Password" multiline={false} rows={1}/>*/}
                    </div>
                    <div className={s.formItem}>
                        {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe',CheckboxInput,
                            {label:"Remember me"})}
                        {/*<Field name="rememberMe" component={renderCheckbox} label="Remember me"/>*/}
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
                            createField<LoginFormValuesTypeKeys>('captcha', 'captcha',
                                Textarea, {multiline:false,rows:1})}
                            {/*<Field name="captchaUrl" component={renderTextField} multiline={false} rows={1}/>*/}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </>
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: "login",
    validate
})(LoginPage)

export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

export const Login: React.FC = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const captchaUrl = useSelector(selectCaptchaUrl)

    if (isAuth) { return <Redirect to={"/profile"} /> }

    const onSubmit = (formData:LoginFormValuesType) => {

        dispatch(login(formData.email, formData.password, formData.rememberMe,formData.captcha))
    }

    return <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
}

