-- Script para criar todas as tabelas do banco flamengo_ratings
-- Execute com: psql -U postgres -d flamengo_ratings -f init.sql

-- Tabela AVALIADORES
CREATE TABLE avaliadores (
    id_avaliador SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- Tabela JOGADORES
CREATE TABLE jogadores (
    numero_camisa INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE,
    posicao VARCHAR(50) NOT NULL,
    foto_url VARCHAR(255)
);

-- Tabela JOGOS
CREATE TABLE jogos (
    id_jogo SERIAL PRIMARY KEY,
    adversario VARCHAR(100) NOT NULL,
    data_jogo DATE NOT NULL,
    em_casa BOOLEAN NOT NULL,
    campeonato VARCHAR(100) NOT NULL,
    placar_flamengo INT NOT NULL,
    placar_adversario INT NOT NULL
);

-- Tabela NOTAS
CREATE TABLE notas (
    id_nota SERIAL PRIMARY KEY,
    numero_jogador INT NOT NULL,
    id_jogo INT NOT NULL,
    id_avaliador INT NOT NULL,
    valor_nota DECIMAL(3, 1) NOT NULL CHECK (valor_nota >= 0 AND valor_nota <= 10),
    FOREIGN KEY (numero_jogador) REFERENCES jogadores(numero_camisa),
    FOREIGN KEY (id_jogo) REFERENCES jogos(id_jogo),
    FOREIGN KEY (id_avaliador) REFERENCES avaliadores(id_avaliador),
    UNIQUE(numero_jogador, id_jogo, id_avaliador)
);

-- Inserir Avaliadores
INSERT INTO avaliadores (nome) VALUES ('Simões');
INSERT INTO avaliadores (nome) VALUES ('Bruninho');

-- Exemplo de dados para testes
INSERT INTO jogadores (numero_camisa, nome, data_nascimento, posicao, foto_url) 
VALUES 
(1, 'Santos', '1990-01-15', 'Goleiro', NULL),
(2, 'Maurício', '1992-03-22', 'Lateral Direito', NULL),
(3, 'João', '1989-05-10', 'Zagueiro', NULL),
(4, 'Ayrton', '1993-07-18', 'Lateral Esquerdo', NULL),
(5, 'Erick Pulga', '1988-09-12', 'Volante', NULL),
(6, 'Thiago Maia', '1996-03-25', 'Volante', NULL),
(7, 'Arrascaeta', '1989-05-01', 'Meio-campista', NULL),
(8, 'Michael', '1999-12-07', 'Atacante', NULL),
(9, 'Gabigol', '1996-08-30', 'Atacante', NULL),
(10, 'Pedro', '2001-03-29', 'Atacante', NULL);

-- Exemplo de jogo
INSERT INTO jogos (adversario, data_jogo, em_casa, campeonato, placar_flamengo, placar_adversario)
VALUES ('Vasco', '2024-01-20', true, 'Carioca', 2, 1);
