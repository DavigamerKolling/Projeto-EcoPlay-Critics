CREATE DATABASE ecoplay;

USE ecoplay;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  reset_token VARCHAR(255),
  reset_expires DATETIME
);

CREATE TABLE games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  platform VARCHAR(50),
  waste_type VARCHAR(50),
  description TEXT,
  created_by INT,
  slug VARCHAR(150),
  cover_url VARCHAR(255),
  youtube_id VARCHAR(50),
  platforms_json TEXT,
  links_json TEXT
);

CREATE TABLE game_media (
  id INT AUTO_INCREMENT PRIMARY KEY,
  game_id INT NOT NULL,
  media_type ENUM('image','video_file') NOT NULL,
  url VARCHAR(255) NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);

CREATE TABLE game_comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  game_id INT NOT NULL,
  user_id INT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO games
(title, slug, description, cover_url, youtube_id, platforms_json, links_json, waste_type, created_by)
VALUES
(
'Beyond Blue',
'beyond-blue',
'Beyond Blue é uma narrativa de aventura que explora os mistérios do oceano através dos olhos de uma cientista exploradora.',
'img/beyond-blue.jpg',
'pOAWBCXpo6k',
'["steam","epic","linux","playstation","xbox","switch"]',
'{
 "steam":"https://store.steampowered.com/app/883360/Beyond_Blue/",
 "epic":"https://store.epicgames.com/p/beyond-blue",
 "playstation":"https://store.playstation.com/product/UP2159-CUSA18922_00-BEYONDBLUESIEA00",
 "xbox":"https://www.xbox.com/games/store/beyond-blue/9nvnnrk91z81",
 "switch":"https://www.nintendo.com/store/products/beyond-blue-switch/"
}',
'ambiental',
1
);

INSERT INTO games
(title, slug, description, cover_url, platforms_json, links_json, waste_type, created_by)
VALUES
(
'Plasticity',
'plasticity',
'Um puzzle-platformer em um mundo dominado pelo plástico onde suas escolhas impactam o ambiente.',
'img/plasticity.jpg',
'["steam","linux"]',
'{
 "steam":"https://store.steampowered.com/app/1069360/Plasticity/",
 "linux":"https://store.steampowered.com/app/1069360/Plasticity/"
}',
'plástico',
1
);

INSERT INTO games
(title, slug, description, cover_url, youtube_id, platforms_json, links_json, waste_type, created_by)
VALUES
(
'Terra Nil',
'terra-nil',
'Um construtor de cidades inverso onde o objetivo é restaurar a natureza e não expandir civilizações.',
'img/terra-nil.jpg',
'CFw7lPW6WOA',
'["steam","epic","linux","switch","android","apple"]',
'{
 "steam":"https://store.steampowered.com/app/1593030/Terra_Nil/",
 "epic":"https://store.epicgames.com/p/terra-nil-508d16",
 "linux":"https://store.steampowered.com/app/1593030/Terra_Nil/",
 "switch":"https://www.nintendo.com/store/products/terra-nil-switch/",
 "android":"https://play.google.com/store/apps/details?id=com.netflix.NGP.TerraNil&hl",
 "apple":"https://apps.apple.com/app/terra-nil/id1643974911"
}',
'recuperação ambiental',
1
);

INSERT INTO games
(title, slug, description, cover_url, youtube_id, platforms_json, links_json, waste_type, created_by)
VALUES
(
'Alba: A Wildlife Adventure',
'alba',
'Explore uma ilha mediterrânea e ajude a proteger os animais e o meio ambiente.',
'img/Alba.jpg',
'a-Eu9WE3grA',
'["steam","epic","linux","playstation","xbox","switch","apple"]',
'{
 "steam":"https://store.steampowered.com/app/1337010/Alba_A_Wildlife_Adventure/",
 "epic":"https://store.epicgames.com/p/alba-a-wildlife-adventure-93736a",
 "linux":"https://store.steampowered.com/app/1337010/Alba_A_Wildlife_Adventure/",
 "playstation":"https://store.playstation.com/product/UP1309-PPSA03132_00-ALBAADVENTUREPS5",
 "xbox":"https://www.xbox.com/games/store/alba-a-wildlife-adventure/9NC05CGPWG0Z",
 "switch":"https://www.nintendo.com/store/products/alba-a-wildlife-adventure-switch/",
 "apple":"https://apps.apple.com/us/app/alba-a-wildlife-adventure/id1528014682"
}',
'preservação',
1
);

INSERT INTO games
(title, slug, description, cover_url, youtube_id, platforms_json, links_json, waste_type, created_by)
VALUES
(
'Endling - Extinction is Forever',
'endling',
'Você controla a última raposa da Terra tentando sobreviver em um mundo destruído pela humanidade.',
'img/endling.jpg',
'kiM2_XB_HZE',
'["steam","epic","linux","playstation","xbox","switch","android","apple"]',
'{
 "steam":"https://store.steampowered.com/app/898890/Endling__Extinction_is_Forever/",
 "epic":"https://store.epicgames.com/p/endling-extinction-is-forever",
 "linux":"https://store.steampowered.com/app/898890/Endling__Extinction_is_Forever/",
 "playstation":"https://store.playstation.com/product/UP0977-PPSA08511_00-3064604549696432",
 "xbox":"https://www.xbox.com/games/store/endling-extinction-is-forever/9p42dsxnccdg",
 "switch":"https://www.nintendo.com/store/products/endling-extinction-is-forever-switch/",
 "android":"https://play.google.com/store/apps/details?id=com.hg.endling&hl",
 "apple":"https://apps.apple.com/app/endling/id1625083646"
}',
'extinção animal',
1
);

