<p align="center"><br><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="128" height="128" /></p>

<h3 align="center">Vite 4.0 Vue 3.2 SQLite App</h3>
<p align="center"><strong><code>vite-vue-sqlite-app</code></strong></p>
<p align="center">Vite 4.0 Vue 3.2 application demonstrating the use of the</p>
<p align="center"><a href="https://github.com/capacitor-community/sqlite"><strong><code>@capacitor-community/sqlite-plugin</code></strong></a></p>
<br>
<p align="center"><strong><code>this app uses Capacitor 4</code></strong></p>
<br>
<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2023?style=flat-square" />
  <a href="https://github.com/jepiqueau/vite-vue-sqlite-app"><img src="https://img.shields.io/github/license/jepiqueau/vite-vue-sqlite-app?style=flat-square" /></a>
  <a href="https://github.com/jepiqueau/vite-vue-sqlite-app"><img src="https://img.shields.io/github/package-json/v/jepiqueau/vite-vue-sqlite-app/master?style=flat-square" /></a>
   <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
   <a href="#contributors-"><img src="https://img.shields.io/badge/all%20contributors-1-orange?style=flat-square" /></a>
   <!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>



## Maintainers

| Maintainer        | GitHub                                    | Social |
| ----------------- | ----------------------------------------- | ------ |
| Quéau Jean Pierre | [jepiqueau](https://github.com/jepiqueau) |        |




## Installation

To start clone the project
```bash
git clone https://github.com/jepiqueau/vite-vue-sqlite-app.git 
cd vite-vue-sqlite-app
git remote rm origin
npm install
```

## Capacitor Config File

In the main folder of your app, you MUST have a `capacitor.config.ts` file 

```ts
import { CapacitorConfig } from '@capacitor/cli';

const appName: string = 'YOUR_APP_NAME';

const config: CapacitorConfig = {
  appId: 'YOUR_APP_ID', // ie com.jeep.app.vite.vue.sqlite
  appName: appName,
  webDir: 'dist',
  bundledWebRuntime: false,
  //  hideLogs: true,
  plugins: {
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/CapacitorDatabase',
      iosIsEncryption: false,
      iosKeychainPrefix: appName,
      iosBiometric: {
        biometricAuth: false,
        biometricTitle : "Biometric login for capacitor sqlite"
      },
      androidIsEncryption: false,
      androidBiometric: {
        biometricAuth : false,
        biometricTitle : "Biometric login for capacitor sqlite",
        biometricSubTitle : "Log in using your biometric"
      },
      electronWindowsLocation: "C:\\ProgramData\\CapacitorDatabases",
      electronMacLocation: "YOUR_VOLUME/CapacitorDatabases",
      electronLinuxLocation: "Databases"
    }
  }
};
export default config;
```

## WEB Quirks

```
npx run dev
```

## IOS Quirks

```
npm run ios:start
```

Once Xcode launches, you can build your app through the standard Xcode workflow.

## ANDROID Quirks

```
npm run android:start
```

Once Android Studio launches, make sure that you are using 
 - Gradle JDK version 11
 - Android Gradle Plugin Version 7.2.2
 - In variables.gradle

   ```
   minSdkVersion = 22
   compileSdkVersion = 33
   targetSdkVersion = 33
   ```
 - In AndroidManifest.xml
   ```
       <application
        android:allowBackup="false"
        android:fullBackupContent="false"
        android:dataExtractionRules="@xml/data_extraction_rules"
   ```
 - In res/xml create a file `data_extraction_rules.xml` containing:
   ```
   <?xml version="1.0" encoding="utf-8"?>
   <data-extraction-rules>
      <cloud-backup>
         <exclude domain="root" />
         <exclude domain="database" />
         <exclude domain="sharedpref" />
         <exclude domain="external" />
      </cloud-backup>
      <device-transfer>
         <exclude domain="root" />
         <exclude domain="database" />
         <exclude domain="sharedpref" />
         <exclude domain="external" />
      </device-transfer>
   </data-extraction-rules>
   ```

and build your app through the standard Android Studio workflow.

## ELECTRON Quirks

Make sure that the `package.json` file is as followed

```json
{
  "name": "vite-vue-sqlite-app",
  "version": "1.0.0",
  "description": "An Amazing Capacitor App",
  "author": {
    "name": "",
    "email": ""
  },
  "repository": {
    "type": "git",
    "url": ""
  },
  "license": "MIT",
  "main": "build/src/index.js",
  "scripts": {
    "build": "tsc && electron-rebuild",
    "electron:start-live": "node ./live-runner.js",
    "electron:start": "npm run build && electron --inspect=5858 ./",
    "electron:pack": "npm run build && electron-builder build --dir -c ./electron-builder.config.json",
    "electron:make": "npm run build && electron-builder build -c ./electron-builder.config.json -p always"
  },
  "dependencies": {
    "@capacitor-community/electron": "^4.1.2",
    "@capacitor-community/sqlite": "^4.6.2",
    "chokidar": "~3.5.3",
    "electron-is-dev": "~2.0.0",
    "electron-serve": "~1.1.0",
    "electron-unhandled": "~4.0.1",
    "electron-updater": "~5.0.1",
    "electron-window-state": "~5.0.3",
    "jszip": "^3.10.1",
    "node-fetch": "2.6.7",
    "sqlite3": "^5.1.4"
  },
  "devDependencies": {
    "@types/sqlite3": "^3.1.8",
    "electron": "^23.1.1",
    "electron-builder": "^22.10.3",
    "electron-rebuild": "^3.2.9",
    "typescript": "~4.3.5"
  },
  "keywords": [
    "capacitor",
    "electron"
  ]
}
```

In the main folder of your app

```
npm run electron:install
npm run electron:start
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/jepiqueau"><img src="https://avatars3.githubusercontent.com/u/16580653?v=4" width="100px;" alt=""/><br /><sub><b>Jean Pierre Quéau</b></sub></a><br /><a href="https://github.com/jepiqueau/vite-vue-sqlite-app/commits?author=jepiqueau" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

