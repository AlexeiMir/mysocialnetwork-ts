import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(5),
        },
    },
}));

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber:number) => void
}

const Paginator:React.FC<PropsType> = ({totalItemsCount,pageSize,currentPage,onPageChanged}) => {

    let pagesCount = Math.ceil(totalItemsCount/pageSize)
    const handleChange = (pageNumber) => {
        onPageChanged(pageNumber);
    };

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Pagination count={pagesCount} color="primary" page={currentPage} onChange={handleChange} />

        </div>
    );



}

export default Paginator