const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;

let win;

function createWindow() {
  const server = require('./server.js');
  const LOCALHOST = require('./constants/index').LOCALHOST;
  
  win = new BrowserWindow({width: 900, height: 700, useContentSize: true});
  win.loadURL(LOCALHOST);


  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

