const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env'))
    require('dotenv').config({ path: __dirname + '/config.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Adams-2024;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMERBNEtGM21ncjBuZkJsY3c4dEJPdXhJVThxbGhuUlpONVJ3T2dXTUJtaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQU1OQkNWTkcxWnhzamRZbVc1QUdaNXFiQVFEdmg0bHVRTFgxcGZoQ05qWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZRU9pR2g1emFHRmJ0WDdFNndOQmNLd09rRzF5ZVVhVWJnbEowM2JacUg4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJbC9kYlZZbW1IekszVVFqQlBQRmNDSExDR2lzUGtOWE9JdmpmWnBKUmx3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdOSTI5b1Y3NEg0ZVFub0tHT3c5Vkt6UVdaeEFRaEV5dUhOSlFLZElsMzg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJST3ptVmM3QlRmR2JwQTJxaFBoczhRc2phS2huNlUzT0g0MVp5Z05uM0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0lHS2JTUlpoVlNTa2h0NWs2Z3JzdSt0OVI5ejBFSzdVSUtTbERqWmMxWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUZlZ0F4dHpzWE5KQVk5Y0RaN3lVYUZPdGZUOFo2dUJsQ0Yzd2N1ZFF4WT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkUzM3podzJGZGgrWEhjK3JONjA4cWNkdUI2Yys5Q010MEpTOXRpRzNNUjJ2RGg2LzRjelhGclF5RW9vaUJWOC9sVU94em1LRm53eDBMQ1R0WXdnZGpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTksImFkdlNlY3JldEtleSI6ImZPSGZ6aFJmY2Fscm9FWVA1NSs5d1o5akl5cWpDdmY5VmlUS0hCNWtJcjA9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTQ3MTU5NjE0MjBAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODk5NEYzQzAwODA2QTdFMzYzRjcwMEExRTE0MjJCOTkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNzk1NzY4N31dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoieEVLcDBVWWZUd092MEU2bmtycGd6QSIsInBob25lSWQiOiI3MjNkNjJmZC1hNTczLTRkZjYtYjYzMi03N2Y0OWNiYTAxMzYiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOE5FM3J4a1JKeHRpc0VpRitPNVlWcHFkRHhrPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IksxM2sxNE1zaHVvTnViTTZwT05jRmt6cVByWT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJMWTZTNUExNSIsIm1lIjp7ImlkIjoiOTQ3MTU5NjE0MjA6MjZAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tyMDhjd0dFS2FWK3JjR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjNSK2dsYU5CemVLNTBiWHZuZmNtcy8wTzIzMG9WZmdxc3dqc0hqeWZqSDg9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImJnQXU1K1FUVHJXMkxKYUNyU2xBSmVPdmhpbXVNQ2JCSUJ4eUcvWXFuTnlpODVIN0tBQWMvSjV2dkFscklTS1dwejZSTXdLYUlkdGs4S240VmpSUkN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiI1SUEvRGIzVFJzZE9zc2VHTFk2cEE0czVCN09xMFdReDhmSzEwWG5SbkNiK2dTMFpWSGd2aWRzM0p1YzZtcyswNUFPOTJnazBWYnMyaWZiRGkveHJnUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzE1OTYxNDIwOjI2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmQwZm9KV2pRYzNpdWRHMTc1MzNKclA5RHR0OUtGWDRLck1JN0I0OG40eC8ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjc5NTc2ODIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQWd0In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "ROCKY",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "94704104383",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'SENU',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/cbf3858a08efefa2d1d47.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
