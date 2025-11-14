CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    tipo VARCHAR(20) DEFAULT 'paciente', 
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE perfis (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14),
    telefone VARCHAR(20),
    data_nascimento DATE
);

CREATE TABLE medicos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    crm VARCHAR(50) UNIQUE NOT NULL,
    especialidade VARCHAR(100) NOT NULL,
    ativo BOOLEAN DEFAULT TRUE
);

CREATE TABLE funcionarios (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    setor VARCHAR(100) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    data_admissao DATE NOT NULL
);

CREATE TABLE pacientes (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
    convenio VARCHAR(100),
    alergias TEXT
);

CREATE TABLE agenda (
    id SERIAL PRIMARY KEY,
    medico_id INTEGER REFERENCES medicos(id) ON DELETE CASCADE,
    data_agenda DATE NOT NULL,
    horario TIME NOT NULL,
    disponivel BOOLEAN DEFAULT TRUE
);

CREATE TABLE consultas (
    id SERIAL PRIMARY KEY,
    paciente_id INTEGER REFERENCES pacientes(id) ON DELETE CASCADE,
    medico_id INTEGER REFERENCES medicos(id) ON DELETE CASCADE,
    data_consulta TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'agendada', 
    observacoes TEXT
);

CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_medicos_crm ON medicos(crm);
CREATE INDEX idx_consultas_data ON consultas(data_consulta);
CREATE INDEX idx_agenda_medico_data ON agenda(medico_id, data_agenda);