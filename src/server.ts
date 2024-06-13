import mongoose from 'mongoose';
import app from './app';
import { Server } from 'http';
import config from './app/config';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
