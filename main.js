const {app, BrowserWindow, globalShortcut} = require('electron'), path = require('path'), url = require('url'),
  storage = require('electron-json-storage'), winWidth = 640, winHeight = 480;
let mainWindow;

createWindow = function(){
  mainWindow = new BrowserWindow({
    width: winWidth,
    height: winHeight,
    minWidth: winWidth,
    minHeight: winHeight
  });
  mainWindow.setMenu(null);
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  globalShortcut.register('CommandOrControl+D', () => {
    if(mainWindow.webContents.isDevToolsOpened() == false){
      mainWindow.webContents.openDevTools();} else {
      mainWindow.webContents.closeDevTools();}
  })
  mainWindow.on('closed', () => {
    mainWindow = null
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if(process.platform != 'darwin') app.quit();
});
app.on('activate', () => {
  if(mainWindow == null) createWindow();
});