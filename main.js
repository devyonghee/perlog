const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const glob = require('glob');
const { autoUpdater } = require('electron-updater');

let mainWindow = null;
const files = glob.sync(path.join(__dirname, 'main/*.js'));
files.map(file => require(file));

autoUpdater.setFeedURL({
    provider: 'github',
    repo: 'remolog',
    owner: 'devyonghee',
    token: 'token'
});

autoUpdater.on('update-downloaded', (vent, releaseNotes, releaseName) => {
    const dialogOpts = {
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: 'Application Update',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail: '새로운 버전이 다운로드 되었습니다. 애플리케이션을 재시작하여 업데이트를 적용해 주세요.'
    };

    dialog.showMessageBox(dialogOpts, response => {
        if (response === 0) autoUpdater.quitAndInstall()
    });
});


const createWindow = (dev = true, devUrl = '') => {
    const windowOption = {
        width: 1100,
        height: 960,
        icon: path.join(__dirname, (dev) ? './public/favicon.ico' : './build/favicon.ico'),
        webPreferences: {
            nodeIntegration: true,
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
    autoUpdater.checkForUpdatesAndNotify();

    (/--dev/.test(process.argv[2])) ? require('./scripts/start')(createWindow) : createWindow(false);
});

app.on('window-all-closed', () => {
    app.quit()
});

app.on('activate', () => {
    if (mainWindow === null) {
        (/--dev/.test(process.argv[2])) ? require('./scripts/start')(createWindow) : createWindow(false);
    }
});

if (!process.mas) {
    app.requestSingleInstanceLock();
    app.on('second-instance', () => {
        if (!mainWindow) return;
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus()
    });
}