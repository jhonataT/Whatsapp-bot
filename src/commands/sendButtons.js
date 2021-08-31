const Userbuttons = [
    {id: '1', text: '!adm'},
    {id: '2', text: '!all'},
    {id: '3', text: '!help'},
];

class Buttons {
    
    static async send(client, message){
        await client.sendButtons(
            message.from, 
            "Comandos livres à todos os usuários", 
            Userbuttons, 
            "Comandos"
        );
    }
}

module.exports = Buttons;