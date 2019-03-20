import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ExpandMore from "@material-ui/icons/ExpandMore";
import styles from "./styles.module.scss";

const Sidebar = (props) => {
    return (
        <Hidden implementation="css">
            <Drawer variant="permanent" open classes={{paper:styles.drawer_paper}} >
                    <div className={styles.server}>
                        <div className={styles.server_host}>pdev2</div>
                        <div className={styles.server_name}>server</div>
                        <ExpandMore className={styles.expand}/>
                    </div>
                    <Divider />
                    <div className={styles.sidebar_wrapper}>
                        <ListItem button className={styles.list}>
                            <ListItemText primary={'test'} className={styles.list_item} />
                        </ListItem>
                        <ListItem className={styles.list}>
                            <ListItemText primary={'test'} className={styles.list_item} />
                        </ListItem>
                    </div>
            </Drawer>
        </Hidden>
    );
};

export default Sidebar;
