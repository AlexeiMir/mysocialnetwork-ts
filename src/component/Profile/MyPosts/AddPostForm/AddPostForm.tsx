import {InjectedFormProps, reduxForm} from "redux-form";
import React from "react";
import {createField, GetStringKeys, Textarea} from "../../../../FormsControls/FormsControls";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import s from "./AddPostForm.module.css"
import { AddPostFormValuesType } from "../MyPosts";


type PropsType = {
    photo: string | null
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType,PropsType> & PropsType> = (props) => {
    const {handleSubmit,pristine,submitting,photo} = props

    return <div>
        <form onSubmit={handleSubmit}>
            <div className={s.postBlock}>
                <Avatar className={s.imagePost} src={photo as string}/>
                {createField<AddPostFormValuesTypeKeys>('','newPostText',Textarea,
                    {label:"Post", multiline:true, rows:3})}
                {/*<Field className={s.post} name={"newPostText"} component={renderTextField}
                       label="Post" multiline={true} rows={3}/>*/}
                <Button type="submit" disabled={pristine || submitting} className={s.buttonPost}
                        variant="outlined" size="small" color="primary" component='button' >
                    Post
                </Button>
            </div>

        </form>
    </div>

}

export default reduxForm<AddPostFormValuesType,PropsType>({
    form: "post"
})(AddPostForm)

