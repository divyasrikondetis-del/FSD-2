
module.exports = (req, res) => {
    res.setHeader("Content-Type", "text/html");

    res.status(200).send(
        "<h1>Hello this is a web application</h1>"
    );
};
