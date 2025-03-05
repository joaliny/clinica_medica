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
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.stack);
        return;
    }
    console.log('Conectado ao MySQL!');
});

// Rota para cadastrar um médico
app.post('/medicos', (req, res) => {
    const { nome, crm, especialidade } = req.body;

    // Validação simples
    if (!nome || !crm || !especialidade) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const sql = 'INSERT INTO medicos (nome, crm, especialidade) VALUES (?, ?, ?)';
    db.query(sql, [nome, crm, especialidade], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar médico:', err.stack);
            return res.status(500).json({ message: 'Erro ao cadastrar médico' });
        }
        res.json({ message: 'Médico cadastrado com sucesso!' });
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
        res.json(result);
    });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});