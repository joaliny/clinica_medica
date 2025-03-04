const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com o MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Substitua pelo seu usuário do MySQL
    password: '', // Substitua pela sua senha do MySQL
    database: 'clinica_medica'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado ao MySQL!');
});

// Rota para listar pacientes
app.get('/pacientes', (req, res) => {
    const sql = 'SELECT * FROM pacientes';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Rota para cadastrar um paciente
app.post('/pacientes', (req, res) => {
    const { nome, cpf, telefone } = req.body;
    const sql = 'INSERT INTO pacientes (nome, cpf, telefone) VALUES (?, ?, ?)';
    db.query(sql, [nome, cpf, telefone], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Paciente cadastrado com sucesso!' });
    });
});

// Rota para listar médicos
app.get('/medicos', (req, res) => {
    const sql = 'SELECT * FROM medicos';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});