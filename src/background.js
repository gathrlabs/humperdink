"use strict";

import { app, protocol, BrowserWindow, ipcMain, autoUpdater } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";

const isDevelopment = process.env.NODE_ENV !== "production";

if (! isDevelopment) {
  const server = 'humperdink-releases-inc89ot0r-gathrlabs.vercel.app';
  const url = `${server}/update/${process.platform}/${app.getVersion()}`;

  autoUpdater.setFeedURL({ url });

  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, 1000);
}

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: false, standard: true } },
]);

ipcMain.handle("getPrinters", async (event, someArgument) => {
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  return win.webContents.getPrinters();
});

ipcMain.handle("print", function (_, url, deviceName) {
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(url);

  const options = {
    silent: true,
    margins: "printableArea",
    deviceName: deviceName,
    pageSize: {
      height: 152400,
      width: 101600,
    },
  };

  win.webContents.on("page-title-updated", (event, title) => {
    if (title === "ready") {
      win.webContents.print(options, (success, failureReason) => {
        console.log(success, failureReason);
        if (!success) console.log(failureReason);
      });
    }
  });
});

ipcMain.handle("printDocument", function (_, url, deviceName) {
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(url);

  const options = {
    silent: true,
    deviceName: deviceName,
    margins: "printableArea",
    pageSize: "A4",
  };

  win.webContents.on("did-finish-load", () => {
    win.webContents.print(options, (success, failureReason) => {
      if (!success) console.log(failureReason);
    });
  });
});

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
