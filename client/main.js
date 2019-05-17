const {app, BrowserWindow, Menu} = require('electron');
const url = require('url');
const path = require('path');
const glob = require('glob');

let mainWindow = null;

const files = glob.sync(path.join(__dirname, 'main/*.js'));
files.forEach((file) => require(file));

const createWindow = () => {
    const windowOption = {
        width: 1100,
        height: 960,
        icon: path.join(__dirname, './public/favicon.png'),
        webPreferences: {
            nodeIntegration: true,
            preload: __dirname + '/preload.js'
        }
    };
    const mainWindow = new BrowserWindow(windowOption);

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, './build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);

    if (/--debug/.test(process.argv[2])) {
        mainWindow.webContents.openDevTools();
        const {default: installExtension, REACT_DEVELOPER_TOOLS} = require('electron-devtools-installer');
        installExtension(REACT_DEVELOPER_TOOLS).then((name) => console.log(`Added Extension:  ${name}`));
    }
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    app.quit()
});
app.on('activate', () => (mainWindow === null) && createWindow());

if (!process.mas) {
    app.requestSingleInstanceLock();
    app.on('second-instance', () => {
        if (!mainWindow) return;
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus()
    });
}