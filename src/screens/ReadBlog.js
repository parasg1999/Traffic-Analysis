import React, { useState, useEffect } from 'react';
import {  Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Skeleton } from '@material-ui/lab';
import {
    useParams
} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    paper: {
        margin: theme.spacing(8),
        marginBottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    button: {
        margin: theme.spacing(0, 2, 0, 0),
    },
    margin: {
        marginLeft: theme.spacing(8),
        marginRight: theme.spacing(8),
    },
    theEnd: {
        ...theme.typography.button,
    },
}));

export default function ReadBlog(props) {

    const classes = useStyles();
    const { id } = useParams();

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState('');
    const [newContent, setNewContent] = useState(null);
    const [ports, setPorts] = useState(null);

    useEffect(() => {
        // console.log(id)
        axios.get(`/blog/${id}`)
            .then(res => {
                setNewContent(res.data.node.properties.label)
                setPorts(res.data.node.ports);
                setTitle(res.data.blog.title)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const getNewContenthandler = (nextId) => {
        console.log(nextId);
        axios.get(`/blog/node/${nextId}`)
            .then(res => {
                setContent(`${content}\n${newContent}`);
                setNewContent(res.data.node.properties.label)
                setPorts(res.data.node.ports);
            })
            .catch(err => console.log(err))
    }

    if (title) {
        const buttons = ports.map(port => {
            if (port.type === 'output') {
                return (<Button key={port._id} className={classes.button} variant="contained" color="primary" component="span" onClick={() => { getNewContenthandler(port.next) }}>{port.properties.value}</Button>)
            }
        })
        return (
            <>
                <div className={classes.paper}>
                    <Typography variant="h1">{title}</Typography>
                    {content &&
                        <Typography variant="h6">{content}</Typography>}
                    <br></br>
                    <Typography variant="h5">{newContent}</Typography>
                    <br></br>
                </div>
                <div className={classes.margin}>
                    {buttons.length > 1 ? buttons : <Typography className={classes.theEnd} color="primary">THE END<br></br>Go ahead and read some other stories</Typography>}
                </div>
            </>
        )
    } else {
        return (
            <div className={classes.paper}>
                <br></br>
                <Skeleton animation="wave" width='80%' height={100} variant="rect" />
                <br></br>
                <Skeleton animation="wave" width='80%' height={400} variant="rect" />
            </div>
        )
    }
}