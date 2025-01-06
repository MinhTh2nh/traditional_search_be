const express = require("express");
const cors = require("cors");
const cartRoute = require("./src/routes/cart");
const productRoute = require("./src/routes//product");
const productDetailRoute = require("./src/routes//productdetail");
const app = express();

const port = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", cartRoute);
app.use("/api", productRoute);
app.use("/api", productDetailRoute);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
