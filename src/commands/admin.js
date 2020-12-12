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
        console.log(userId);
        let adminText = 'ADMINS:\n';
        admins.forEach( adm => {
            if(adm != this.message.to){
                adm = adm.replace('@c.us', '');
                adminText = adminText.concat(`@${adm}\n`);
            }
        })
        await this.client.sendTextWithMentions(this.message.from, adminText);
    }

    async promoteUser(){
        const admins = await this.get();
        let userId = this.args[0].replace("@", "").concat("@c.us");
        let verify = [false, false, false]; // 0 -> clientIsAdm, 1 -> memberFromIsAdm, 2 -> userToPromoteIsAdm
        
        const verifyNumber = await this.client.checkNumberStatus(userId);
        console.log(verifyNumber);
        if(!verifyNumber.numberExists){
            this.client.sendText(`_*Este número não existe, tente novamente.*_`);
            return;
        }

        admins.forEach( adm => {
            if(adm === this.message.to)
                verify[0] = true;
            if(adm === this.message.author)
                verify[1] = true;
            if(adm == userId)
                verify[2] = true;
        });
        console.log(verify);
        if(!verify[0]){
            this.client.sendText(this.message.from, `_*Desculpe, não tenho permissão!*_`);
            return;
        }
        if(!verify[1]){
            this.client.sendText(this.message.from, `_*Desculpe, você não têm permissão para usar este comando!*_`);
            return;
        }
        if(verify[2]){
            this.client.sendTextWithMentions(this.message.from, `_*${this.args[0]} já é admin!!*_`);
            return;
        }
        await this.client.promoteParticipant(this.message.from, userId);
        this.client.sendTextWithMentions(this.message.from, `_*Parabéns, ${this.args[0]}, agora você é admin!*_`);
    }

    async denoteUser(){
        const admins = await this.get();
        let userId = this.args[0].replace("@", "").concat("@c.us");
        let verify = [false, false, false]; // 0 -> clientIsAdm, 1 -> memberFromIsAdm, 2 -> userToPromoteIsAdm
        
        const verifyNumber = await this.client.checkNumberStatus(userId);
        console.log(verifyNumber);
        if(!verifyNumber.numberExists){
            this.client.sendText(`_*Este número não existe, tente novamente.*_`);
            return;
        }

        admins.forEach( adm => {
            if(adm === this.message.to)
                verify[0] = true;
            if(adm === this.message.author)
                verify[1] = true;
            if(adm == userId)
                verify[2] = true;
        });
        console.log(verify);
        if(!verify[0]){
            this.client.sendText(this.message.from, `_*Desculpe, não tenho permissão!*_`);
            return;
        }
        if(!verify[1]){
            this.client.sendText(this.message.from, `_*Desculpe, você não têm permissão para usar este comando!*_`);
            return;
        }
        if(!verify[2]){
            this.client.sendTextWithMentions(this.message.from, `_*${this.args[0]} não é admin!!*_`);
            return;
        }
        await this.client.demoteParticipant(this.message.from, userId);
        this.client.sendTextWithMentions(this.message.from, `_*Parabéns, ${this.args[0]}, você perdeu o seu admin! XD*_`);
    }
}

module.exports = Adm;