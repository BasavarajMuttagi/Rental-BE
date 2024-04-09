import { Request, Response } from "express";
import { tokenType } from "../middlewares/auth.middleware";
import PrismaClient from "../../prisma/PrismaClient";
const book = async (req: Request, res: Response) => {
  try {
    const {
      rentalInfo: {
        pickUpLocation,
        pickUpDateAndTime,
        dropOffLocation,
        dropOffDateAndTime,
      },
      carId,
    } = req.body;
    const user = req.body.user as tokenType;
    const result = await PrismaClient.booking.create({
      data: {
        pickUp: pickUpLocation,
        dropOff: dropOffLocation,
        startDate: pickUpDateAndTime,
        endDate: dropOffDateAndTime,
        totalCost: 1000,
        carId:carId,
        userId: user.userId,
      },
    });
    return res.send({ result });
  } catch (error) {
    return res.send(error)
  }
};

export { book };
