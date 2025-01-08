import express from 'express';
import rateLimit from "express-rate-limit";
import cors from "cors";
import cookieParser from "cookie-parser";

import AppError from "./utils/appError.js";
import globalErrorHandler from "./controllers/errorController.js";
import sheetRoutes from './routes/sheetRoutes.js';

const app = express();
app.enable('trust proxy');

// Enable CORS
app.use(cors());
app.options('*', cors());

// Limiting the requests from one IP per hour
const limiter = rateLimit({
  max: 500, // Adjust as necessary
  windowMs: 60 * 60 * 1000, // 1 hour
  message: "Too many requests from this IP, please try again in an hour",
});
app.use("/api", limiter);

// Body parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Add request timestamp
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use('/api/v1/sheets', sheetRoutes);

// Error handling
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

export default app;
