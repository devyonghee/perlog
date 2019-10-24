const {app, BrowserWindow} = require('electron');
const path = require('path');
const glob = require('glob');

if (handleSquirrelEvent()) {
    return;
}

function handleSquirrelEvent() {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function(command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
        } catch (error) {}

        return spawnedProcess;
    };

    const spawnUpdate = function(args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            spawnUpdate(['--createShortcut', exeName]);
            setTimeout(app.quit, 1000);
            return true;

        case '--squirrel-uninstall':
            spawnUpdate(['--removeShortcut', exeName]);
            setTimeout(app.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            app.quit();
            return true;
    }
}
let mainWindow = null;

const files = glob.sync(path.join(__dirname, 'main/*.js'));
files.forEach((file) => require(file));

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
        console.log(devUrl);
        return mainWindow.loadURL(devUrl);
    }

    // mainWindow.loadFile(path.join(__dirname, './build/index.html'));
    mainWindow.loadURL('http://localhost:3000/');
};


app.on('ready', () => {
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