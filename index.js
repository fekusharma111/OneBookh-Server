import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/router.js";
import connection from "./database/db.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's domain
    credentials: true,
  })
);
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);

const db_url = process.env.MONGO_URI;
connection(db_url);

app.listen(5001, () => {
  console.log("OneBookh server is running on 5001");
});
