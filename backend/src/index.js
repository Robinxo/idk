import app from "./app.js";
import connectDB from "./db/index.js";
import "dotenv/config";

// Declaration!
const PORT = process.env.PORT || 4500;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`\n⚙️ Server is running at port : ${PORT}!!`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed!", error);
  });
