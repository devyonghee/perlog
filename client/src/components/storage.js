import {colorsIndex} from './colors';

const serializeFiles = (file) => {
    file.parent = null;
    file.parent = null;
    if (!!file.child && file.child.length) file.child.map(serializeFiles);
    return file;
};

const connectParent = (file, parent = null) => {
    file.parent = parent;
    if (!file.isDirectory) file.color = colorsIndex.next().value;
    if (!!file.child && file.child.length) file.child.map(childFile => connectParent(childFile, file));
    return file;
};

export const saveFiles = files => {
    window.localStorage.setItem('files', JSON.stringify(files.map(serializeFiles)));
};

export const loadFiles = () => {
    const files = JSON.parse(window.localStorage.getItem('files')) || [];
    return files.map(file => connectParent(file))
};