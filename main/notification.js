const {ipcMain, BrowserWindow, Notification, dialog} = require('electron');
const path = require('path');

ipcMain.on('notice', (event, message, title = '오류') => {
    dialog.showErrorBox(title, message);
});

ipcMain.on('alert-message', (event, title, message) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win.isMinimized()) return;

    const option = {
        title: title,
        body: message,
        icon: path.join(__dirname, (/--dev/.test(process.argv[2])) ? '../public/favicon.ico' : '../build/favicon.ico')
    };

    const notification = new Notification(option);
    notification.once("click", () => win.show());
    notification.show();
});
