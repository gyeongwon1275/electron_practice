const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      webSecurity: false,
      preload: path.join(__dirname, "preload.ts"),
      contextIsolation: true,
    },
  });
  win
    .loadURL(
      url.format({
        pathname: path.join(__dirname, "./public/index.html"),
        protocol: "file:",
        slashes: true,
      })
    )
    .finally(() => {});
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
