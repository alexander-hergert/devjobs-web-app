import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import publicRouter from "./routes/publicRoutes.js";
import privateRouter from "./routes/privateUserRoutes.js";
import companyRouter from "./routes/companyUserRoutes.js";
import companyUserRoutes from "./routes/companyUserRoutes.js";

const app = express();
const port = 3000;

//middlewares
app.use(cors());
app.use(bodyParser.json());
//routes
app.use(privateRouter);
app.use(companyRouter);
app.use(companyUserRoutes);
app.use(publicRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
