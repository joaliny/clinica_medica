const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Conexão com o MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Substitua pelo seu usuário do MySQL
    password: '', // Substitua pela sua senha do MySQL
    database: 'clinica_medica'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.stack);
        return;
    }
    console.log('Conectado ao MySQL!');
});

// Rota para cadastrar médico
app.post('/medicos', (req, res) => {
    const { nome, crm, especialidade } = req.body;

    console.log('Dados recebidos:', { nome, crm, especialidade });

    if (!nome || !crm || !especialidade) {
        console.error('Campos obrigatórios faltando');
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const sql = 'INSERT INTO medicos (nome, crm, especialidade) VALUES (?, ?, ?)';
    const values = [nome, crm, especialidade];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar médico:', err);
            return res.status(500).json({ message: 'Erro ao cadastrar médico', error: err.message });
        }

        console.log('Médico cadastrado com sucesso:', result);
        res.status(201).json({ 
            message: 'Médico cadastrado com sucesso!',
            id: result.insertId // Retorna o ID gerado
        });
    });
});
// Rota para listar médicos
 app.get('/medicos', (req, res) => {
    const sql = 'SELECT * FROM medicos';
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Erro ao buscar médicos:', err.stack);
            return res.status(500).json({ message: 'Erro ao buscar médicos' });
        }
        res.json(result); // Retorna a lista de médicos com seus IDs
    });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.stack);
        return;
    }
    console.log('Conectado ao MySQL!');
});

// ----------------------------------------------------------------------
