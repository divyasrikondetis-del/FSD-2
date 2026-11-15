
const fs = require("fs");
const path = require("path");
const os = require("os");
const crypto = require("crypto");

module.exports = (req, res) => {
    const output = [];
    const folder = path.join(os.tmpdir(), crypto.randomUUID());

    fs.mkdirSync(folder, { recursive: true });

    const syncFile = path.join(folder, "sync.txt");
    const asyncFile = path.join(folder, "async.txt");

    // SYNCHRONOUS
    output.push("===== SYNCHRONOUS =====");

    fs.writeFileSync(syncFile, "Hello Divyasri");
    output.push("File Written Successfully");

    let data = fs.readFileSync(syncFile, "utf8");
    output.push("File Content:");
    output.push(data);

    fs.appendFileSync(syncFile, "\nWelcome to Node.js");
    output.push("Data Appended Successfully");

    data = fs.readFileSync(syncFile, "utf8");
    output.push("Updated File Content:");
    output.push(data);

    // ASYNCHRONOUS
    output.push("\n===== ASYNCHRONOUS =====");
    output.push("\nProgram End");

    fs.writeFile(asyncFile, "Hello Divyasri", (err) => {
        if (err) return res.status(500).send(err.message);

        output.push("File Written Successfully");

        fs.readFile(asyncFile, "utf8", (err, data) => {
            if (err) return res.status(500).send(err.message);

            output.push("File Content:");
            output.push(data);

            fs.appendFile(asyncFile, "\nWelcome to Node.js", (err) => {
                if (err) return res.status(500).send(err.message);

                output.push("Data Appended Successfully");

                fs.readFile(asyncFile, "utf8", (err, data) => {
                    if (err) return res.status(500).send(err.message);

                    output.push("Updated File Content:");
                    output.push(data);

                    res.setHeader("Content-Type", "text/plain");
                    res.send(output.join("\n"));
                });
            });
        });
    });
};
