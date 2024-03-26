import express from "express";
import {
  addToFavorite,
  getAllFavorites,
  removeFromFavorite,
} from "../controllers/favorite.controller";
import { validateToken } from "../middlewares/auth.middleware";

const FavoriteRouter = express.Router();

FavoriteRouter.post("/add", validateToken, addToFavorite);
FavoriteRouter.post("/remove", validateToken, removeFromFavorite);
FavoriteRouter.get("/getall", validateToken, getAllFavorites);

export { FavoriteRouter };
