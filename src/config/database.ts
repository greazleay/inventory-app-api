import { connect, connection } from 'mongoose';

const initDB = () => {

    const options = {
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 20000, // Keep trying to send operations for 20 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        family: 4, // Use IPv4, skip trying IPv6,
        ssl: true,
    };

    const mongoDB = process.env.DB_URL as string;
    connect(mongoDB, options);
    connection.on('connected', () => console.log('Mongoose connected to DB cluster'));
    connection.on('error', () => console.error.bind(console, 'MongoDB connection error:'));
    connection.on('disconnected', () => console.log('Mongoose disconnected'));
}

export default initDB