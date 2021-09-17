import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import helmet from "helmet";
import compression from "compression";
import initDB from "./config/db.mjs";
import apiRouter from "./routes/api/api.mjs";
import indexRouter from "./routes/index.mjs";
import usersRouter from "./routes/users.mjs";

// Initialize DB
initDB();

const app = express();

app.use(logger('dev'));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(compression());
app.use(helmet());

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/users', usersRouter);

// Handle 404 errors
app.use((req, res) => res.status(404).json({ msg: "The requested resource was not found on this server!!!" }))

export default app