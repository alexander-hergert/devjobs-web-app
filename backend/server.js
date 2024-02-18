import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import publicRouter from "./routes/publicRoutes.js";
import privateRouter from "./routes/privateUserRoutes.js";
import companyRouter from "./routes/companyUserRoutes.js";
import adminRouter from "./routes/adminUserRoutes.js";
import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";
import { v4 as uuidv4 } from "uuid";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import csrf from "csurf";
import cron from "node-cron";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL;

cron.schedule("*/14 * * * *", async () => {
  try {
    const response = await fetch(
      process.env.ENVIRONMENT === "production"
        ? `${baseUrl}/ping`
        : "http://localhost:3000/ping",
      {
        timeout: 10000,
      }
    );
  } catch (error) {
    console.error("Fetch error:", error.message);
  }
});

let redisClient;
let redisStore;

if (process.env.ENVIRONMENT === "production") {
  app.set("trust proxy", 1);

  // Initialize client.
  redisClient = createClient({ url: process.env.REDIS_URL });
  redisClient.connect().catch(console.error);

  // Initialize store.
  redisStore = new RedisStore({
    client: redisClient,
  });
}

//middlewares
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://a-hergert-devjobs-web-app.netlify.app"],
      styleSrc: ["'self'", "https://a-hergert-devjobs-web-app.netlify.app"],
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin:
      process.env.ENVIRONMENT === "production"
        ? "https://a-hergert-devjobs-web-app.netlify.app"
        : "http://localhost:5173",
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

// app.use(
//   csrf({
//     cookie: {
//       secure: true,
//       httpOnly: true,
//       sameSite: "None",
//     },
//   })
// );

// app.use((req, res, next) => {
//   res.cookie("XSRF-TOKEN", req.csrfToken(), {
//     secure: true,
//     httpOnly: false,
//     sameSite: "None",
//   });
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

session;
app.use(
  session({
    genid: () => uuidv4(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: process.env.ENVIRONMENT === "production" ? redisStore : null,
    cookie: {
      secure: process.env.ENVIRONMENT === "production" ? true : false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: process.env.ENVIRONMENT === "production" ? "None" : null,
      domain:
        process.env.ENVIRONMENT === "production"
          ? process.env.DOMAIN
          : "localhost",
      path: "/",
    },
  })
);

// Add logging statements
// app.use((req, res, next) => {
//   console.log("XSRF-TOKEN incoming:", req.cookies["XSRF-TOKEN"]);
//   console.log("XSRF-TOKEN outgoing:", req.csrfToken());
//   console.log(req.cookies);
//   next();
// });

//routes
app.use(adminRouter);
app.use(privateRouter);
app.use(companyRouter);
app.use(publicRouter);

app.listen(port, () => {
  console.log(`Server listening at port: ${port}`);
});
