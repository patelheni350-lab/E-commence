const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Products
const products = [
  { id: 1, name: "T-Shirt", price: 499 },
  { id: 2, name: "Shoes", price: 1299 },
  { id: 3, name: "Watch", price: 999 },
  { id: 4, name: "Bag", price: 699 }
];

// Home
app.get("/", (req, res) => {
  res.send("Anon Shopping Backend is Running!");
});

// Get all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// Get one product
app.get("/api/products/:id", (req, res) => {
  const product = products.find(
    p => p.id === Number(req.params.id)
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
});

// Simple order
app.post("/api/orders", (req, res) => {
  const { name, address, items } = req.body;

  if (!name || !address || !items) {
    return res.status(400).json({
      message: "Name, address and items are required"
    });
  }

  res.status(201).json({
    message: "Order received successfully",
    order: { name, address, items }
  });
});

// Start server
app.listen(5000, () => {
  console.log("Anon Shopping Backend running on port 5000");
});