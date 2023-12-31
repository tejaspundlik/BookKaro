import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log(req.body.email, req.body.password, req.body.phone)
    const newUser = new User({
      email: req.body.email,
      phone: req.body.phone,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    console.log(req.body)
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const email = req.body.email
    const phone = req.body.phone
    const newPassword = req.body.password
    console.log("Reached before email search")
    const emailSearch = await User.findOne({ email });
    console.log("Reached after email search")
    if (!emailSearch) {
      return next(createError(404, "User not found!"));
    }
    console.log("Reached before email phone search")
    const emailPhone = await User.findOne({ email, phone });
    console.log("Reached after email phone search")
    if (!emailPhone) {
      return next(createError(404, "Email and Phone Don't Match!"));
    }

    console.log("generate password")
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);
    const user = await User.findOne({ email, phone });
    user.password = hash;
    console.log("generate password saving")
    await user.save();
    console.log("after saving")
    res.status(200).send("Password has been reset.");

  } catch (err) {
    next(err);
  }
};