const fs = require("fs");
const fsPromises = require("fs").promises;
// ==========================================
// 1. SYNCHRONOUS
 //==========================================
console.log("===== SYNCHRONOUS =====");
// WRITE
fs.writeFileSync("sync.txt", "Hello Divyasri");
console.log("File Written Successfully");
// READ
let data = fs.readFileSync("sync.txt", "utf8");
console.log("File Content:");
console.log(data);
// APPEND
fs.appendFileSync("sync.txt", "\nWelcome to Node.js");
console.log("Data Appended Successfully");
// READ AGAIN
data = fs.readFileSync("sync.txt", "utf8");
console.log("Updated File Content:");
console.log(data);

// ==========================================
// 2. ASYNCHRONOUS - CALLBACK
// ==========================================
console.log("\n===== ASYNCHRONOUS =====");
fs.writeFile("async.txt", "Hello Divyasri", (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("File Written Successfully");
    // READ
    fs.readFile("async.txt", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("File Content:");
        console.log(data);
        // APPEND
        fs.appendFile("async.txt", "\nWelcome to Node.js", (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("Data Appended Successfully");
            // READ AGAIN
            fs.readFile("async.txt", "utf8", (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Updated File Content:");
                console.log(data);
            });
        });
    });
});
console.log("\nProgram End");