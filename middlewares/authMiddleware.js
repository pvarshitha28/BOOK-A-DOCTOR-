const JWT = require("jsonwebtoken");
const userModel = require("../models/userModels");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({
          message: "Auth Fialed",
          success: false,
        });
      } else {
        req.body.userId = decode.id;
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};

// must run after authMiddleware, since it relies on req.body.userId
const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).send({
        message: "Admin access only",
        success: false,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in admin authorization",
      success: false,
    });
  }
};

// must run after authMiddleware, since it relies on req.body.userId
const isDoctor = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.body.userId);
    if (!user || !user.isDoctor) {
      return res.status(403).send({
        message: "Doctor access only",
        success: false,
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in doctor authorization",
      success: false,
    });
  }
};

module.exports = { authMiddleware, isAdmin, isDoctor };
