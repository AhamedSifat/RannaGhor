import express from 'express';
import dovenv from 'dotenv';
import connectDB from './config/db.js';
import authRoute from './routes/auth.js';
dovenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/auth', authRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Auth service is running on port ${PORT}`);
});
