const Database = require("sqlite-async") 

function execute(db){
    // Criar uma tabela, CASO NÃO EXISTA, para guardar as informações
    return db.exec(`
        CREATE TABLE IF NOT EXISTS usering (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            groupId TEXT,
            number TEXT,
            name TEXT,
            all_permictions INTEGER
        );
    `)
}

// Criar um arquivo "database.sqlite" para ser o db:
module.exports = Database.open(__dirname + "/database.sqlite").then(execute); //db
 
