// Função para carregar uma página
async function carregarPagina(pagina) {
    const conteudoPrincipal = document.getElementById('conteudo-principal');

    // Carrega o conteúdo da página
    const response = await fetch(`pages/${pagina}.html`);
    const html = await response.text();

    // Atualiza o conteúdo principal
    conteudoPrincipal.innerHTML = html;

    // Carrega os dados específicos da página
    if (pagina === 'medicos') {
        carregarMedicos();
    } else if (pagina === 'pacientes') {
        carregarPacientes();
    } else if (pagina === 'consultas') {
        carregarConsultas();
    }
}

// Função para carregar os médicos
async function carregarMedicos() {
    const response = await fetch('http://localhost:3000/medicos');
    const medicos = await response.json();

    const corpoTabela = document.getElementById('corpo-tabela-medicos');
    corpoTabela.innerHTML = '';

    medicos.forEach(medico => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${medico.nome}</td>
            <td>${medico.crm}</td>
            <td>${medico.especialidade}</td>
        `;
        corpoTabela.appendChild(linha);
    });
}

// Função para carregar os pacientes
async function carregarPacientes() {
    const response = await fetch('http://localhost:3000/pacientes');
    const pacientes = await response.json();

    const corpoTabela = document.getElementById('corpo-tabela-pacientes');
    corpoTabela.innerHTML = '';

    pacientes.forEach(paciente => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${paciente.nome}</td>
            <td>${paciente.cpf}</td>
            <td>${paciente.telefone}</td>
        `;
        corpoTabela.appendChild(linha);
    });
}

// Função para carregar as consultas
async function carregarConsultas() {
    const response = await fetch('http://localhost:3000/consultas');
    const consultas = await response.json();

    const corpoTabela = document.getElementById('corpo-tabela-consultas');
    corpoTabela.innerHTML = '';

    consultas.forEach(consulta => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${consulta.data}</td>
            <td>${consulta.horario}</td>
            <td>${consulta.paciente_nome}</td>
            <td>${consulta.medico_nome}</td>
            <td>R$ ${consulta.valor}</td>
        `;
        corpoTabela.appendChild(linha);
    });
}