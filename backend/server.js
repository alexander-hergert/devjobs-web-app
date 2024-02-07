import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import publicRouter from "./routes/publicRoutes.js";
import privateRouter from "./routes/privateUserRoutes.js";
import companyRouter from "./routes/companyUserRoutes.js";
import adminRouter from "./routes/adminUserRoutes.js";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import csrf from "csurf";
import cron from "node-cron";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 3000;

cron.schedule("*/14 * * * *", async () => {
  try {
    const response = await fetch("http://localhost:3000/ping", {
      timeout: 10000,
    });
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
});

//middlewares
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "https://a-hergert-devjobs-web-app.netlify.app",
        "'unsafe-inline'",
      ],
      styleSrc: [
        "'self'",
        "https://a-hergert-devjobs-web-app.netlify.app",
        "'unsafe-inline'",
      ],
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrf({ cookie: true }));
app.use((req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  res.locals.csrfToken = req.csrfToken();
  next();
});

//session
app.use(
  session({
    genid: () => uuidv4(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      //sameSite: "secure",
    },
  })
);
//routes

app.use(adminRouter);
app.use(privateRouter);
app.use(companyRouter);
app.use(publicRouter);

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
