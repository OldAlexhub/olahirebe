import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import connectToDb from "./db/connectToDb.js";
import router from "./routes/routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(express.json({ limit: "32mb", extended: true }));
app.use(express.urlencoded({ limit: "32mb", extended: true }));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

connectToDb();
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
