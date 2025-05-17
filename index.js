const { app, BrowserWindow } = require('electron/main')
const { getToken } = require('./auth.js');
//auto reloader 

const electronReload = require('electron-reload');
electronReload(__dirname);

if (module.hot) {
  module.hot.accept();
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 225,
    height: 325,
    webPreferences: {
      nodeIntegration: true, // ✅ Allow Node.js functions in the renderer process
      contextIsolation: false // ✅ Disable isolation so require() works
    }
  })

  win.removeMenu()
  win.loadFile("index.html")
   win.webContents.openDevTools();

}

app.whenReady().then(() => {
  //getToken();
  createWindow()
})

//music player 
