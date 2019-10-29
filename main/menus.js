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
        label: 'Window',
        submenu: [
            { role: 'reload' },
            {
                label: 'minimize',
                role: 'minimize',
            },
            {
                label: 'Devtools',
                role: 'toggleDevTools',
            },
        ]
    },

    {
        label: 'System',
        submenu: [
            {
                label: 'data remove',
                click: () => window.localStorage.removeItem('files'),
            },
        ]
    }

];

app.on('ready', () => {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});