INSERT INTO games
(title, slug, description, cover_url, youtube_id, platforms_json, links_json, waste_type, created_by)
VALUES
(
'Seeds of Resilience',
'seeds-of-resilience',
'Construa uma vila sustentável enfrentando desastres naturais e aprendendo a respeitar a natureza.',
'img/seeds.jpg',
'BrLUHKkthdY',
'["steam","linux","playstation", "xbox", "switch"]',
'{
 "steam":"https://store.steampowered.com/app/877080/Seeds_of_Resilience/",
 "linux":"https://store.steampowered.com/app/877080/Seeds_of_Resilience/",
 "playstation":"https://store.playstation.com/product/UP4199-CUSA25868_00-8045343880742294",
 "xbox":"https://www.xbox.com/games/store/seeds-of-resilience/9nrfdw1klm6s",
 "switch":"https://store.steampowered.com/https://www.nintendo.com/pt-pt/Jogos/Aplicacoes-de-download-da-Nintendo-Switch/Seeds-of-Resilience-1797819.html/"
}',
'sustentabilidade',
1
);

INSERT INTO games
(title, slug, description, cover_url, youtube_id, platforms_json, links_json, waste_type, created_by)
VALUES
(
'Eco',
'eco',
'Simulador de sociedade onde cada ação do jogador afeta um ecossistema completo e persistente.',
'img/Eco.jpg',
'd6zvBdUDMPY',
'["steam","linux"]',
'{
 "steam":"https://store.steampowered.com/app/382310/Eco/",
 "linux":"https://store.steampowered.com/app/382310/Eco/"
}',
'ecossistema',
1
);

INSERT INTO games
(title, slug, description, cover_url, youtube_id, platforms_json, links_json, waste_type, created_by)
VALUES
(
'Fate of the World',
'fate-of-the-world',
'Jogo de estratégia global focado em mudanças climáticas e políticas ambientais.',
'img/fate-of-the-world.jpg',
'pDU-g947NJk',
'["steam","linux"]',
'{
 "steam":"https://store.steampowered.com/app/80200/Fate_of_the_World/",
 "linux":"https://store.steampowered.com/app/80200/Fate_of_the_World/",
}',
'mudanças climáticas',
1
);

INSERT INTO games
(title, slug, description, cover_url, youtube_id, platforms_json, links_json, waste_type, created_by)
VALUES
(
'Flower',
'flower',
'Experiência relaxante onde você controla o vento e interage com a natureza.',
'img/flower.jpg',
'0IS9sGGuvYo',
'["steam","linux", "playstation"]',
'{
 "steam":"https://store.steampowered.com/app/966330/Flower/",
 "linux":"https://store.steampowered.com/app/966330/Flower/",
 "playstation":"https://store.playstation.com/product/UP9000-CUSA00092_00-FLOWERPS4000FULL"
}',
'natureza',
1
);

INSERT INTO game_media (game_id, media_type, url, sort_order)
SELECT g.id,'image',CONCAT('img/beyondblue/beyond',n,'.png'),n
FROM games g
JOIN (
SELECT 1 n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15
UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20
) nums
WHERE g.slug='beyond-blue';

INSERT INTO game_media (game_id, media_type, url, sort_order)
SELECT g.id,'image',CONCAT('img/plasticity/plasticity',n,'.png'),n
FROM games g
JOIN (
SELECT 1 n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
) nums
WHERE g.slug='plasticity';

INSERT INTO game_media (game_id, media_type, url, sort_order)
SELECT g.id,'image',CONCAT('img/terranil/terranil',n,'.png'),n
FROM games g
JOIN (
SELECT 1 n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14
) nums
WHERE g.slug='terra-nil';

INSERT INTO game_media (game_id, media_type, url, sort_order)
SELECT g.id,'image',CONCAT('img/alba/alba',n,'.png'),n
FROM games g
JOIN (
SELECT 1 n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
) nums
WHERE g.slug='alba';

INSERT INTO game_media (game_id, media_type, url, sort_order)
SELECT g.id,'image',CONCAT('img/endling/endling',n,'.png'),n
FROM games g
JOIN (
SELECT 1 n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15
UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19
) nums
WHERE g.slug='endling';

INSERT INTO game_media (game_id, media_type, url, sort_order)
SELECT g.id,'image',CONCAT('img/seeds/seeds',n,'.png'),n
FROM games g
JOIN (
SELECT 1 n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8
) nums
WHERE g.slug='seeds-of-resilience';

INSERT INTO game_media (game_id, media_type, url, sort_order)
SELECT g.id,'image',CONCAT('img/eco/eco',n,'.png'),n
FROM games g
JOIN (
SELECT 1 n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15
UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20
UNION SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24 UNION SELECT 25
UNION SELECT 26 UNION SELECT 27 UNION SELECT 28
) nums
WHERE g.slug='eco';

INSERT INTO game_media (game_id, media_type, url, sort_order)
SELECT g.id,'image',CONCAT('img/fotw/fate',n,'.png'),n
FROM games g
JOIN (
SELECT 1 n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5
UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10
) nums
WHERE g.slug='fate-of-the-world';

INSERT INTO game_media (game_id, media_type, url, sort_order)
SELECT g.id,'image',CONCAT('img/flower/flower',n,'.png'),n
FROM games g
JOIN (
SELECT 1 n UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
UNION SELECT 5 UNION SELECT 6 UNION SELECT 7
) nums
WHERE g.slug='flower';
