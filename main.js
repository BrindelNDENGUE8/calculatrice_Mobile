const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
let splashWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    icon: path.join(__dirname, 'image_pFd_icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('calculateur.html');

  // Montrer la fenêtre principale après 2 secondes
  setTimeout(() => {
    splashWindow.close();
    mainWindow.show();
  }, 2000); // ⏱️ délai de 2 secondes
}

function createSplashScreen() {
  splashWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    transparent: false,
    icon: path.join(__dirname, 'image_pFd_icon.ico'),
  });

  splashWindow.loadFile('splash.html');
}

app.whenReady().then(() => {
  createSplashScreen();
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createSplashScreen();
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
