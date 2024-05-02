const express = require('express');
const { v4: uuidv4 } = require('uuid')
const app = express();
app.use(express.json());
const obersvacoesPorLembreteId = {};

app.post('/lembretes/:id/observacoes', (req, res) => {
    //Gerar um novo identificador para a observação a ser inserida.
    const idObs = uuidv4();
    //Extrair, do corpo da requisição, o texto da observação.
    const { texto } = req.body;
    /*Verificar se o id de lembrete existente na URL já existe na base e está
    associado a uma coleção. Em caso positivo, prosseguir utilizando a coleção
    existente. Caso contrário, criar uma nova coleção.*/
    const observacoesDoLembrete = obersvacoesPorLembreteId[req.params.id] || [];
    //Adicionar a nova observação à coleção de observações recém obtida/criada.
    observacoesDoLembrete.push({ id: idObs, texto })
    //Fazer com que o identificador do lembrete existente na URL esteja associado a essa nova coleção alterada, na base de observações por id de lembrete.
    obersvacoesPorLembreteId[req.params.id] = observacoesDoLembrete;
    // Devolver uma resposta ao usuário envolvendo o código de status HTTP e algum objeto de interesse, possivelmente a observação inserida ou, ainda, a coleção inteira de observações.
    res.status(201).send(observacoesDoLembrete);
});

app.get('/lembretes/:id/observacoes', (req, res) => {
    res.send(obersvacoesPorLembreteId[req.params.id] || []);
});

app.listen(5000,() =>  {
    console.log('observacoes rodando na porta 5000');
});