const wa = require('@open-wa/wa-automate');
const beginning = require('./functions/Start/beginning.ts');

wa.create({
    sessionId: "BOT_LICO",
    authTimeout: 60, //wait only 60 seconds to get a connection with the host account device
    blockCrashLogs: true,
    disableSpins: false,
    headless: true,
    hostNotificationLang: 'PT_BR',
    logConsole: false,
    popup: false,
    qrTimeout: 0, //0 means it will wait forever for you to scan the qr code
}).then((client: object) => beginning(client));