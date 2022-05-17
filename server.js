const express = require("express");
const app = express();
const dotEnv = require("dotenv");
const cors = require("cors");
const dbConnection = require("./database/connection");
// Start watching the dotenv files
dotEnv.config();

// Database connection
dbConnection();
// Use app level middleware
app.use(cors());

// Default middleware
app.use(express.json());

// Register Router Middleware
app.use("/api/v1/admin", require("./routes/adminAuthRouter"));
app.use("/api/v1/parent-category", require("./routes/parentCategoryRouter"));
app.use("/api/v1/category", require("./routes/categoryRouter"));
app.use("/api/v1/product", require("./routes/productRouter"));
app.use("/api/v1/adon-product", require("./routes/adonProductRouter"));
app.use("/api/v1/coupon", require("./routes/couponRouter"));
app.use("/api/v1/setting", require("./routes/settingRouter"));
app.use("/api/v1/shipping-method", require("./routes/shippingMothodRouter"));
app.use("/api/v1/customer", require("./routes/customerRouter"));
app.use("/api/v1/deals", require("./routes/dealsRouter"));
app.use("/api/v1/flavour", require("./routes/flavourRouter"));
app.use("/api/v1/color", require("./routes/colorRouter"));
app.use("/api/v1/pincode", require("./routes/pincodeRouter"));
app.use("/api/v1/review", require("./routes/reviewRouter"));
app.use("/api/v1/shape", require("./routes/shapeRouter"));
app.use("/api/v1/order", require("./routes/orderRouter"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

// error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({
    status: 500,
    message: err.message,
    body: {},
  });
});
