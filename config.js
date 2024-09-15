const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('config.env'))
    require('dotenv').config({ path: __dirname + '/config.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Adams-2024;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUNDTXAzZFFPSmh4RzUvemNTNVZxR2p6ZG9XWWM2N1B5OE40ekttWVFVbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVRYM2hNMEpleUUzYWp0VjdJeHA0NjFhSFhsUmdwaHM5YTlUWmtqWFNpWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2S2dCNnJzTWkzRGtjd3dTN0srbUE3bEJvUzNwOFdPY1l0UmE4aTdXVkg0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqSzR0WDRFVlVIaHlLNEZGOE1GNlZqN1k4RGd1cWRTODNPWWpDYW1MbkU4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklFUTVGYmNncjZaRXYrNHk3NVJNVGU2RUtIbHNnUzdyUTZkaVN2dGtWVXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlluMlM2Y1haSHRaYVI5NWxFOStHMVR6elZUTlVnSnQzRldSd2ZHYVVYenM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0tBU3Q1RHlmRzl3N1NDUnA3OTFqMlJ2TTRpMDVNZUZueEpUbGVQL0VtWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRWxFbXlGaVlkeTZ4S1dCSEVJZDdGclhwenVkVEl4ZEpWcnZRbEhreGQzbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNZTk1lSW56TkpZN3p6M0ZLV0U3VkdwL0h4YjV3cVozRHA0SXJWNGZZQ244TWRwS3BWc2dKVURoMEltSy9ZZmY5UWl5cDJEcldHQVRSZzl5M3NYYWl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTUyLCJhZHZTZWNyZXRLZXkiOiJQMmVobjFGTHVPdHFYVFE5cG1XTnRsRXNWTkRFUG16UHlyRUhwMjJNMVVFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ2Z3BMS0JRX1JVR0NCRURueHFLTmN3IiwicGhvbmVJZCI6ImJkOWVkNmVkLTkwYTUtNGJlOS1iNDQ3LWFkYjk5OWJmZTc0YSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDRHlwR0tRQTUyVU1pRTRhcy9DM05iaDVVaUk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0c3d3hTZVZZeWNiRTE1ZFBkRlFaNHRrNVJRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlJIOU1HRktEIiwibWUiOnsiaWQiOiI5NDcxNTk2MTQyMDo3QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQRFY2NHNDRU95aW03Y0dHQU1nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJhQ2F4NXUrbmFHdlZYNTFjSEZUSlViV2FqR2V2Ty9tMXA4TUN1UktOaWpvPSIsImFjY291bnRTaWduYXR1cmUiOiIwUDdvWXIxWUZ1VitCODU4NWtiekR4cDBHMExVRVNPSzVSSHRqcVc4cDN6Z2l4Sm5uNHE2UHNQb3NiSHpiYXQ2d0RrYmRXamJjeUJDSG5vU1h4RXNEUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiWVl1QW5MSDA4dFRmWnE1T05ESmtiamZ6ZGR4Ry9kcTRVdm9oS014bE1HTUlGY2U3Z3dzcG5hRGhuYXVBemVTamJuYWtJeFRITUx0SlViQXdnZ09FaUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI5NDcxNTk2MTQyMDo3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldnbXNlYnZwMmhyMVYrZFhCeFV5VkcxbW94bnJ6djV0YWZEQXJrU2pZbzYifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjY0MDI5MzgsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTWhpIn0=',
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
