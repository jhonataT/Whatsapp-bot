class Adm {
    constructor(client, message, args){
        this.client = client;
        this.message = message;
        this.args = args;
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

    async promoteUser(){
        this.args[0] = this.args[0].replace('@', '').concat('@c.us');
        console.log('msg= ', this.args[0]);
        const chat = await this.client.checkNumberStatus(this.args[0]);  
        console.log('chat= ', chat);

        if(chat.numberExists){
            const adms = this.get();
            let verifyAdms = [false, false];
            for(let i = 0; i < adms.length; i++){
                if(adms[i]._serialized == this.args[0])
                    verifyAdms[0] = true;
                if(adms[i]._serialized == this.message.author)
                    verifyAdms[1] = true;
            }
            if(!verifyAdms[1]){
                this.client.sendText(message.from, '*Este comando necessita de um cargo que você não têm.*');
                return;
            }
            if(verifyAdms[0]){
                this.client.sendMentioned(message.from, `O @${chat.id.user} já é adm!`, chat.id.user);
                return;
            }

            await this.client.promoteParticipant(message.from, this.args[0]);
            this.client.sendMentioned(message.from, `_*Parabéns, @${chat.id.user}, você agora é um ADM!*_`), chat.id.user;
        }
        else
            this.client.sendText(`Este usuário não existe!`);
    }

    async denoteUser(){
        this.args[0] = this.args[0].replace('@', '').concat('@c.us');
        console.log('msg= ', this.args[0]);
        const chat = await this.client.checkNumberStatus(this.args[0]);  
        console.log('chat= ', chat);

        if(chat.numberExists){
            const adms = this.get();
            let verifyAdms = [false, false];
            
            for(let i = 0; i < adms.length; i++){
                if(adms[i]._serialized == this.args[0])
                    verifyAdms[0] = true;
                if(adms[i]._serialized == this.message.author)
                    verifyAdms[1] = true;
            }
            if(!verifyAdms[1]){ 
                this.client.sendText(message.from, '*Este comando necessita de um cargo que você não têm.*');
                return;
            }
            if(!verifyAdms[0]){
                this.client.sendMentioned(message.from, `O @${chat.id.user} não é adm!`, chat.id.user);
                return;
            }

            await this.client.denoteParticipant(message.from, this.args[0]);
            this.client.sendMentioned(message.from, `_*@${chat.id.user}, diga adeus à vida de adm!*_`), chat.id.user;
        }
        else
            this.client.sendText(`Este usuário não existe!`);
    }
}

module.exports = Adm;