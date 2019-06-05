const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');
const glob = require('glob');

let mainWindow = null;

const files = glob.sync(path.join(__dirname, 'main/*.js'));
files.forEach((file) => require(file));

const createWindow = (dev = true, devUrl = '') => {
    const windowOption = {
        width: 1100,
        height: 960,
        icon: path.join(__dirname, (dev) ? './public/favicon.png' : './build/favicon.png'),
        webPreferences: {
            nodeIntegration: true,
            preload: __dirname + '/preload.js'
        }
    };
    const mainWindow = new BrowserWindow(windowOption);

    if (dev) {
        mainWindow.webContents.openDevTools();
        const {default: installExtension, REACT_DEVELOPER_TOOLS} = require('electron-devtools-installer');
        installExtension(REACT_DEVELOPER_TOOLS).then((name) => console.log(`Added Extension:  ${name}`));
        return mainWindow.loadURL(devUrl);
    }

    mainWindow.loadFile(path.join(__dirname, './build/index.html'));
};


app.on('ready', () => {
    (/--dev/.test(process.argv[2])) ? require('./scripts/start')(createWindow) : createWindow(false);
});
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