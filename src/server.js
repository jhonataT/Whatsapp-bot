const server = async (client) => {
    const stats = await client.getConnectionState();
    console.log('sts= ', stats);
}

module.exports = server;