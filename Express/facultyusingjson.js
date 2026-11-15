import express from "express";
import fs from "fs";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

/**
 * Faculty file persist app server
 * Create POST http://localhost:8080/api/v1/faculty
 * Read GET http://localhost:8080/api/v1/faculty
 * Read GET http://localhost:8080/api/v1/faculty/:id
 * Read GET http://localhost:8080/api/v1/faculty?dept=<department>
 * Update PUT http://localhost:8080/api/v1/faculty/:id
 * Delete DELETE http://localhost:8080/api/v1/faculty/:id
 */

const readData = () => {
    const data = fs.readFileSync("./data/faculty.json", "utf-8");
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(
        "./data/faculty.json",
        JSON.stringify(data, null, 2),
        "utf-8"
    );
};

app.post("/api/v1/faculty", (req, res) => {
    const allFaculty = readData();
    const newFaculty = {
        id: allFaculty.length === 0 ? 1 : allFaculty[allFaculty.length - 1].id + 1,
        ...req.body,
    };

    allFaculty.push(newFaculty);
    writeData(allFaculty);

    res
        .status(201)
        .json({ message: "Faculty created successfully", data: newFaculty });
});

// Read all faculty
app.get("/api/v1/faculty", (req, res) => {
    let allFaculty = readData();

    if (req.query.dept) {
        const dept = req.query.dept.toLowerCase();
        allFaculty = allFaculty.filter(f => f.dept.toLowerCase() === dept);
    }

    res
        .status(200)
        .json({ message: "All faculty retrieved successfully", data: allFaculty });
});

// Read single faculty by id
app.get("/api/v1/faculty/:id", (req, res) => {
    const allFaculty = readData();
    const faculty = allFaculty.find(f => f.id === parseInt(req.params.id));

    if (!faculty) {
        return res.status(404).json({ message: "Faculty not found" });
    }

    res
        .status(200)
        .json({ message: "Faculty retrieved successfully", data: faculty });
});

// Update faculty by id
app.put("/api/v1/faculty/:id", (req, res) => {
    const allFaculty = readData();
    const facultyIndex = allFaculty.findIndex(f => f.id === parseInt(req.params.id));

    if (facultyIndex !== -1) {
        const updatedFaculty = { ...allFaculty[facultyIndex], ...req.body };
        allFaculty[facultyIndex] = updatedFaculty;
        writeData(allFaculty);

        res
            .status(200)
            .json({ message: "Faculty updated successfully", data: updatedFaculty });
    } else {
        res.status(404).json({ message: "Faculty not found" });
    }
});

// Delete faculty by id
app.delete("/api/v1/faculty/:id", (req, res) => {
    const allFaculty = readData();
    const facultyIndex = allFaculty.findIndex(f => f.id === parseInt(req.params.id));

    if (facultyIndex !== -1) {
        const deletedFaculty = allFaculty.splice(facultyIndex, 1)[0];
        writeData(allFaculty);

        res
            .status(200)
            .json({ message: "Faculty deleted successfully", data: deletedFaculty });
    } else {
        res.status(404).json({ message: "Faculty not found" });
    }
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});