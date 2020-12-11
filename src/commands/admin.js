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
        const text = this.args[0];
        this.args[0] = this.args[0].replace('@', '').concat('@c.us');
        const chat = await this.client.checkNumberStatus(this.args[0]);  

        if(chat.numberExists){
            const adms = await this.get();
            let verifyAdms = [false, false, false];
            for(let i = 0; i < adms.length; i++){

                if(adms[i]._serialized == this.args[0])
                    verifyAdms[0] = true;
                if(adms[i]._serialized == this.message.author)
                    verifyAdms[1] = true;
                if(adms[i]._serialized == this.message.to)
                    verifyAdms[2] = true;
            }
            if(!verifyAdms[2]){
                this.client.sendText(this.message.from, `_*Desculpe, não tenho permissão para isso!*_`);
                return;
            }

            if(!verifyAdms[1]){
                this.client.sendText(this.message.from, '_*Este comando necessita de um cargo que você não têm.*_');
                return;
            }
            if(verifyAdms[0]){
                this.client.sendMentioned(this.message.from, `_*O ${text} já é adm!*_`, chat.id.user);
                return;
            }

            await this.client.promoteParticipant(this.message.from, this.args[0])
            .then( res => {
                console.log(res);
            })
            .catch( err => {
                if(err) console.log(err);
            });
            console.log(this.args[0]);
            this.client.sendMentioned(this.message.from, `_*Parabéns, ${text}, você agora é um ADM!*_`, chat.id.user);
        }
        else
            this.client.sendText(`_*Este usuário não existe!*_`);
    }

    async denoteUser(){
        const text = this.args[0];
        this.args[0] = this.args[0].replace('@', '').concat('@c.us');
        const chat = await this.client.checkNumberStatus(this.args[0]);  

        if(chat.numberExists){
            const adms = await this.get();
            let verifyAdms = [false, false, false];
            
            for(let i = 0; i < adms.length; i++){
                if(adms[i]._serialized == this.args[0])
                    verifyAdms[0] = true;
                if(adms[i]._serialized == this.message.author)
                    verifyAdms[1] = true;
                if(adms[i]._serialized == this.message.to)
                    verifyAdms[2] = true;    
            }   
            if(!verifyAdms[2]){
                this.client.sendText(this.message.from, `_*Desculpe, não tenho permissão para isso!*_`);
                return
            }
            if(!verifyAdms[1]){ 
                this.client.sendText(this.message.from, '_*Este comando necessita de um cargo que você não têm.*_');
                return;
            }
            if(!verifyAdms[0]){
                this.client.sendMentioned(this.message.from, `_*O ${text} não é adm!*_`, chat.id.user);
                return;
            }
            await this.client.demoteParticipant(this.message.from, this.args[0]).then( res => {
                console.log(res);
            })
            .catch( err => {
                if(err) console.log(err);
            });
            await this.client.demoteParticipant(this.message.from, this.message.author);
            console.log(this.message.author);

            this.client.sendMentioned(this.message.from, `_*${text}, diga adeus à vida de adm!*_`, chat.id.user);
            console.log(this.args[0]);
        }
        else
            this.client.sendText(`_*Este usuário não existe!*_`);
    }
}

module.exports = Adm;