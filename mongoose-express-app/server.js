
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME;

// Middleware
app.use(express.json());

// Movie Schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: String,
    category: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
});

// Movie Model
const Movie = mongoose.model("Movie", movieSchema);

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Mongoose Express App"
    });
});

// CREATE - Add a new movie
app.post("/api/v1/movies", async (req, res) => {
    try {
        const result = await Movie.create(req.body);

        res.status(201).json({
            message: "Movie created successfully",
            data: result
        });
    } catch (err) {
        res.status(400).json({
            message: "Movie creation failed",
            error: err.message
        });
    }
});

// READ - Get all movies or filter by category
app.get("/api/v1/movies", async (req, res) => {
    try {
        const { category } = req.query;
        const query = category ? { category } : {};

        const result = await Movie.find(query);

        res.status(200).json({
            message: "Movie fetched successfully",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            message: "Movie fetching failed",
            error: err.message
        });
    }
});

// READ - Get a movie by ID
app.get("/api/v1/movies/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid movie ID"
            });
        }

        const result = await Movie.findById(id);

        if (!result) {
            return res.status(404).json({
                message: "Movie Not found"
            });
        }

        res.status(200).json({
            message: "Movie details fetched successfully",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            message: "Movie fetching failed",
            error: err.message
        });
    }
});

// UPDATE - Update a movie by ID
app.put("/api/v1/movies/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid movie ID"
            });
        }

        const result = await Movie.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!result) {
            return res.status(404).json({
                message: "Movie Not found"
            });
        }

        res.status(200).json({
            message: "Movie updated successfully",
            data: result
        });
    } catch (err) {
        res.status(400).json({
            message: "Movie update failed",
            error: err.message
        });
    }
});

// DELETE - Delete a movie by ID
app.delete("/api/v1/movies/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid movie ID"
            });
        }

        const result = await Movie.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({
                message: "Movie Not found"
            });
        }

        res.status(200).json({
            message: "Movie deleted successfully",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            message: "Movie deletion failed",
            error: err.message
        });
    }
});

// Start server after MongoDB connection
const startServer = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is missing");
        }

        await mongoose.connect(MONGO_URI, {
            dbName: DB_NAME
        });

        console.log("Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Problem with connecting to MongoDB:", err.message);
        process.exit(1);
    }
};

startServer();
