import express from "express";
import { LoginUser, SignUpUser } from "../controllers/auth.controller";
import { validate } from "../middlewares/validation.middleware";
import { userLoginSchema, userSignUpSchema } from "../zod/authSchemas";
import {
  getCars,
  getOneCar,
  getPopularCars,
  getRecommendedCars,
  searchCars,
} from "../controllers/car.controller";


const CarRouter = express.Router();

CarRouter.post("/signup", validate(userSignUpSchema), SignUpUser);

CarRouter.post("/login", validate(userLoginSchema), LoginUser);

CarRouter.get("/cars", getCars);

CarRouter.get("/popular", getPopularCars);

CarRouter.get("/recommended", getRecommendedCars);

CarRouter.get("/search", searchCars);

CarRouter.get("/detail/:id",getOneCar);
export { CarRouter };



// CarRouter.post("/addbulk", async (req, res) => {
//   const result = await PrismaClient.car.createMany({
//     data: req.body.test,
//   });

//   return res.send({ result });
// });

// CarRouter.post("/price", async (req, res) => {
//   const result = await PrismaClient.car.createMany({
//     data: req.body.test,
//   });

//   return res.send({ result });
// });