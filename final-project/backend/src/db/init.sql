DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO categories (name) VALUES ('Desayunos'), ('Comidas'), ('Cenas'), ('Postres');


INSERT INTO recipes (title, ingredients, instructions, category_id) VALUES 
('Tortitas Americanas', 'Harina, Leche, Huevos, Levadura', 'Mezclar ingredientes secos. Añadir líquidos. Cocinar en sartén.', 1),
('Ensalada César', 'Lechuga, Pollo, Picatostes, Salsa César', 'Lavar lechuga. Añadir pollo a la plancha y salsa.', 2),
('Brownie de Chocolate', 'Chocolate, Mantequilla, Azúcar, Huevos, Harina', 'Derretir chocolate. Mezclar todo. Hornear 25 min a 180ºC.', 4);