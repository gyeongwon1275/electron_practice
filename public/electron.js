const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const isDev = require('electron-is-dev')
const updater = require('electron-updater')

updater.autoUpdater.checkForUpdatesAndNotify()

let mainWindow
let splash

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 1200,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      autoHideMenuBar: true,
    },
    frame: true,
  })

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
  isDev && mainWindow.webContents.openDevTools()

  mainWindow.webContents.on('did-finish-load', () => {
    if (splash) {
      splash.close()
    }
    mainWindow.show()
  })
  app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')
  mainWindow.on('closed', () => (mainWindow = null))
}

const createSplash = () => {
  splash = new BrowserWindow({
    width: 900,
    height: 500,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
  })

  splash.loadURL(`file://${path.join(__dirname, '../build/splash.html')}`)
  splash.on('closed', () => (splash = null))
  splash.webContents.on('did-finish-load', () => {
    splash.show()
  })
}

app.on('ready', () => {
  createSplash()
  setTimeout(() => {
    createWindow()
  }, 3500)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
  }
})
