const express = require("express");
const app = express();
app.use(express.json());
const products = [];
// CREATE - POST
app.post("/products", (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json({
        message: "Product created successfully",
        data: newProduct
    });
});
// READ ALL - GET
app.get("/products", (req, res) => {
    res.status(200).json({
        message: "Products retrieved successfully",
        data: products
    });
});
// READ ONE - GET
app.get("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(
        (p) => p.id === productId
    );
    if (product) {
        res.status(200).json({
            message: "Product found successfully",
            data: product
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});
// UPDATE - PUT
app.put("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(
        (p) => p.id === productId
    );
    if (productIndex !== -1) {
        products[productIndex] = {
            ...products[productIndex],
            ...req.body
        };
        res.status(200).json({
            message: "Product updated successfully",
            data: products[productIndex]
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});
// DELETE 
app.delete("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(
        (p) => p.id === productId
    );
    if (productIndex !== -1) {
        const deletedProduct = products.splice(
            productIndex,
            1
        );
        res.status(200).json({
            message: "Product deleted successfully",
            data: deletedProduct[0]
        });
    } else {
        res.status(404).json({
            message: "Product not found"
        });
    }
});
// START SERVER
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});