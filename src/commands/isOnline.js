class IsOnline {
    static async getUsers(client, from){
        return await client.getGroupMembersId(from);
    }

    static async on(client, message){
        const users = await this.getUsers(client, message.from);
        let onlineUsers = "Membros online:";
        for(let i = 0; i < users.length; i++){
            let chatOn = await client.isChatOnline(users[i]);
            if(users[i] != message.to){
                if(chatOn === true){
                    chatOn = '✅';
                } else chatOn = '❌';
                users[i] = users[i].replace("@c.us", "");
                onlineUsers = onlineUsers.concat(`\n@${users[i]} ${chatOn}`);
            }
        }
        await client.sendTextWithMentions(message.from, onlineUsers);
    }
}

module.exports = IsOnline;