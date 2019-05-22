import React, {Fragment} from 'react';
import classnames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import ArrowRightIcon from '@material-ui/icons/ArrowRightRounded';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDownRounded';
import ListItemText from '@material-ui/core/ListItemText';
import styles from './styles';


const propTypes = {
    files: PropTypes.array,
    depth: PropTypes.number,
    handleDoubleClickFile: PropTypes.func.isRequired
};

const defaultProps = {
    files: null,
    depth: 0,
};


const FileList = props => {
    const {classes, handleDoubleClickFile, files, selectedFile, handleSelectFile, depth} = props;

    if (files === null || !files.length) {
        return (
            <ListItem>
                <ListItemText
                    className={classes.textList} style={{paddingLeft: `${depth * 20}px`}}
                    primary={!!files ? '...loading' : '비어있는 폴더입니다.'}/>
            </ListItem>
        );
    }

    return files.map((file, index) => (
        <Fragment key={index}>
            <ListItem
                dense
                className={classes.listItem}
                onDoubleClick={(e) => handleDoubleClickFile(e, file)}
                selected={!!selectedFile && file.is(selectedFile)}
                onClick={e => handleSelectFile(e, file)}
                style={{paddingLeft: `${depth * 20}px`}}
            >
                <ListItemIcon className={classes.iconWrap}>
                    {file.isDirectory ?
                        (<Fragment>
                            {file.isExtended ? <ArrowDropDownIcon/> : <ArrowRightIcon/>}
                            <FolderIcon className={classes.filesIcon}/>
                        </Fragment>) :
                        <FileIcon className={classnames(classes.filesIcon, classes.fileIcon)}/>
                    }
                </ListItemIcon>
                <ListItemText className={classes.textList} primary={<Typography>{file.name}</Typography>}/>
            </ListItem>
            {file.isExtended ? <FileList {...props} depth={depth+1} files={file.child}/> : null}
        </Fragment>
    ));

};

FileList.propTypes = propTypes;
FileList.defaultProps = defaultProps;

export default withStyles(styles)(FileList);