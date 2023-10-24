import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const connection = async () => {
    const mongoURL = process.env.MONGO;
    await mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
        });
};

export default connection