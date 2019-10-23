import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemIcon, ListItemText, Switch, Typography } from '@material-ui/core';
import {
    ArrowDropDown as ArrowDropDownIcon,
    ArrowRight as ArrowRightIcon,
    Computer as ComputerIcon,
    Folder as FolderIcon,
    InsertDriveFile as FileIcon
} from '@material-ui/icons';
import classNames from 'classnames';
import useStyles from './styles';
import HighLighter from '../Highlighter';
import { DIRECTORY, FILE, SERVER } from 'src/modules/utils';

const propTypes = {
    files: PropTypes.array,
    regexp: PropTypes.instanceOf(RegExp),
    index: PropTypes.array,
    selectedIndex: PropTypes.array,
    depth: PropTypes.number,
    dense: PropTypes.bool,
    draggable: PropTypes.bool,
    switchable: PropTypes.bool,
    lazyLoading: PropTypes.bool,
    handleClickFile: PropTypes.func,
    handleFileWatchSwitch: PropTypes.func,
    handleContextMenuList: PropTypes.func,
};

const defaultProps = {
    files: [],
    index: [],
    selectedIndex:[],
    parentIndex: -1,
    regexp: null,
    depth: 0,
    dense: false,
    draggable: false,
    invisibleWhenEmpty: false,
    handleClickFile: () => null,
    handleContextMenuList: () => null,
    handleFileWatchSwitch: () => null,
};

const ArrowIcon = ({ extended, onClick, className }) => {
    const Icon = (extended) ? ArrowDropDownIcon : ArrowRightIcon;
    return (<Icon onClick={onClick} className={className}/>);
};

const IconByType = (props) => {
    let Icon;
    switch (props.type) {
        case SERVER:
            Icon = ComputerIcon;
            break;
        case DIRECTORY:
            Icon = FolderIcon;
            break;
        default:
            Icon = FileIcon;
    }
    return <Icon className={props.className}/>;
};

const sortCompare = (preFile, curFile) => {
    if (preFile.type !== curFile.type) {
        return (preFile.type === DIRECTORY && curFile.type !== DIRECTORY) ? -1 : 1;
    }
    const icmp = preFile.name.toLowerCase().localeCompare(curFile.name.toLowerCase());
    if (icmp !== 0) return icmp;
    if (preFile.name > curFile.name) return 1;
    else if (preFile.name < curFile.name) return -1;
    else return 0;
};

const FileList = props => {
    const {
        files,
        index,
        regexp,
        selectedIndex,
        depth,
        dense,
        switchable,
        lazyLoading,
        handleClickFile,
        handleDoubleClickFile,
        handleFileWatchSwitch,
        handleContextMenuList,
    } = props;

    const classes = useStyles({ depth, dense });
    return files
        .filter(file => file.type !== FILE || !regexp || file.name.match(regexp))
        .sort(sortCompare).map(file => {
            const curIndex = files.indexOf(file);
            const indexRoute = index.concat(curIndex);

            return (
                <Fragment key={curIndex}>
                    <ListItem
                        className={classes.listItem}
                        selected={!!selectedIndex.length && indexRoute.join('&') === selectedIndex.join('&')}
                        onClick={handleClickFile(indexRoute)}
                        onDoubleClick={handleDoubleClickFile(indexRoute)}
                        onContextMenu={handleContextMenuList(indexRoute)}
                    >
                        <ListItemIcon
                            className={file.type === FILE ? classNames(classes.iconWrap, classes.iconPadding) : classes.iconWrap}>
                            <>
                                {file.type !== FILE &&
                                <ArrowIcon
                                    onClick={handleDoubleClickFile(indexRoute)}
                                    className={classes.arrowIcon}
                                    extended={file.extended}/>}
                                <IconByType type={file.type} className={classes.iconMargin}/>
                            </>
                        </ListItemIcon>
                        <ListItemText
                            className={classes.textList}
                            primary={
                                <Typography>
                                    {regexp && file.type === FILE ? file.name :
                                        <HighLighter regexp={regexp}>{file.name}</HighLighter>}
                                </Typography>
                            }
                        />
                        {switchable && file.type === FILE ?
                            <Switch
                                classes={{
                                    root: classes.switchRoot,
                                    switchBase: classes[`colorSwitchBase${file.color}`],
                                    checked: classes[`colorSwitchChecked${file.color}`],
                                    track: classes[`colorSwitchBar${file.color}`],
                                }}
                                onChange={handleFileWatchSwitch(file)}
                                checked={false}/> : null}
                    </ListItem>
                    {file.extended ?
                        (Array.isArray(file.child) && file.child.length) ?
                            <FileList {...props} files={file.child} index={indexRoute} depth={depth + 1}/> :
                            (<ListItem className={classes.emptyText}>
                                <ListItemText
                                    className={classes.textList}
                                    disableTypography
                                    primary={file.child && lazyLoading ? '...loading' : '빈 폴더입니다.'}/>
                            </ListItem>)
                        : null
                    }
                </Fragment>
            );
        });

};

FileList.propTypes = propTypes;
FileList.defaultProps = defaultProps;

export default FileList;