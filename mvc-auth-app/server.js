
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "MVC Auth API is running successfully"
    });
});

// Todo routes
app.use("/api/v1/todos", todoRoutes);

// User routes
app.use("/api/v1/users", userRoutes);

// Start server after MongoDB connection
const startServer = async () => {
    try {
        if (!mongoURI || !dbName) {
            throw new Error("MongoDB environment variables are missing");
        }

        await connectDB(mongoURI, dbName);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (err) {
        console.error("Server startup failed:", err.message);
        process.exit(1);
    }
};

startServer();
