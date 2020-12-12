const commands = require('./help');

class GetMembers {
    
    static async mention(client, message){
        const membersInfo = await client.getGroupMembersId(message.from);
        let membersInText = '@EVERYONE:\n';
        membersInfo.forEach( user => {
            if(user != message.to && user != message.author){
                user = user.replace('@c.us', '');
                membersInText = membersInText.concat(`@${user}\n`); 
            }
        });
        await client.sendTextWithMentions(message.from, membersInText);
    }

    static help(client, message){
        commands.help(client, message);
    }

}

module.exports = GetMembers;