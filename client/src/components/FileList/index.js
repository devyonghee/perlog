import React, {Fragment, createElement} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
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

const propTypes = {
    files: PropTypes.arrayOf(
        PropTypes.shape({
            child: PropTypes.array,
            name: PropTypes.string,
            path: PropTypes.string,
            isDirectory: PropTypes.bool,
            isExtended: PropTypes.bool,
        })),
    depth: PropTypes.number,
    indexes: PropTypes.array,
    invisibleWhenEmpty: PropTypes.bool,
    handleDoubleClickFile: PropTypes.func,
    handleContextMenuList: PropTypes.func,
    handleFileWatchSwitch: PropTypes.func,
    handleClickFile: PropTypes.func
};

const defaultProps = {
    files: null,
    depth: 0,
    indexes: [],
    dense: false,
    invisibleWhenEmpty: false,
    handleDoubleClickFile: () => null,
    handleClickFile: () => null,
    handleContextMenuList: () => null,
    handleFileWatchSwitch: null,
};


const FileList = props => {
    const {
        files,
        selectedFile,
        depth,
        indexes,
        watchedFiles,
        extendedDirectories,
        dense,
        invisibleSwitch,
        invisibleLoading,
        handleClickFile,
        handleDoubleClickFile,
        handleFileWatchSwitch,
        handleContextMenuList
    } = props;

    const classes = useStyles();
    const theme = useTheme();

    return files.map((file, index) => {
        const currentIndexes = [...indexes, index];
        return (
            <Fragment key={index}>
                <ListItem
                    className={classes.listItem}
                    selected={!!selectedFile && file === selectedFile}
                    style={{paddingLeft: `${depth * 20}px`, height: dense ? '25px' : '45px'}}
                    onClick={e => handleClickFile(e, file)}
                    onDoubleClick={e => handleDoubleClickFile(e, file, currentIndexes)}
                    onContextMenu={e => handleContextMenuList(e, file)}
                >
                    <ListItemIcon className={classes.iconWrap}>
                        {file.isDirectory ?
                            (<Fragment>
                                {createElement(extendedDirectories.includes(file) ? ArrowDropDownIcon : ArrowRightIcon, {
                                    onClick: e => handleDoubleClickFile(e, file, currentIndexes),
                                    className: classes.arrowIcon
                                })}
                                <FolderIcon className={classes.iconMargin}
                                            style={{height: dense ? theme.spacing.unit * 2 : null}}/>
                            </Fragment>) :
                            <FileIcon className={classNames(classes.arrowMargin, classes.iconMargin)}
                                      style={{height: dense ? theme.spacing.unit * 2 : null}}/>
                        }
                    </ListItemIcon>
                    <ListItemText className={classes.textList}
                                  primary={<Typography className={classes.text}>{file.name}</Typography>}/>
                    {!invisibleSwitch && !file.isDirectory && handleFileWatchSwitch ?
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
                {
                    (extendedDirectories.includes(file)) ?
                        (file.child === null || !file.child.length) ? (
                                <ListItem className={classes.emptyText}>
                                    <ListItemText
                                        style={{paddingLeft: `${(depth + 1) * 20}px`}}
                                        disableTypography
                                        primary={!!files && !invisibleLoading ? '...loading' : '빈 폴더입니다.'}/>
                                </ListItem>) :
                            <FileList {...props} indexes={currentIndexes} depth={depth + 1} files={file.child}/>
                        : null
                }
            </Fragment>
        )
    });

};

FileList.propTypes = propTypes;
FileList.defaultProps = defaultProps;

export default FileList;