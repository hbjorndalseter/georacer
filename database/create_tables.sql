-- Aktiver PostGIS i databasen
CREATE EXTENSION IF NOT EXISTS postgis;

-- Opprett en tabell for biler med en PostGIS-lokasjon
CREATE TABLE IF NOT EXISTS cars (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location GEOMETRY(Point, 4326) NOT NULL
);

-- Sjekk at PostGIS fungerer
SELECT postgis_full_version();