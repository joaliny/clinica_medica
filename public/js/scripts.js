

// Função para carregar uma página dinamicamente (usando fetch)
async function carregarPaginaDinamica(pagina) {
    const conteudoPrincipal = document.getElementById('conteudo-principal');

    try {
        const response = await fetch(`pages/${pagina}.html`);
        if (!response.ok) {
            throw new Error('Erro ao carregar a página');
        }

        const html = await response.text();
        conteudoPrincipal.innerHTML = html;

        if (pagina === 'medicos') {
            await carregarMedicos();
        } else if (pagina === 'pacientes') {
            await carregarPacientes();
        } else if (pagina === 'consultas') {
            await carregarConsultas();
        }
    } catch (error) {
        console.error('Erro ao carregar a página:', error);
        conteudoPrincipal.innerHTML = '<p>Erro ao carregar a página. Tente novamente.</p>';
    }
}


// Função para redirecionar para uma nova página
function carregarPaginaDinamica(pagina) {
    window.location.href = `pages/${pagina}.html`;
}

function carregarPagina(pagina) {
    window.location.href = `pages/${pagina}.html`;
}

async function carregarPagina(pagina) {
    const conteudoPrincipal = document.getElementById('conteudo-principal');
    try {
        const response = await fetch(`pages/${pagina}.html`);
        if (!response.ok) {
            throw new Error('Erro ao carregar a página');
        }
        const html = await response.text();
        conteudoPrincipal.innerHTML = html;
    } catch (error) {
        console.error('Erro ao carregar a página:', error);
    }
}


// Função para carregar os pacientes
async function carregarPacientes() {
    try {
        const response = await fetch('http://localhost:3000/pacientes');
        if (!response.ok) {
            throw new Error('Erro ao buscar pacientes');
        }

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
    } catch (error) {
        console.error('Erro ao carregar pacientes:', error);
    }
}

// Função para carregar as consultas
async function carregarConsultas() {
    try {
        const response = await fetch('http://localhost:3000/consultas');
        if (!response.ok) {
            throw new Error('Erro ao buscar consultas');
        }

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
    } catch (error) {
        console.error('Erro ao carregar consultas:', error);
    }
}

// Função para carregar uma página
function carregarPagina(pagina) {
    window.location.href = `pages/${pagina}.html`;
}

// ---------------------------------------------------

// Função para cadastrar um médico
document.getElementById('btnSalvarMedico').addEventListener('click', async () => {
    const nome = document.getElementById('nome').value;
    const crm = document.getElementById('crm').value;
    const especialidade = document.getElementById('especialidade').value;

    console.log('Dados a serem enviados:', { nome, crm, especialidade }); // Log dos dados

    if (!nome || !crm || !especialidade) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/medicos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, crm, especialidade }),
        });

        console.log('Resposta do backend:', response); // Log da resposta

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro do backend:', errorData); // Log do erro do backend
            throw new Error('Erro ao cadastrar médico');
        }

        const result = await response.json();
        alert(result.message);

        // Fecha o modal
        $('#modalCadastroMedico').modal('hide');

        // Recarrega a lista de médicos
        carregarMedicos();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cadastrar médico. Tente novamente.');
    }
});

// Função para carregar os médicos na tabela
// Função para carregar os médicos na tabela
async function carregarMedicos() {
    try {
        const response = await fetch('http://localhost:3000/medicos');
        if (!response.ok) {
            throw new Error('Erro ao buscar médicos');
        }

        const medicos = await response.json();
        const corpoTabela = document.getElementById('corpo-tabela-medicos');
        corpoTabela.innerHTML = ''; // Limpa a tabela

        medicos.forEach(medico => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${medico.id}</td> <!-- Exibe o ID -->
                <td>${medico.nome}</td>
                <td>${medico.crm}</td>
                <td>${medico.especialidade}</td>
            `;
            corpoTabela.appendChild(linha);
        });
    } catch (error) {
        console.error('Erro ao carregar médicos:', error);
    }
}

// Carrega os médicos ao abrir a página
carregarMedicos();

// ------------------------------------------------------------------------------------

