import { resolve } from 'path';

import { config } from 'dotenv';

config({
  path: resolve(__dirname, `../.env.development`),
});

export const { APP_PORT, DATABASE_URL } = process.env as {
  [key: string]: string;
};
