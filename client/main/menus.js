const {app, Menu} = require('electron');

const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Window',
                role: 'newWindow',
            },
            {
                label: 'Exit',
                role: 'quit',
            }
        ]
    },
    {
        label: 'Themes',
        submenu: [
            {
                label: 'light',
                type: 'radio',
                checked: true,
                click: (item, focusedWindow) => {
                    if (item.checked) focusedWindow.send('changeThemes', 'light');
                }
            },
            {
                label: 'dark',
                type: 'radio',
                checked: false,
                click: (item, focusedWindow) => {
                    if (item.checked) focusedWindow.send('changeThemes', 'dark');
                }
            }
        ]
    },
    {
        label: 'Window',
        submenu: [
            {
                label: 'minimize',
                role: 'minimize',
            },
            {
                label: 'Devtools',
                role: 'toggleDevTools',
            },
        ]
    }
];

app.on('ready', () => {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu)
});