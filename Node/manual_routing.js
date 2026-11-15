const http = require("http");
const server = http.createServer((req, res) => {
    // CREATE
    if (req.method === "POST" && req.url === "/students") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("Student Created");
        res.end();
    }
    // READ
    else if (req.method === "GET" && req.url === "/students") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("Student Read");
        res.end();
    }
    // UPDATE
    else if (req.method === "PUT" && req.url === "/students") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("Student Updated");
        res.end();
    }
    // DELETE
    else if (req.method === "DELETE" && req.url === "/students") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("Student Deleted");
        res.end();
    }
    // INVALID ROUTE
    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write("Page NotFound");
        res.end();
    }
});
server.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");
});