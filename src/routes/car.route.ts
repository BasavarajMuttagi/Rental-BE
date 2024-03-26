import express from "express";
import {
  getCars,
  getOneCar,
  getPopularCars,
  getRecommendedCars,
  searchCars,
} from "../controllers/car.controller";
import { validateToken } from "../middlewares/auth.middleware";

const CarRouter = express.Router();

CarRouter.get("/cars", validateToken, getCars);

CarRouter.get("/popular", getPopularCars);

CarRouter.get("/recommended", getRecommendedCars);

CarRouter.get("/search", searchCars);

CarRouter.get("/detail/:id", getOneCar);

export { CarRouter };
