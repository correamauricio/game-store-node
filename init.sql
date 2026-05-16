CREATE TABLE categoria (
                           id INT PRIMARY KEY AUTO_INCREMENT,
                           nome VARCHAR(100) NOT NULL
);

CREATE TABLE jogo (
                      id INT PRIMARY KEY AUTO_INCREMENT,
                      titulo VARCHAR(100) NOT NULL,
                      genero VARCHAR(50),
                      preco DECIMAL(10,2),
                      categoria_id INT,
                      FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

CREATE TABLE cliente (
                         id INT PRIMARY KEY AUTO_INCREMENT,
                         nome VARCHAR(100) NOT NULL,
                         email VARCHAR(100),
                         idade INT
);

CREATE TABLE compra (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        cliente_id INT,
                        jogo_id INT,
                        data_compra DATE,
                        quantidade INT,
                        FOREIGN KEY (cliente_id) REFERENCES cliente(id),
                        FOREIGN KEY (jogo_id) REFERENCES jogo(id)
);

-- INSERTS CATEGORIA

INSERT INTO categoria (nome) VALUES
                                 ('Ação'),
                                 ('RPG'),
                                 ('Esporte'),
                                 ('Corrida'),
                                 ('Estratégia'),
                                 ('Terror'),
                                 ('Aventura'),
                                 ('Simulação'),
                                 ('Puzzle'),
                                 ('Online');

-- INSERTS JOGO

INSERT INTO jogo (titulo, genero, preco, categoria_id) VALUES
                                                           ('Cyber Force', 'Ação', 199.90, 1),
                                                           ('Kingdom Legends', 'RPG', 249.90, 2),
                                                           ('Football Stars', 'Esporte', 149.90, 3),
                                                           ('Street Racing X', 'Corrida', 179.90, 4),
                                                           ('War Tactics', 'Estratégia', 129.90, 5),
                                                           ('Dark Mansion', 'Terror', 99.90, 6),
                                                           ('Lost Island', 'Aventura', 159.90, 7),
                                                           ('City Builder', 'Simulação', 89.90, 8),
                                                           ('Brain Master', 'Puzzle', 49.90, 9),
                                                           ('Battle Arena', 'Online', 0.00, 10);

-- INSERTS CLIENTE

INSERT INTO cliente (nome, email, idade) VALUES
                                             ('Ana Silva', 'ana@gmail.com', 22),
                                             ('Carlos Souza', 'carlos@gmail.com', 30),
                                             ('Marina Lima', 'marina@gmail.com', 19),
                                             ('Pedro Alves', 'pedro@gmail.com', 27),
                                             ('Fernanda Costa', 'fernanda@gmail.com', 25),
                                             ('Lucas Martins', 'lucas@gmail.com', 18),
                                             ('Juliana Rocha', 'juliana@gmail.com', 31),
                                             ('Gabriel Mendes', 'gabriel@gmail.com', 29),
                                             ('Patricia Gomes', 'patricia@gmail.com', 35),
                                             ('Ricardo Nunes', 'ricardo@gmail.com', 24);

-- INSERTS COMPRA

INSERT INTO compra (cliente_id, jogo_id, data_compra, quantidade) VALUES
                                                                      (1, 1, '2026-05-01', 1),
                                                                      (2, 3, '2026-05-02', 2),
                                                                      (3, 2, '2026-05-02', 1),
                                                                      (4, 5, '2026-05-03', 1),
                                                                      (5, 4, '2026-05-03', 3),
                                                                      (6, 10, '2026-05-04', 1),
                                                                      (7, 6, '2026-05-04', 2),
                                                                      (8, 7, '2026-05-05', 1),
                                                                      (9, 8, '2026-05-05', 1),
                                                                      (10, 9, '2026-05-06', 4);