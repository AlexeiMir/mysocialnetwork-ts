import {Field, reduxForm} from "redux-form";
import React from "react";
import handleSubmit from "redux-form/lib/handleSubmit";
import {renderTextField} from "../../../../FormsControls/FormsControls";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import s from "./AddPostForm.module.css"


const AddPostForm = (props) => {
    const {handleSubmit,pristine,submitting,photo} = props

    return <div>
        <form onSubmit={handleSubmit}>
            <div className={s.postBlock}>
                <Avatar className={s.imagePost} src={photo}/>
                <Field className={s.post} name={"newPostText"} component={renderTextField} label="Post" multiline={true} rows={3}/>
                <Button type="submit" disabled={pristine || submitting} className={s.buttonPost}
                        variant="outlined" size="small" color="primary" component='button' >
                    Post
                </Button>
            </div>

        </form>
    </div>

}

const AddPostFormRedux = reduxForm({
    form: "post"
})(AddPostForm)

export default AddPostFormRedux;