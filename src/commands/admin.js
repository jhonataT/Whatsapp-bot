class Adm {
    constructor(client, message){
        this.client = client;
        this.message = message;
    }
    async get(){ // Get admins
        const admins = await this.client.getGroupAdmins(this.message.from);
        return admins;
    }
    async mention(){ // Mention admins
        const admins = await this.get();
        let adminList = new Array();
        let adminText = 'ADMINS:\n';
        for(let i = 0; i < admins.length; i++){
            if(admins[i]._serialized != this.message.to){
                adminList.push(admins[i].user);
                adminText = adminText.concat(`@${admins[i].user}\n`);
            }
        }
        await this.client.sendMentioned(
            this.message.from,
            `\n${adminText}`,
            adminList
        );
    }
}

module.exports = Adm;