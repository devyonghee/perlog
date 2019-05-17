const {ipcMain, dialog} = require('electron');

ipcMain.on('get-app-path', (event) => {
    const options = {
        type: 'question',
        buttons: ['Cancel', 'Yes, please', 'No, thanks'],
        defaultId: 2,
        title: 'Question',
        message: 'Do you want to do this?',
        detail: 'It does not really matter',
        checkboxLabel: 'Remember my answer',
        checkboxChecked: false,
    };

    const test = new Notification({title: '테스트'});
    test.show();
    dialog.showOpen(null, options, (response, checkboxChecked) => {
        event.sender.send('test');
        console.log(response);
        console.log(checkboxChecked);
    });
});



