import express from 'express';
import { db } from './database/database.js';
import { seedDb } from './database/models/index.js';
import { routerHub } from './routes/index.js';
import cors from 'cors';

// Create express server
const app = express();

// Configure app to handle request data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ignore browser requests for favicon file
app.get('/favicon.ico', (req, res) => res.status(204));

// Define a test route
app.get('/hello', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api', routerHub);

// Handle page not found:
// gets triggered when a request is made to an undefined route
app.use((req, res, next) => {
  const error = new Error('Not Found, Please Check URL!');
  error.status = 404;
  next(error);
});

// Error-handling middleware:
// all express errors get passed to this when next(error) is called
app.use((err, req, res, next) => {
  console.error(err);
  console.log(req.originalUrl);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

// Function to sync the database
const syncDatabase = async () => {
  try {

    await db.sync({ force: true });
    console.log('------Synced to db------');

    // Seed the database if their is seed data to insert
    await seedDb();
    console.log('------Database seeded------');

  } catch (err) {
    console.error('Error syncing the database:', err);
  }
};

// Function to boot the application
const bootApp = async () => {
  await syncDatabase();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
};

// Boot the app
bootApp();
