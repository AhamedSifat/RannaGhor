import express from 'express';
import dovenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import restaurantRoutes from './routes/resturant.js';
import menuItemRoutes from './routes/MenuItem.js';
dovenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/restaurant', restaurantRoutes);
app.use('/api/item', menuItemRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Restuarent service is running on port ${PORT}`);
});
