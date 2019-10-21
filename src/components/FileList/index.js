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
import useStyles from './styles';
import HighLighter from '../Highlighter';
import { DIRECTORY, FILE, SERVER } from 'src/modules/utils';

const fileShape = PropTypes.shape({
    child: PropTypes.array,
    parent: PropTypes.object,
    name: PropTypes.string,
    path: PropTypes.string,
    isDirectory: PropTypes.bool,
});

const propTypes = {
    files: PropTypes.arrayOf(fileShape),
    regexp: PropTypes.instanceOf(RegExp),
    parent: PropTypes.object,
    selectedTarget: PropTypes.object,
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
    files: null,
    parent: null,
    regexp: null,
    depth: 0,
    indexes: [],
    dense: false,
    draggable: false,
    invisibleWhenEmpty: false,
    handleClickFile: () => null,
    handleContextMenuList: () => null,
    handleFileWatchSwitch: () => null,
};

const ArrowIcon = (props) => {
    const Icon = (props.extended) ? ArrowDropDownIcon : ArrowRightIcon;
    return (<Icon {...props}/>);
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
    return <Icon {...props}/>;
};


const FileList = props => {
    const {
        files,
        parent,
        regexp,
        selectedTarget,
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

    return files.filter(file => !parent ? !file.parent : file.parent && file.parent === parent).map((curFile, index) => {
        if (regexp && !curFile.isDirectory && !curFile.name.match(regexp)) return null;
        return (
            <Fragment key={index}>
                <ListItem
                    className={classes.listItem}
                    selected={curFile === selectedTarget}
                    onClick={handleClickFile(curFile)}
                    onDoubleClick={handleDoubleClickFile(curFile)}
                    onContextMenu={handleContextMenuList(curFile)}
                >
                    <ListItemIcon className={classes.iconWrap}>
                        {curFile.type !== FILE &&
                        <ArrowIcon
                            onClick={handleDoubleClickFile(curFile)}
                            className={classes.arrowIcon}
                            extended={curFile.extended}/>}
                        <IconByType type={curFile.type} className={classes.iconMargin}/>
                    </ListItemIcon>
                    <ListItemText primary={
                                      <Typography>
                                          {regexp && curFile.type === FILE ? curFile.name :
                                              <HighLighter regexp={regexp}>{curFile.name}</HighLighter>}
                                      </Typography>
                                  }
                    />
                    {switchable && curFile.type === FILE ?
                        <Switch
                            classes={{
                                root: classes.switchRoot,
                                switchBase: classes[`colorSwitchBase${curFile.color}`],
                                checked: classes[`colorSwitchChecked${curFile.color}`],
                                track: classes[`colorSwitchBar${curFile.color}`],
                            }}
                            onChange={handleFileWatchSwitch(curFile)}
                            checked={false}/> : null}
                </ListItem>
                {!curFile.extended ? null :
                    (files.filter(file => file.parent === curFile)).length ?
                        <FileList {...props} parent={curFile} depth={depth + 1}/> : (
                        <ListItem className={classes.emptyText}>
                            <ListItemText
                                className={classes.textList}
                                disableTypography
                                primary={!curFile.child && lazyLoading ? '...loading' : '빈 폴더입니다.'}/>
                        </ListItem>)
                }
            </Fragment>
        )
    });

};

FileList.propTypes = propTypes;
FileList.defaultProps = defaultProps;

export default FileList;