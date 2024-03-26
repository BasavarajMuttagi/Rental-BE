import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
config();

import { createServer } from "http";
import { AuthRouter } from "./src/routes/auth.route";
import { CarRouter } from "./src/routes/car.route";
import { FavoriteRouter } from "./src/routes/favorite.route";
const App = express();
const HttpServer = createServer(App);

export const PORT = process.env.PORT;
export const DB_SECRET = process.env.DB_SECRET as string;

App.use(cors());
App.use(bodyParser.json());
App.use("/auth", AuthRouter);
App.use("/api/v1", CarRouter);
App.use("/favorite", FavoriteRouter);
App.get("/", (req, res) => {
  return res.send("Hello World");
});

HttpServer.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
export default App;
