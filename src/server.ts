import { Server } from 'http';
import app from './app'
import mongoose from 'mongoose'


let server: Server;

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
    } catch (err) {
        // if any error happens during mongodb connection
        console.log(err);
    }
}

main()
