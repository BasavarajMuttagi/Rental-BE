import express from "express";
import { validateToken } from "../middlewares/auth.middleware";
import { book, getAllBookings } from "../controllers/booking.controller";

const BookingRouter = express.Router();
BookingRouter.post("/create", validateToken, book);
BookingRouter.get("/getall", validateToken, getAllBookings);

export { BookingRouter };
