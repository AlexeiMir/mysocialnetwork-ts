import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Paginator = ({totalItemsCount,pageSize,portionSize=10,currentPage,onPageChanged}) => {

    let pagesCount = Math.ceil(totalItemsCount/pageSize)
  /*  let pages = []
    for (let i=1;i<=pagesCount;i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pagesCount/portionSize)
    let [portionNumber,setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber-1)*portionSize + 1
    let rightPortionPageNumber = portionNumber*portionSize*/
    const handleChange = (event, value) => {
        onPageChanged(value);
    };

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Pagination count={pagesCount} color="primary" page={currentPage} onChange={handleChange} />

        </div>
    );



}

export default Paginator