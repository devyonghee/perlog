import {colorsIndex} from './file/colors';

const serializeFiles = ({...file}) => {
    file.parent = null;
    if (!!file.child && file.child.length) {
        file.child = file.child.map(serializeFiles);
    }
    return file;
};

const connectParent = (file, parent = null) => {
    file.parent = parent;
    if (!file.isDirectory) file.color = colorsIndex.next().value;
    if (!!file.child && file.child.length) file.child.map(childFile => connectParent(childFile, file));
    return file;
};

export const saveFiles = files => {
    const server = getServer();
    if (!server.url) return;
    window.localStorage.setItem('files', JSON.stringify({url: server.url, files: files.map(serializeFiles)}));
};

export const loadFiles = () => {
    const files = JSON.parse(window.localStorage.getItem('files'));
    if (!files || typeof files !== 'object' || !files.hasOwnProperty('url') || !files.hasOwnProperty('files') || !Array.isArray(files.files)) {
        window.localStorage.removeItem('files');
        return [];
    }
    return files.files.map(file => connectParent(file))
};

export const saveServer = (url, token) => {
    if (!url || !token) return;
    const server = JSON.parse(window.localStorage.getItem('server'));
    if (!server || !server.url || server.url.replace(/\/$/g, '') !== url.replace(/\/$/g, '')) {
        window.localStorage.removeItem('files');
    }

    window.localStorage.setItem('server', JSON.stringify({ url, token }));
};

export const removeServerToken = (url) => {
    if (!url) return;
    const server = JSON.parse(window.localStorage.getItem('server'));
    if (server && server.url && server.url.replace(/\/$/g, '') === url.replace(/\/$/g, '')) {
        window.localStorage.setItem('server', JSON.stringify({ url }))
    }

};

export const getServer = () => {
    const server = JSON.parse(window.localStorage.getItem('server'));

    if (!server || !server.hasOwnProperty('url')) {
        window.localStorage.removeItem('server');
        return { url: '' };
    }

    return server;
};