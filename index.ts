import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
config();

import { createServer } from "http";
import PrismaClient from "./prisma/PrismaClient";
import { CarType } from "@prisma/client";

const App = express();
const HttpServer = createServer(App);

export const PORT = process.env.PORT;
export const DB_SECRET = process.env.DB_SECRET as string;

App.use(cors());
App.use(bodyParser.json());

App.get("/", (req, res) => {
  return res.send("Hello World");
});

App.get("/cars", async (req, res) => {
  try {
    const { Price, Type, Capacity } = req.query;
    const price = typeof Price === "string" ? parseInt(Price) : 60;

    const carTypeArray =
      typeof Type === "string" && Type.length > 0
        ? (Type.split(",") as CarType[])
        : ([
            "SUV",
            "SPORT",
            "COUPE",
            "HATCHBACK",
            "MPV",
            "SEDAN",
          ] as CarType[]);

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
});


App.get("/popular", async (req, res) => {
  try {
    const results = await PrismaClient.car.findMany({
        take:7,
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
    })
    return res.send({ results });
  } catch (error) {
    return res.send({ error });
  }
});


App.get("/recommended", async (req, res) => {
  try {
    const results = await PrismaClient.car.findMany({
        take:7,
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
    })
    return res.send({ results });
  } catch (error) {
    return res.send({ error });
  }
});

App.get("/search", async (req, res) => {
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
});

App.post("/addbulk", async (req, res) => {
  const result = await PrismaClient.car.createMany({
    data: req.body.test,
  });

  return res.send({ result });
});

App.post("/price", async (req, res) => {
  const result = await PrismaClient.car.createMany({
    data: req.body.test,
  });

  return res.send({ result });
});

HttpServer.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
export default App;
