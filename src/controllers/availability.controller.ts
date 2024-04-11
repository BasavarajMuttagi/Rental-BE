import { Request, Response } from "express";
import { tokenType } from "../middlewares/auth.middleware";
import PrismaClient from "../../prisma/PrismaClient";
const setAvailability = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const {
      rentalInfo: {
        pickUpLocation,
        pickUpDateAndTime,
        dropOffLocation,
        dropOffDateAndTime,
      },
      carId,
    } = req.body;


    return res.send({  });
  } catch (error) {
    return res.send(error)
  }
};

export { setAvailability };
