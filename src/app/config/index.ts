import dotenv from 'dotenv';
dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  paymentUrl: process.env.PAYMENT_URL,
  storeId: process.env.STORE_ID,
  signature_key: process.env.SIGNATURE_KEY,
  payment_verify_url: process.env.PAYMENT_VERIFY_URL,
};
