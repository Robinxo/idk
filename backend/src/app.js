import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//uses
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET", "POST", "PUT", "DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// routes import
import router from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import movieRouter from "./routes/movie.routes.js";

// routes declaration
app.use("/users", router);
app.use("/admin", adminRouter);
app.use("/movies", movieRouter);

export default app;
