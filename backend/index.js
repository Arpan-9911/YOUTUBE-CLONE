import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';

dotenv.config();
const app = express();
const server = http.createServer(app);

import userRoutes from './routes/userRoute.js'
import contentRoutes from './routes/contentRoute.js'

// Middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.use("/user", userRoutes);
app.use("/content", contentRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(`${process.env.DB_URL}/youtube-clone`)
  .then(() =>
    server.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));