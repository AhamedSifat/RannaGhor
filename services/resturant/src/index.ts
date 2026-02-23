import express from 'express';
import dovenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
dovenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  connectDB();
  console.log(`Restuarent service is running on port ${PORT}`);
});
