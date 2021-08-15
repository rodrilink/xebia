import { Component } from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

type HeaderProps = {
    // changeTheme: typeof changeTheme,
    classes: any,
    toggleMenu: () => void;
};

class Header extends Component<HeaderProps> {

    state = {
        navSearchOpen: false
    };

    render() {
        const { classes, toggleMenu } = this.props;

        return (
            <AppBar position="fixed"
                className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" onClick={toggleMenu} className={classes.appBarMenuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.appBarTitle}>
                        Xebia Code Exercice
                    </Typography>
                    <Button color="inherit">Go to code</Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;