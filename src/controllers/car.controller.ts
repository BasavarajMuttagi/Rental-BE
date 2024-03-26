import { CarType } from "@prisma/client";
import PrismaClient from "../../prisma/PrismaClient";
import { Request, Response } from "express";

const getCars = async (req: Request, res: Response) => {
  try {
    const { Price, Type, Capacity } = req.query;
    const price = typeof Price === "string" ? parseInt(Price) : 60;

    const carTypeArray =
      typeof Type === "string" && Type.length > 0
        ? (Type.split(",") as CarType[])
        : (["SUV", "SPORT", "COUPE", "HATCHBACK", "MPV", "SEDAN"] as CarType[]);

    const seats =
      typeof Capacity === "string" && Capacity.length > 0
        ? Capacity.split(",").map((e) => parseInt(e))
        : [2, 4, 6, 8];

    const results = await PrismaClient.car.findMany({
      where: {
        price: {
          offerPrice: {
            gte: price,
          },
        },
        seats: {
          in: seats,
        },
        carType: {
          in: carTypeArray,
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
      },
    });
    return res.send({ results });
  } catch (error) {
    return res.send({ error });
  }
};

const getPopularCars = async (req: Request, res: Response) => {
  try {
    const results = await PrismaClient.car.findMany({
      take: 7,
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
      },
    });
    return res.send({ results });
  } catch (error) {
    return res.send({ error });
  }
};

const getRecommendedCars = async (req: Request, res: Response) => {
  try {
    const results = await PrismaClient.car.findMany({
      take: 7,
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
      },
    });
    return res.send({ results });
  } catch (error) {
    return res.send({ error });
  }
};

const searchCars = async (req: Request, res: Response) => {
  const searchTerm = req.query.term as string;
  console.log(searchTerm);
  if (searchTerm == "") {
    return res.send({ results: [] });
  }
  try {
    const results = await PrismaClient.car.findMany({
      where: {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        baseUrl: true,
        imageUrl: true,
      },
    });

    return res.send({ results });
  } catch (error) {}
};

const getOneCar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({ message: "Page Not Found!" });
    }
    const result = await PrismaClient.car.findUnique({
      where: {
        id: id,
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
      },
    });

    if (!result) {
      return res.status(404).send({ message: "Page Not Found!" });
    }
    return res.send({ result });
  } catch (error) {
    return res.send({ error });
  }
};
export { getCars, getPopularCars, getRecommendedCars, searchCars, getOneCar };
