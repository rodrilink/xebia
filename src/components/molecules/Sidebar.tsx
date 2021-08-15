import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { changeTopic } from '../../store/topic/topic.action';
import { selectName } from '../../store/topic/topic.selector';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@material-ui/core';
import LocalActivityIcon from '@material-ui/icons/LocalActivity';

interface IProps {
    changeTopic?: typeof changeTopic,
    classes: any;
    openMenu: boolean;
}

const Sidebar: FC<IProps> = ({ classes, openMenu, children }) => {
    const topicName = useSelector(selectName()) as string;
    const [topics, setTopic] = useState<string[]>([]);

    useEffect(() => {
        if (!topicName) return;

        setTopic((prevTopics) => [...prevTopics, topicName]);
    }, [topicName]);

    return (
        <>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                classes={{
                    paper: classes.drawerPaper,
                }}
                open={openMenu}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem key={'Log'} >
                            <ListItemText primary={'Topic Log'} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {topics.map((text) => (
                            <ListItem button key={text}>
                                <ListItemIcon><LocalActivityIcon /></ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                {children}
            </main>
        </>
    );
}

export default Sidebar;