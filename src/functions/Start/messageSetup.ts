interface Setup {
    PREFIX: string,
    CMD_NAME: string,
    ARGS: string[],
};

function setMessageSetup(message: any): Setup {
    const prefix = '!';

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

module.exports = setMessageSetup;
