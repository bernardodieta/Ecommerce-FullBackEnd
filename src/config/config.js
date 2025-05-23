import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program
    .option('-d', 'Variable para debug', false)
    .option('-p <port>', 'Puerto del servidor', 9090)
    .option('--mode <mode>', 'Modo de trabajo', 'develop')
program.parse();

console.log("Mode Option: ", program.opts().mode);

const environment = program.opts().mode;

dotenv.config({
    path: environment === "production" ? "./src/config/.env.production" : "./src/config/.env.development"
});


export default {
    port: process.env.SERVER_PORT,
    stripeSecretKey: process.env.STRIPE_APP_SECRET_KEY,
    mongoUrl: process.env.MONGO_URL,
    adminName: process.env.ADMIN_NAME,
    adminPasswor: process.env.ADMIN_PASSWORD,
    gmailAccount: process.env.GMAIL_ACCOUNT,
    gmailAppPassword: process.env.GMAIL_APP_PASSWD,

}
