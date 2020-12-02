const commands = require('./help');

class GetMembers {
    
    static async mention(client, message){
        const membersInfo = await client.getGroupMembersIds(message.from);
        let membersInList = new Array();
        let membersInText = '@EVERYONE:\n';
        for(let i = 0; i < membersInfo.length; i++){
            if(membersInfo[i]._serialized != message.to && membersInfo[i]._serialized != message.author){
                membersInList.push(membersInfo[i].user);
                membersInText = membersInText.concat(`@${membersInfo[i].user}\n`); 
            }
        }
        await client.sendMentioned(
            message.from,
            `\n${membersInText}`,
            membersInList
        );
    }

    static help(client, message){
        commands.help(client, message);
    }

}

module.exports = GetMembers;