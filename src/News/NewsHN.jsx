import React from "react";
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {red} from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paginator from "../utils/Paginator/Paginator";
import Grid from '@material-ui/core/Grid';
import Selector from "../utils/Selector/Selector";
import Search from "../utils/Search/Search";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        //marginRight: 30
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(360deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(90deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));


const NewsHN = ({
                  articles, pageSize, currentPage, onPageNewsChanged, optionsForNews,
                  handlePageSize, handleSearchNews, totalResults, messageError
              }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [newsId, setNewsId] = React.useState(false);



    return <>
        <Paginator pageSize={pageSize} currentPage={currentPage} totalItemsCount={totalResults}
                   onPageChanged={onPageNewsChanged}/>
        {messageError && <Alert severity="warning">{messageError}</Alert>}
        <Grid container spacing={3} justify="center" alignItems="flex-end">
            <Grid item xs={3}>
                <Search handleSearch={handleSearchNews}/>
            </Grid>
            <Grid item xs={3}>
                <Selector options={optionsForNews} value={pageSize} handlePageSize={handlePageSize}/>
            </Grid>
        </Grid>

        <Grid container spacing={3} >
            {articles.map(article => {
                return <Grid key={article.objectID} item xs={4}> <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {article.author}
                            </Avatar>
                        }
                        title={article.title}
                        subheader={`${article.created_at.slice(8, 10)}.${article.created_at.slice(5, 7)}
                .${article.created_at.slice(0, 4)} - ${article.created_at.slice(11, 13)}.${article.publishedAt.slice(14, 16)}`}
                    />
                    <CardMedia
                        className={classes.media}
                   
                        title={article.author}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {article.story_text}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen && newsId === article.source.id]: expanded,
                            })}
                            onClick={() => {
                                setNewsId(article.source.id)
                                setExpanded(!expanded);
                            }}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon/>
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>{article.story_text}</Typography>
                        </CardContent>
                    </Collapse>
                </Card>
                </Grid>
            })}
        </Grid>

    </>
}

export default NewsHN