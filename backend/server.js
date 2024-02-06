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

const app = express();
const port = process.env.PORT || 3000;

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
//session
app.use(
  session({
    genid: () => uuidv4(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 },
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
