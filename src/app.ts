import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import { booksRoute } from "./controllers/books.controller";
import { borrowRoute } from "./controllers/borrow.controller";
import cors from "cors";
const app: Application = express();
config();

app.use(express.json());

const allowedOrigins = [
  "https://library-app-red-gamma.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use("/api", booksRoute);
app.use("/api", borrowRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Library Management System");
});

export default app;
