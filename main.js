const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
  // Create the Browser Window
  win = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#ffffff',
  });

  // Set the application icon
  const iconPath = path.join(__dirname, 'dist/Angular-Electron-Timer', 'assets', 'Timer.png');
  win.setIcon(iconPath);

  win.loadFile(path.join(__dirname, 'dist', 'Angular-Electron-Timer/index.html'));

  // Dev Tools von dem Chromium Browser
  win.webContents.openDevTools();

  // Create Window on Electron Initialization
  win.on('closed', function () {
    win = null;
  });
}

// Quit when all windows are closed
app.on('ready', () => {
  createWindow();
  // Set app icon in the dock
  const iconPath = path.join(__dirname, 'dist/Angular-Electron-Timer', 'assets', 'Timer.png');
  app.dock.setIcon(iconPath);
});

app.on('window-all-closed', function () {
  // On MacOS specific close process
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On MacOS specific close process
  if (win === null) {
    createWindow();
  }
});
