-- ⚽ Dados de Teste - Jogadores Reais do Flamengo
-- Execute com: psql -U postgres -d flamengo_ratings -f test-data.sql

DELETE FROM notas;
DELETE FROM jogos;
DELETE FROM jogadores;

-- ⚽ JOGADORES REAIS DO FLAMENGO (2024)
INSERT INTO jogadores (numero_camisa, nome, data_nascimento, posicao, foto_url) 
VALUES 
-- GOLEIROS
(1, 'Santos', '1990-01-11', 'Goleiro', NULL),
(40, 'Léo Pereira', '1997-08-23', 'Goleiro', NULL),

-- DEFENSORES
-- Laterais Direitos
(2, 'Varela', '1998-07-22', 'Lateral Direito', NULL),
(48, 'Wesley', '1998-11-08', 'Lateral Direito', NULL),

-- Zagueiros
(3, 'David Luiz', '1987-04-22', 'Zagueiro', NULL),
(5, 'Fabrício Bruno', '1997-02-12', 'Zagueiro', NULL),
(34, 'Cleiton', '2004-07-19', 'Zagueiro', NULL),

-- Laterais Esquerdos
(13, 'Ayrton Lucas', '1998-06-01', 'Lateral Esquerdo', NULL),
(6, 'Alex Sandro', '1991-01-02', 'Lateral Esquerdo', NULL),

-- MEIO-CAMPO
-- Volantes
(17, 'Erick Pulga', '1998-02-10', 'Volante', NULL),
(50, 'Thiago Maia', '1996-03-25', 'Volante', NULL),
(27, 'De la Cruz', '2001-06-06', 'Volante', NULL),

-- Meias
(8, 'Arrascaeta', '1989-05-01', 'Meio-campista', NULL),
(25, 'João Gomes', '2002-06-23', 'Meio-campista', NULL),
(19, 'Vidal', '1987-05-22', 'Meio-campista', NULL),

-- ATACANTES
(14, 'Everton Cebolinha', '1996-07-05', 'Atacante', NULL),
(7, 'Michael', '1999-12-07', 'Atacante', NULL),
(9, 'Pedro', '2001-03-29', 'Atacante', NULL),
(10, 'Gabigol', '1996-08-30', 'Atacante', NULL),
(11, 'Bruno Henrique', '1990-10-16', 'Atacante', NULL),
(24, 'Matheus Gonçalves', '2001-04-28', 'Atacante', NULL);

-- 🏆 JOGOS 2024 (Exemplos)
INSERT INTO jogos (adversario, data_jogo, em_casa, campeonato, placar_flamengo, placar_adversario)
VALUES 
('Vasco da Gama', '2024-01-20', true, 'Carioca', 2, 1),
('Botafogo', '2024-01-28', false, 'Carioca', 0, 0),
('Fluminense', '2024-02-10', true, 'Carioca', 3, 1),
('Palmeiras', '2024-02-18', false, 'Campeonato Brasileiro', 1, 1),
('São Paulo', '2024-02-25', true, 'Campeonato Brasileiro', 2, 0),
('Cruzeiro', '2024-03-03', false, 'Campeonato Brasileiro', 1, 0),
('Corinthians', '2024-03-10', true, 'Campeonato Brasileiro', 2, 2),
('Bahia', '2024-03-17', false, 'Campeonato Brasileiro', 0, 1),
('Atlético Mineiro', '2024-03-24', true, 'Campeonato Brasileiro', 3, 2),
('Grêmio', '2024-03-31', false, 'Campeonato Brasileiro', 1, 0);

-- 📊 NOTAS DE EXEMPLO (Simões e Bruninho avaliando)
-- Jogo 1: Vasco x Flamengo
INSERT INTO notas (numero_jogador, id_jogo, id_avaliador, valor_nota) VALUES
(1, 1, 1, 7.5),   -- Santos avaliado por Simões
(1, 1, 2, 7.0),   -- Santos avaliado por Bruninho
(2, 1, 1, 8.0),   -- Varela por Simões
(2, 1, 2, 8.5),   -- Varela por Bruninho
(3, 1, 1, 7.0),   -- David Luiz
(3, 1, 2, 6.5),
(5, 1, 1, 8.0),   -- Fabrício Bruno
(5, 1, 2, 8.0),
(8, 1, 1, 9.0),   -- Arrascaeta (destaque)
(8, 1, 2, 9.5),
(10, 1, 1, 8.5),  -- Gabigol
(10, 1, 2, 8.0);

-- Jogo 2: Botafogo x Flamengo
INSERT INTO notas (numero_jogador, id_jogo, id_avaliador, valor_nota) VALUES
(1, 2, 1, 7.0),
(1, 2, 2, 6.5),
(5, 2, 1, 7.5),
(5, 2, 2, 7.0),
(8, 2, 1, 7.5),
(8, 2, 2, 8.0),
(9, 2, 1, 6.5),   -- Pedro
(9, 2, 2, 7.0),
(10, 2, 1, 7.0),
(10, 2, 2, 6.5);

-- Jogo 3: Flamengo x Fluminense  
INSERT INTO notas (numero_jogador, id_jogo, id_avaliador, valor_nota) VALUES
(1, 3, 1, 8.0),
(1, 3, 2, 8.0),
(2, 3, 1, 8.5),
(2, 3, 2, 9.0),
(3, 3, 1, 7.5),
(3, 3, 2, 7.0),
(5, 3, 1, 8.5),
(5, 3, 2, 8.0),
(8, 3, 1, 9.0),
(8, 3, 2, 8.5),
(10, 3, 1, 9.5),  -- Gabigol destaque
(10, 3, 2, 9.0);

-- Jogo 4: Palmeiras x Flamengo
INSERT INTO notas (numero_jogador, id_jogo, id_avaliador, valor_nota) VALUES
(1, 4, 1, 7.5),
(1, 4, 2, 7.0),
(5, 4, 1, 8.0),
(5, 4, 2, 7.5),
(8, 4, 1, 8.0),
(8, 4, 2, 8.5),
(10, 4, 1, 8.0),
(10, 4, 2, 7.5);

-- Jogo 5: Flamengo x São Paulo
INSERT INTO notas (numero_jogador, id_jogo, id_avaliador, valor_nota) VALUES
(1, 5, 1, 8.0),
(1, 5, 2, 8.0),
(2, 5, 1, 8.5),
(2, 5, 2, 8.5),
(5, 5, 1, 8.0),
(5, 5, 2, 7.5),
(8, 5, 1, 8.5),
(8, 5, 2, 8.5),
(10, 5, 1, 9.0),
(10, 5, 2, 8.5);

COMMIT;

-- 📊 Verificar dados
SELECT COUNT(*) as total_jogadores FROM jogadores;
SELECT COUNT(*) as total_jogos FROM jogos;
SELECT COUNT(*) as total_notas FROM notas;

-- 📈 Ver média de notas por jogador
SELECT 
  j.numero_camisa,
  j.nome,
  j.posicao,
  ROUND(AVG(n.valor_nota)::numeric, 2) as media_notas,
  COUNT(DISTINCT n.id_jogo) as jogos_avaliados
FROM jogadores j
LEFT JOIN notas n ON j.numero_camisa = n.numero_jogador
GROUP BY j.numero_camisa, j.nome, j.posicao
ORDER BY media_notas DESC NULLS LAST;
