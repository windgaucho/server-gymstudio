import dotenv from 'dotenv';

const file = process.env.NODE_ENV !== 'production' ? '.env-dev' : '.env-prod';

console.log(dotenv.config({ path: file }));
