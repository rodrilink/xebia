import React from 'react';
import { CssBaseline, makeStyles } from '@material-ui/core';
import Sidebar from './molecules/Sidebar';
import Header from './molecules/Header';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        flexGrow: 1,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    menuShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarMenuButton: {
        marginRight: 2,
    },
    appBarTitle: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        marginTop: 64
    },
}));

const Base: React.FC = ({ children }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const toggleMenu = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header classes={classes} toggleMenu={toggleMenu} />
            <Sidebar classes={classes} openMenu={open} >
                {children}
            </Sidebar>
        </div>
    )
};

export default Base;
