const { app, Menu } = require('electron');

const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Exit',
                role: 'quit',
            }
        ]
    },
    {
        label: 'view',
        submenu: [
            { role: 'reload' },
            { role: 'togglefullscreen' },
        ]
    },
    {
        label: 'window',
        submenu: [
            { role: 'minimize' },
            { role: 'close' }
        ]
    },
];

app.on('ready', () => {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});

