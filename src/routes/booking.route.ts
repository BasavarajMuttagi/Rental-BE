import express from "express";
import { validateToken } from "../middlewares/auth.middleware";
import { book } from "../controllers/booking.controller";

const BookingRouter = express.Router();
BookingRouter.post("/create", validateToken, book);

export { BookingRouter };
