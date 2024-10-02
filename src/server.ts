import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

let server: Server;

async function main() {
    try {
        await mongoose.connect(config.database_url!);
        server = app.listen(config.port, () => {
            console.log(`Server is listening in port ${config.port!}`);
        });
    } catch (err) {
        // if any error happens during mongodb connection
        console.log(err);
    }
}

// handle unhandled promise rejection
process.on('unhandledRejection', (reason, promise) => {
    console.error(
        'this unhandled promise =>',
        promise,
        'was rejected for =>',
        reason
    );

    // stops server from accepting new connections
    server.close(() => {
        // terminate the Node.js process
        process.exit(1);
    });
});

// handle synchronous code error
process.on('uncaughtException', (error) => {
    console.error(error);

    // terminate the Node.js process
    process.exit(1);
});

void main();
