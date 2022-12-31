const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const User = require("../models/userModel");

// CREATE PRODUCT
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);

    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// UPDATE PRODUCT
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const updateProduct = await Product.findOneAndUpdate({ id }, req.body, {
      new: true,
    });

    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// DELETE PRODUCT
const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params;
  // validateMongoDbId(id);
  try {
    const deleteProduct = await Product.findOneAndDelete(id);
    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// GET SINGLE PRODUCT
const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id);

    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// GET ALL PRODUCTS
const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // FILTERING
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    // console.log(queryObj);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));
    let query = Product.find(JSON.parse(queryStr));
    // const getAllProducts = await Product.find(queryObj);

    // SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // LIMIT FIELDS
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // PAGINATION

    const page = req.query.page; // 2
    const limit = req.query.limit; // 3
    const skip = (page - 1) * limit; // (2-1)*3 = 1 * 3 = 3
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("Page does not exist");
    } else {
    }
    console.log(page, limit, skip);
    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

// ADD TO WISHLIST
const addToWishlist = asyncHandler(async (req, res) => {
  // user id
  const { _id } = req.user;
  // product id
  const { prodId } = req.body;

  try {
    // get user
    const user = await User.findById(_id);

    // now check if product is already added or not
    // "wishlist" from user model
    const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        { new: true }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        { new: true }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

// START RATINGS
const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId } = req.body;

  try {
    // first get the product
    const product = await Product.findById(prodId);

    // check if product is already rated by user
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );

    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star },
        },
        {
          new: true,
        }
      );
      res.json(updateRating);
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              postedby: _id,
            },
          },
        },
        { new: true }
      );

      res.json(rateProduct);
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
};
