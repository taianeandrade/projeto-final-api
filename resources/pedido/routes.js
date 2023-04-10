const app = require('express').Router();

const database = require('../../projeto-final-api/connection/database');

const tabela = 'tb_pedido';
const url = '/pedidos';

//Lista todos
app.get(`${url}`, async (req, res) => {
    let dados = await database.execute (`
    SELECT * FROM ${tabela}
`);

    res.send(dados);
});

//Lista um (através do id)
app.get(`${url}/:id`, async (req, res) => {
    let dados = await database.execute(`
        SELECT * FROM ${tabela}
        WHERE id='${req.params.id}'
`);

    //É um dado existente? Se sim, executa
    let jaExiste = await database.execute (`
        SELECT * FROM ${tabela} 
        WHERE id='${req.params.id}'
`);
   //Se não existe retorna uma mensagem de erro
    if (undefined === jaExiste[0]) {
    res.sendStatus(404);
    return;
    }

    res.send(dados[0]);
});

//Cria um novo
app.post(url, async (req, res) => {
    let corpo = req.body;

    let sql = await database.execute (`
        INSERT INTO ${tabela} (num_pedido, titulo, imagem)
        VALUES ('${corpo.num_pedido}', '${corpo.titulo}', '${corpo.imagem}')
`);

    corpo.id = sql.insertId;
    
    res.send(corpo);
});

//Edita (por meio do ID)
app.patch(`${url}/:id`, async (req, res) => {
    let dados = req.body;

    let jaExiste = await database.execute (`
       SELECT * FROM ${tabela} 
       WHERE id=${req.params.id};
`);

    //Se não existir, então retorna uma mensagem de erro
    if(undefined === jaExiste[0]) {
            res.sendStatus(404);
            return;
    };

    await database.execute (`
       UPDATE ${tabela} 
       SET num_pedido='${dados.cupom || jaExiste[0].cupom}',
           titulo='${dados.desconto || jaExiste[0].desconto}',

           status='${dados.status || jaExiste[0].status}'
       WHERE id=${req.params.id};
 `);

    let atual = await database.execute (`
       SELECT * FROM ${tabela}
       WHERE id=${req.params.id};
`);
    
    res.send(atual[0]);
});

app.put(`${url}/:id`, async (req, res) => {
    await database.execute(`UPDATE ${tabela} 
       SET status = 0 OR status = 1;
       WHERE id=${req.params.id};
`);
    res.sendStatus(204);
});

module.exports = app;