
module.exports = (req, res) => {
    const myUrl = new URL(
        "https://example.com:8080/products?name=phone&price=20000"
    );

    const output = [
        "Protocol: " + myUrl.protocol,
        "Hostname: " + myUrl.hostname,
        "Port: " + myUrl.port,
        "Pathname: " + myUrl.pathname,
        "Search: " + myUrl.search,
        "Search Params: " + myUrl.searchParams
    ];

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(output.join("\n"));
};
