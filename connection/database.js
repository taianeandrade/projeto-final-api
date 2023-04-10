const mysql2 = require('mysql2/promise'); //a promesa vem aqui

async function execute(sql) {
    let conexao = await mysql2.createConnection({
        user: 'root',
        password: '1234',
        database: 'db_projeto_final',
        host: 'localhost'        
    });

    let [rows] = await conexao.execute(sql); //executando no mysql

    return rows;
}

module.exports = {
    execute
};