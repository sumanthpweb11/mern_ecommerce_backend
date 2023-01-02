const express = require("express");
const bodyParser = require("body-parser");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const prodcategoryRouter = require("./routes/prodcategoryRoute");
const brandRouter = require("./routes/brandRoute");
const couponRouter = require("./routes/couponRoute");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

// DB CONNECTION
dbConnect();

// EXPRESS INBUILT MIDDLEWARES
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use("/", (req, res) => {
//   res.send("hello");
// });

// ROUTES
app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/category", prodcategoryRouter);
app.use("/api/brand", brandRouter);
app.use("/api/coupon", couponRouter);

// Middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
