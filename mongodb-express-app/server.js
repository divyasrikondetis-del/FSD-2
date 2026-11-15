
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();

app.use(express.json());

// MongoDB Atlas connection
const url = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = process.env.DB_NAME || "booksDB";
let db;

// Connect to MongoDB
client.connect()
    .then(() => {
        console.log("Connected to Mongo DB");
        db = client.db(dbName);
    })
    .catch((err) => {
        console.log("problem in connection MongoDB", err);
    });


// CRUD

// Create - POST
app.post("/api/v1/books", async (req, res) => {
    try {
        const newBook = req.body;

        const result = await db.collection("books").insertOne(newBook);

        res.status(201).json({
            message: "Book Created Successfully",
            data: {
                _id: result.insertedId,
                ...newBook
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message || "Internal Server Error"
        });
    }
});


// READ
app.get("/api/v1/books", async (req, res) => {
    try {
        const { category } = req.query;

        const query = category ? { category: category } : {};

        const result = await db.collection("books")
            .find(query)
            .toArray();

        res.status(200).json({
            message: "Books retrieved successfully",
            data: result
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message || "Internal Server Error"
        });
    }
});


// READ by id
app.get("/api/v1/books/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid book ID"
            });
        }

        const result = await db.collection("books").findOne({
            _id: new ObjectId(id)
        });

        if (result) {
            res.status(200).json({
                message: "Book retrieved successfully",
                data: result
            });
        } else {
            res.status(404).json({
                message: "Book not found"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message || "Internal Server Error"
        });
    }
});


// Update books by id
app.put("/api/v1/books/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBook = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid book ID"
            });
        }

        const result = await db.collection("books")
            .updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedBook }
            );

        if (result.matchedCount === 1) {
            res.status(200).json({
                data: {
                    _id: new ObjectId(id),
                    ...updatedBook
                }
            });
        } else {
            res.status(404).json({
                message: "Book not found"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message || "Internal Server Error"
        });
    }
});


// Delete Book by id
app.delete("/api/v1/books/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid book ID"
            });
        }

        const result = await db.collection("books").deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 1) {
            res.status(200).json({
                message: "Book deleted successfully"
            });
        } else {
            res.status(404).json({
                message: "Book not found"
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message || "Internal Server Error"
        });
    }
});


// 404 middleware
app.use((req, res) => {
    res.status(404).json({
        message: "Route Not Found"
    });
});


// Run server after MongoDB connects
const port = process.env.PORT || 5000;

async function startServer() {
    try {
        await client.connect();

        console.log("Connected to Mongo DB");

        db = client.db(dbName);

        app.listen(port, () => {
            console.log(`App running on port ${port}`);
        });
    } catch (err) {
        console.log("problem in connection MongoDB", err);
        process.exit(1);
    }
}

startServer();
