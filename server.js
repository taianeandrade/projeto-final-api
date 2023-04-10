const express = require('express');

const carrinhoRouter = require('../resources/carrinho/routes');
const pedidoRouter = require('../resources/pedido/routes');


const app = express(); // iniciando a aplicação com o express

app.use(express.json());

app.use(carrinhoRouter); //express usando o router de carrinho
app.use(pedidoRouter);  //express usando o router de meus pedidos


app.listen(8000, () => {
    console.log('-------------');
    console.log('--- NO AR ---');
    console.log('-------------');
});
