
module.exports = (req, res) => {
    res.setHeader("Content-Type", "text/html");

    if (req.method === "POST") {
        return res.status(200).send("Student Created");
    }
    else if (req.method === "GET") {
        return res.status(200).send("Student Read");
    }
    else if (req.method === "PUT") {
        return res.status(200).send("Student Updated");
    }
    else if (req.method === "DELETE") {
        return res.status(200).send("Student Deleted");
    }
    else {
        return res.status(404).send("Page NotFound");
    }
};
