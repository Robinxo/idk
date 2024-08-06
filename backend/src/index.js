import 'dotenv/config';
import connectDB from './db/index.js';
import app from './app.js';

// Declaration!
const PORT = process.env.PORT || 4500;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n⚙️ Server is running at port : ${PORT}!!`);
    });
  })
  .catch((error) => {
    console.log('MongoDB connection failed!', error);
  });
