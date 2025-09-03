const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const User = require("../Modal/User");
const bcrypt = require("bcrypt");
const jwtToken = require("jsonwebtoken");
const Order = require("../Modal/Order");
const CheckOut = require("../Modal/CheckOut");
const Wishlist = require("../Modal/Wishlist");
const SecreateKey = "Om_kale";

router.post(
  "/signup",
  [
    body("email", "Enter Valid Email")
      .isEmail()
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error("Email already registered");
        }
        return true;
      }),
    body("name", "Name Must Be Atlist 4 Character").isLength({ min: 4 }),
    body("password", "password Must Be Atlist 5 Character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const Hash = await bcrypt.hash(req.body.password, salt);
    try {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: Hash,
        location: req.body.location,
        date: Date.now(),
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error Found", error.message);
      res.status(500).json({ success: false });
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let userData = await User.findOne({ email });

      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct creadential" });
      }
      const pwdcompare = await bcrypt.compare(password, userData.password);
      if (!pwdcompare) {
        return res
          .status(400)
          .json({ errors: "Try logging in with correct creadential" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const AuthToken = jwtToken.sign(data, SecreateKey, { expiresIn: "2h" });
      // console.log("AuthToken:-", AuthToken);
      return res.json({ success: true, AuthToken: AuthToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post("/displayData", async (req, res) => {
  try {
    res.send([global.shoes_items, global.shoes_catItems]);
    // console.log(global.shoes_items, global.shoes_catItems);
  } catch (error) {
    console.error(error.message);
    console.log("server err to send globle variables", error);
  }
});

router.post("/orders", async (req, res) => {
  let data = req.body.order_data;
  console.log("email: req.body.email:", req.body.email);
  await data.splice(0, 0, { order_date: req.body.order_date });

  try {
    eId = await Order.findOne({ email: req.body.email });
    if (eId === null) {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } else {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    }
  } catch (error) {
    console.error("Server Error", error);
    console.log("Server Error", error.message);
  }
});

router.post("/display_orders", async (req, res) => {
  try {
    let myOrders = await Order.findOne({ email: req.body.email });
    // console.log(myOrders);
    res.json({ myOrderdata: myOrders });
  } catch (error) {
    console.error("Server Error", error);
    console.log("Server Error", error.message);
  }
});

router.post("/checkout", async (req, res) => {
  try {
    await CheckOut.create({
      email: req.body.email,
      customer_name: req.body.customer_name,
      customer_address: req.body.customer_address,
      customer_city: req.body.customer_city,
      mobile: req.body.mobile,
      pincode: req.body.pincode,
      payment_method: req.body.payment_method,
      No_of_orders: req.body.No_of_orders,
      total_price: req.body.total_price,
      date: req.body.date,
      order_data: req.body.order_data,
    }).then(() => {
      res.json({ success: true });
    });
  } catch (error) {
    console.log("Server Error", error);
    console.error(error.message);
  }
});

router.post("/wishlist", async (req, res) => {
  try {
    const userId = await Wishlist.findOne({
      id: req.body.id,
      user: req.body.user,
    });
    // console.log("userId",userId)
    // console.log("{ id: req.body.id }",{ id: req.body.id })
    if (!userId) {
      await Wishlist.create({
        user: req.body.user,
        id: req.body.id,
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
        qty: req.body.qty,
        size: req.body.size,
        price: req.body.price,
        date: req.body.date,
      }).then(() => {
        res.json({ success: true });
      });
    } else {
      return res.json({ success: false, msg: "Item already in wishlist" });
    }
  } catch (error) {
    console.log("Server Error", error);
    console.error(error.message);
  }
});

router.get("/wishlist/:email", async (req, res) => {
  const email = req.params.email;
  const data = await Wishlist.find({ user: email });
  // console.log(data);
  res.json(data);
});

router.post("/wishlist_remove/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Wishlist.deleteOne({ _id: id });
    // console.log("deleted ",data)
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
