const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
function loadFile(src) {
    win.loadURL(url.format({
        pathname: path.join(__dirname, src),
        protocol: 'file:',
        slashes: true
    }));
}

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1000,
        height: 800
    });

    loadFile('index.html');

    // 打开你喜欢的 DevTools, 看看你写的bug
    win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
