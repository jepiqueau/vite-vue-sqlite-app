import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { JeepSqlite } from 'jeep-sqlite/dist/components/jeep-sqlite';
//import { applyPolyfills, defineCustomElements } from 'jeep-sqlite/loader';

customElements.define('jeep-sqlite', JeepSqlite);
console.log(`after customElements.define`);

window.addEventListener('DOMContentLoaded', async () => {
    const platform = Capacitor.getPlatform();
    const sqlite = new SQLiteConnection(CapacitorSQLite)
    try {
        console.log(`platform: ${platform}`);

        if(platform === "web") {
          // Create the 'jeep-sqlite' Stencil component
          const jeepSqliteEl = document.createElement('jeep-sqlite');
          document.body.appendChild(jeepSqliteEl);
          await customElements.whenDefined('jeep-sqlite');
          console.log(`after customElements.whenDefined`)

          // Initialize the Web store
          await sqlite.initWebStore();
          console.log(`after initWebStore`)
        } 
        // here you can initialize some database schema if required

        // example: database creation with standard SQLite statements 
        const ret = await sqlite.checkConnectionsConsistency();
        const isConn = (await sqlite.isConnection("db_vite", false)).result;
        let db = null;
        if (ret.result && isConn) {
            db = await sqlite.retrieveConnection("db_vite",false);
        } else {
            db = await sqlite.createConnection("db_vite", false, "no-encryption", 1, false);
        }
        await db.open();
        console.log(`db: db_vite opened`);
        const query = `
        CREATE TABLE IF NOT EXISTS test (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL
        );
        `
        const res = await db.execute(query);
        console.log(`res: ${JSON.stringify(res)}`);
        if(res.changes && res.changes.changes && res.changes.changes < 0) {
        throw new Error(`Error: execute failed`);
        }
        await sqlite.closeConnection("db_vite",false);

        createApp(App).mount('#app');
    } catch (err) {
        console.log(`Error: ${err}`);
        throw new Error(`Error: ${err}`)
    }
});


