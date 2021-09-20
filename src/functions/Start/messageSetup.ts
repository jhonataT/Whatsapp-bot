interface Setup {
    PREFIX: string,
    CMD_NAME: string,
    ARGS: string[],
};

export function setMessageSetup(message: any): Setup {
    const prefix = '!';
    
    if(message.type === 'image'){
        message.body = message.caption;
    }

    if(!message.body || !message.body.startsWith(prefix)) return {
        PREFIX: prefix, 
        CMD_NAME: '', 
        ARGS: ['']
    };

    const [cmd, ...args] = message.body
    .toLowerCase()
    .trim()
    .substring(prefix.length)
    .split(/\s+/);

    return {
        PREFIX: prefix,
        CMD_NAME: cmd,
        ARGS: args
    };
}