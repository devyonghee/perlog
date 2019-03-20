import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import styles from "./styles.module.scss";

function Header() {
    return (
        <AppBar position='static' color='inherit' className={styles.app_bar}>
            <Toolbar className={styles.toolbar}>
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                >
                    <MenuIcon/>
                </IconButton>
                <Typography className={styles.title} variant="h6" color="inherit" noWrap>
                    Material-UI
                </Typography>
                <div className={styles.grow} />
                <div className={styles.search}>
                    <div className={styles.search_icon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: styles.input_root,
                            input: styles.input_input,
                        }}
                    />
                </div>
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
};

export default Header;