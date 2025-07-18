import dotenv from 'dotenv';
dotenv.config();

export const env = {
  TMDB_BASE_URL: process.env.TMDB_BASE_URL!,
  TMDB_ACCESS_TOKEN: process.env.TMDB_ACCESS_TOKEN!,
  DATASOURCE: process.env.DATASOURCE!,
};
