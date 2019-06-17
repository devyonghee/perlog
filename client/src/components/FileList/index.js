import React, {Fragment} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import ArrowRightIcon from '@material-ui/icons/ArrowRightRounded';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDownRounded';
import Switch from '@material-ui/core/Switch';
import ListItemText from '@material-ui/core/ListItemText';
import {useTheme} from '@material-ui/styles';
import useStyles from './styles';
import HighLighter from "../Highlighter";

const fileShape = PropTypes.shape({
    child: PropTypes.array,
    parent: PropTypes.object,
    name: PropTypes.string,
    path: PropTypes.string,
    isDirectory: PropTypes.bool,
});

const propTypes = {
    files: PropTypes.arrayOf(fileShape),
    filterString: PropTypes.string,
    extendedDirectories: PropTypes.arrayOf(fileShape),
    watchedFiles: PropTypes.arrayOf(fileShape),
    selectedFile: fileShape,
    depth: PropTypes.number,
    dense: PropTypes.bool,
    draggable: PropTypes.bool,
    invisibleSwitch: PropTypes.bool,
    invisibleLoading: PropTypes.bool,
    handleClickFile: PropTypes.func,
    handleFileWatchSwitch: PropTypes.func,
    handleContextMenuList: PropTypes.func,
    handleDragStartList: PropTypes.func,
    handleDoubleClickFile: PropTypes.func.isRequired,
};

const defaultProps = {
    files: null,
    filterString: '',
    depth: 0,
    indexes: [],
    dense: false,
    draggable: false,
    invisibleWhenEmpty: false,
    handleClickFile: () => null,
    handleDragStartList: () => null,
    handleContextMenuList: () => null,
    handleFileWatchSwitch: () => null,
};


const FileList = props => {
    const {
        files,
        filterString,
        selectedFile,
        depth,
        watchedFiles,
        extendedDirectories,
        dense,
        invisibleSwitch,
        invisibleLoading,
        handleClickFile,
        handleDoubleClickFile,
        handleFileWatchSwitch,
        handleContextMenuList,
        handleDragStartList,
        draggable
    } = props;

    const classes = useStyles();
    const theme = useTheme();

    return files.map((file, index) => {
        const regexp = new RegExp(filterString, 'gi');
        if (!!filterString && !file.isDirectory && !regexp.test(file.name)) return null;
        return (
            <Fragment key={index}>
                <ListItem
                    onDragStart={e => draggable && handleDragStartList(e, file)}
                    draggable={draggable}
                    className={classes.listItem}
                    selected={!!selectedFile && file === selectedFile}
                    style={{paddingLeft: `${depth * 20}px`, height: dense ? '25px' : '45px'}}
                    onClick={e => (!dense && file.isDirectory) ? handleDoubleClickFile(e, file) : handleClickFile(e, file)}
                    onDoubleClick={e => dense && handleDoubleClickFile(e, file)}
                    onContextMenu={e => !dense && handleContextMenuList(e, file)}
                >
                    <ListItemIcon className={classes.iconWrap}>
                        {file.isDirectory ?
                            (<Fragment>
                                {extendedDirectories.includes(file) ?
                                    <ArrowDropDownIcon
                                        className={classes.arrowIcon}
                                        onClick={e => handleDoubleClickFile(e, file)}/> :
                                    <ArrowRightIcon
                                        className={classes.arrowIcon}
                                        onClick={e => handleDoubleClickFile(e, file)}/>}
                                <FolderIcon className={classes.iconMargin}
                                            style={dense ? {height: theme.spacing.unit * 2} : null}/>
                            </Fragment>) :
                            <FileIcon className={classNames(classes.arrowMargin, classes.iconMargin)}
                                      style={dense ? {height: theme.spacing.unit * 2} : null}/>
                        }
                    </ListItemIcon>
                    <ListItemText className={classes.textList}
                                  primary={<Typography className={classes.text}>
                                      {file.isDirectory ? file.name :
                                          <HighLighter regexp={regexp}>{file.name}</HighLighter>}
                                  </Typography>}/>
                    {!invisibleSwitch && !file.isDirectory ?
                        <Switch
                            classes={{
                                root: classes.switchRoot,
                                switchBase: classes[`colorSwitchBase${file.color}`],
                                checked: classes[`colorSwitchChecked${file.color}`],
                                bar: classes[`colorSwitchBar${file.color}`],
                            }}
                            onChange={e => handleFileWatchSwitch(e, file)}
                            checked={watchedFiles.includes(file)}/> : null}
                </ListItem>
                <Collapse in={extendedDirectories.includes(file)} timeout='auto'>
                    {(!file.child || !file.child.length) ? (
                            <ListItem className={classes.emptyText}>
                                <ListItemText
                                    className={classes.textList}
                                    style={{paddingLeft: `${(theme.spacing.unit * 3) * (depth + 1)}px`}}
                                    disableTypography
                                    primary={!file.child && !invisibleLoading ? '...loading' : '빈 폴더입니다.'}/>
                            </ListItem>) :
                        <FileList {...props} depth={depth + 1} files={file.child}/>
                    }
                </Collapse>
            </Fragment>
        )
    });

};

FileList.propTypes = propTypes;
FileList.defaultProps = defaultProps;

export default FileList;