import PrismaClient from "../../prisma/PrismaClient";
import { Request, Response } from "express";
import { tokenType } from "../middlewares/auth.middleware";
const addToFavorite = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { carId } = req.body;
    const user = req.body.user as tokenType;

    console.log(user.userId, carId);
    const result = await PrismaClient.favorite.create({
      data: {
        userId: user.userId,
        carId,
      },
    });

    if (!result) {
      return res.sendStatus(403);
    }
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(404);
  }
};

const removeFromFavorite = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { favoriteId } = req.body;
    const user = req.body.user as tokenType;

    console.log(user.userId, favoriteId);
    const result = await PrismaClient.favorite.delete({
      where: {
        id: favoriteId,
      },
    });

    if (!result) {
      return res.sendStatus(403);
    }
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(404);
  }
};

const getAllFavorites = async (req: Request, res: Response) => {
  try {
    const user = req.body.user as tokenType;
    const results = await PrismaClient.car.findMany({
      where: {
        favorite: {
          some: {
            userId: user.userId,
          },
        },
      },
      include: {
        price: {
          select: {
            offerPrice: true,
            rentalPrice: true,
          },
        },
        availability: {
          select: {
            carStatus: true,
            currentLocation: true,
          },
        },
        favorite: {
          select: {
            carId: true,
            userId: true,
            id: true,
          },
        },
      },
    });

    if (!results) {
      return res.sendStatus(403);
    }
    return res.status(200).send({ results });
  } catch (error) {
    return res.sendStatus(404);
  }
};

export { addToFavorite, removeFromFavorite, getAllFavorites };
