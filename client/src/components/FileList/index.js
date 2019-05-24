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
    handleDoubleClickFile: PropTypes.func,
    handleContextMenuList: PropTypes.func,
    handleFileWatchSwitch: PropTypes.func,
    handleClickFile: PropTypes.func
};

const defaultProps = {
    files: null,
    depth: 0,
    indexes: [],
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
        handleClickFile,
        handleDoubleClickFile,
        handleFileWatchSwitch,
        handleContextMenuList
    } = props;

    const classes = useStyles();
    if (files === null || !files.length) {

        return (
            <ListItem>
                <ListItemText
                    className={classes.textList} style={{paddingLeft: `${depth * 20}px`}}
                    primary={!!files ? '...loading' : '비어있는 폴더입니다.'}/>
            </ListItem>
        );
    }

    return files.map((file, index) => {
        const currentIndexes = [...indexes, index];
        return (
            <Fragment key={index}>
                <ListItem
                    className={classes.listItem}
                    selected={!!selectedFile && file === selectedFile}
                    style={{paddingLeft: `${depth * 20}px`}}
                    onClick={e => handleClickFile(e, file)}
                    onDoubleClick={e => handleDoubleClickFile(e, file, currentIndexes)}
                    onContextMenu={e => handleContextMenuList(e, file)}
                >
                    <ListItemIcon className={classes.iconWrap}>
                        {file.isDirectory ?
                            (<Fragment>
                                {createElement(file.isExtended ? ArrowDropDownIcon : ArrowRightIcon, {
                                    onClick: e => handleDoubleClickFile(e, file, currentIndexes),
                                    className: classes.arrowIcon
                                })}
                                <FolderIcon className={classes.icon}/>
                            </Fragment>) :
                            <FileIcon className={classNames(classes.icon, classes.fileIcon)}/>
                        }
                    </ListItemIcon>
                    <ListItemText className={classes.textList} primary={<Typography>{file.name}</Typography>}/>
                    {!file.isDirectory && !!handleFileWatchSwitch ?
                        <Switch classes={{
                            switchBase: classes[`colorSwitchBase${file.color}`],
                            checked: classes[`colorSwitchChecked${file.color}`],
                            bar: classes[`colorSwitchBar${file.color}`],
                        }} onChange={e => handleFileWatchSwitch(e.target.checked, file)} checked={file.watch}/> : null}
                </ListItem>
                {file.isExtended ?
                    <FileList {...props} indexes={currentIndexes} depth={depth + 1} files={file.child}/> : null}
            </Fragment>
        )
    });

};

FileList.propTypes = propTypes;
FileList.defaultProps = defaultProps;

export default FileList;