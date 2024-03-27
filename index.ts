import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
config();

import { createServer } from "http";
import { AuthRouter } from "./src/routes/auth.route";
import { CarRouter } from "./src/routes/car.route";
import { FavoriteRouter } from "./src/routes/favorite.route";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { tokenType, validateToken } from "./src/middlewares/auth.middleware";
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

App.post("/upload", validateToken, async (req, res) => {
  const user = req.body.user as tokenType;
  const { fileName, fileType } = req.body;
  console.log({ fileName, fileType });
  if (!fileName || !fileType) {
    return res.sendStatus(400);
  }
  const S3ClientInstance = new S3Client({
    region: process.env.VITE_REGION!,
    credentials: {
      accessKeyId: process.env.VITE_ACCESS_KEY_ID!,
      secretAccessKey: process.env.VITE_SECRET_ACCESS_KEY!,
    },
  });

  const command = new PutObjectCommand({
    Bucket: `${process.env.VITE_BUCKET!}`,
    Key: `users/${user.userId}.${fileName.split(".")[1]}`,
    ContentType: "image/*",
  });

  const url = await getSignedUrl(S3ClientInstance, command, {
    expiresIn: 3600,
  });

  return res.json({
    url,
  });
});

HttpServer.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
export default App;
