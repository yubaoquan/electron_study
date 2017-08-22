const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

let win;
function loadFile(src) {
    win.loadURL(url.format({
        pathname: path.join(__dirname, src),
        protocol: 'file:',
        slashes: true
    }));
}

function createWindow() {
    win = new BrowserWindow({
        width: 1000,
        height: 800
    });

    loadFile('index.html');

    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
    const webContents = win.webContents;

    webContents.on('did-finish-load', () => {
        webContents.send('hellow', '天王盖地虎');
    });

    ipcMain.on('password', (e, src) => {
        console.info(src);
        webContents.send('check', {
            pass: src === '宝塔镇河妖'
        });
    });
}

app.on('ready', createWindow);

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
