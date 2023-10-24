import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import connection from "./config/mongo.js"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Hotel from './models/Hotel.js'

connection()

const app = express();
dotenv.config();

app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use("/auth", authRoute);
app.use("/users", usersRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.get('/', async (req, res) => {
  const hotel = await Hotel.find({});
  res.status(200).send(hotel)
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('*', (req, res) => {
  res.sendFile(__dirname + '/pages/notFound.html');
});

app.listen(process.env.PORT, () => {
  console.log("Connected to backend.");
});
