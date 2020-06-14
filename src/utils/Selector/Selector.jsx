import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const Selector = ({handlePageSize,options,value}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

const handleOpen = () => {
    setOpen(true)
}

const handleClose = () => {
    setOpen(false)
}

const handleChange = (e) => {
    handlePageSize(e.currentTarget.value)
}

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Set page size</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={value}
                    onChange={handleChange}
                >
                    {options.map(
                        option => <option key={option.title + option.value} value={option.value}>{option.title}</option> )}
                </Select>


            </FormControl>
        </div>
    )


}

export default Selector