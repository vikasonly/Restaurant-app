import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import reservationRouter from "./routes/reservationRoute.js";
import { errorMiddleware } from "./error/error.js";

dotenv.config({ path: "./config/config.env" });


const app = express();


app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/reservation", reservationRouter);


dbConnection();

app.use(errorMiddleware);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(` Server is running on port ${PORT}`);
});
