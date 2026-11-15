const url = require("url");
const myUrl = new URL(
    "https://example.com:8080/products?name=phone&price=20000"
);
console.log("Protocol:", myUrl.protocol);
console.log("Hostname:", myUrl.hostname);
console.log("Port:", myUrl.port);
console.log("Pathname:", myUrl.pathname);
console.log("Search:", myUrl.search);
console.log("Search Params:", myUrl.searchParams);
