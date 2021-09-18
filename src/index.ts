import { create } from '@open-wa/wa-automate';

import { beginningSection } from './functions/Start/beginning'
import { sqlz } from './database/controllers/index';

create({
    sessionId: "BOT_LICO",
    authTimeout: 60, 
    blockCrashLogs: true,
    disableSpins: false,
    headless: true,
    logConsole: false,
    popup: false,
    qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then(async (client: object) => {
    try {
        await sqlz.authenticate();
        await sqlz.sync({ force: false });
        console.log('Connection has been established successfully.');
        beginningSection(client);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});