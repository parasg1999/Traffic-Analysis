import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Paper, Tab, Tabs } from '@material-ui/core';
import { firestore } from '../firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function FolderList() {
    const classes = useStyles();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [listItems, setListItems] = useState([
    ]);

    useEffect(() => {
        firestore.collection('crashes').orderBy('date', 'desc').get()
            .then(docs => {
                const arr = [];
                docs.forEach(doc => {
                    arr.push({ ...doc.data() })
                })

                setListItems(arr);
            })
    }, [])

    return (
        <>
            <div style={{ marginTop: '4em' }}>
                <Paper square>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Cam-1" />
                        <Tab label="Cam-2" disabled />
                        <Tab label="Cam-3" disabled />
                    </Tabs>
                </Paper>
            </div>
            <List className={classes.root}>
                {listItems.map((item, index) => {
                    return (
                        <ListItem key={index}>
                            <ListItemText primary={`Place: ${item.place}`} secondary={`${new Date(item.date.seconds * 1000).toString().substring(0, 25)}`} />
                        </ListItem>
                    )
                })}
            </List>
        </>
    );
}
