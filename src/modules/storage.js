import { FILE } from './utils';
import colors  from './file/colors';

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
    localStorage.setItem('files', JSON.stringify(files.map(serializeFiles)));
    return files;
};

const assignColor = file => {
    if (!file) return;
    if (file.type === FILE) {
        file.color = colors.next().value;
        return;
    }
    if (!Array.isArray(file.child)) return;
    file.child.map(assignColor);
};

export const loadFiles = () => {
    const files = JSON.parse(localStorage.getItem('files'));
    if (!Array.isArray(files)) return [];
    files.forEach(assignColor);
    return files;
};