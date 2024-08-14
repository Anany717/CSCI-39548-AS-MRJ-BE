import express from 'express';
import { db } from './database/database.js';
import { Employee, Task } from './database/models/index.js';

const app = express();
app.use(express.json());

db.sync()  
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => console.error('Failed to sync database:', err));

// Routes here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});