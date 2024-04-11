import { Request, Response } from "express";
import { tokenType } from "../middlewares/auth.middleware";
import PrismaClient from "../../prisma/PrismaClient";
const book = async (req: Request, res: Response) => {
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

    const checkBooking = await PrismaClient.booking.count({
      where: {
        carId: carId,
        OR: [
          {
            AND: [
              {
                startDate: {
                  lte: new Date(pickUpDateAndTime.toString()),
                },
                endDate: {
                  gte: new Date(pickUpDateAndTime.toString()),
                },
              },
              {
                startDate: {
                  lte: new Date(dropOffDateAndTime.toString()),
                },
                endDate: {
                  gte: new Date(dropOffDateAndTime.toString()),
                },
              },
            ],
          },
          {
            OR: [
              {
                startDate: {
                  gte: new Date(pickUpDateAndTime.toString()),
                  lte: new Date(dropOffDateAndTime.toString()),
                },
              },
              {
                endDate: {
                  gte: new Date(pickUpDateAndTime.toString()),
                  lte: new Date(dropOffDateAndTime.toString()),
                },
              },
            ],
          },
        ],
      },
    });

    if (checkBooking > 0) {
      return res.status(409).send({
        message: "Already Booked!",
      });
    }
    const result = await PrismaClient.booking.create({
      data: {
        pickUp: pickUpLocation,
        dropOff: dropOffLocation,
        startDate: new Date(pickUpDateAndTime),
        endDate: new Date(dropOffDateAndTime),
        totalCost: 1000,
        carId: carId,
        userId: user.userId,
      },
    });
    return res.send({ result });
  } catch (error) {
    return res.send(error);
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const results = await PrismaClient.booking.findMany({
      where: {
        userId: user.userId,
      },
      include: {
        car: {
          select:{
            baseUrl:true,
            imageUrl:true,
            name:true,
            fuelcapacity:true,
            carType:true,
            gearType:true,
            seats:true,
            price:{
              select:{
                rentalPrice:true,
                offerPrice:true
              }
            }
          }
        }
      }
    });
    return res.send({ results });
  } catch (error) {
    return res.send(error);
  }
};

export { book, getAllBookings };
