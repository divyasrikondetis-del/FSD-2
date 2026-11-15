module.exports = (req, res) => {
    console.log("Hello World");
    res.setHeader("Content-Type", "text/plain");
    res.send("Hello World");
};