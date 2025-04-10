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
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);

// routes import
import router from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import movieRouter from "./routes/movie.routes.js";
import bookingRouter from "./routes/booking.routes.js";

// routes declaration
app.use("/users", router);
app.use("/admin", adminRouter);
app.use("/movies", movieRouter);
app.use("/bookings", bookingRouter);

export default app;
