import { FILE } from './utils';

const serializeFiles = ({ ...file }) => {
    if (file.type === FILE) {
        file.watch = false;
        return file;
    }

    file.extended = false;
    if (file.child && file.child.length) {
        file.child = file.child.map(serializeFiles);
    }
    return file;
};

export const saveFiles = files => {
    window.localStorage.setItem('files', JSON.stringify(files.map(serializeFiles)));
    return files;
};

export const loadFiles = () => {
    const files = JSON.parse(window.localStorage.getItem('files'));
    return Array.isArray(files) ? files : [];
};