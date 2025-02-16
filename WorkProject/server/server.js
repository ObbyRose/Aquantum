import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDb.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

connectDB();

const frontendPath = path.join(__dirname, "../../client/dist");

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(frontendPath));
app.use(
    cors({
        origin: "https://localhost:8081",
        methods: ["GET", "POST", "PUT", "DELETE"], 
        credentials: true,
    })
);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
