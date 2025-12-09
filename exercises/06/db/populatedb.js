#!/usr/bin/env node
import pool from './pool.js';

const SQL = `
CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  year INTEGER NOT NULL
);

INSERT INTO books (title, author, year)
VALUES
('Las Aventuras de Javi', 'Javier Arroyo', 2025),
('Luis y sus amigops en el reino de la fantasía', 'Luis Corrales', 2025)
ON CONFLICT DO NOTHING;
`;

async function main() {
  await pool.query(SQL);
  console.log('Database seeded');
  process.exit(0);
}

main();
