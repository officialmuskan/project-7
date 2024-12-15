const UserModel = require("../model/UserModel");
const bcrypt = require("bcryptjs");
const controllerError = require("../utils/controllerError");
const jwt = require("jsonwebtoken");
// const { SECRET_KEY } = require("../config/keys");
const JWT_SECRET = "hello"
module.exports.register__controller = async (req, res, next) => {
  try {
    const { userName, email, password, confirmPassword } = req.body;

    const userInfo = await UserModel.findOne({ email });

    if (userInfo) {
      return res.status(401).json({
        errors: { user: "User already exists" },
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      userName,
      email,
      password: hash,
    });
    const id = user._id
    const token = jwt.sign({
      id,    
  },JWT_SECRET)
  res.json({
    message:"User Created Successfully",
        token:token
  })
    
  } catch (error) {
    controllerError(error, res, "Error occurred");
  }
};

//TODO: Login Controller

module.exports.login__controller = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userInfo = await (await UserModel.findOne({ email }));

    if (!userInfo) {
      return res.status(401).json({
        errors: { userExist: "User not exist Please register and then login again" },
      });
    }

    // console.log(userInfo)
    bcrypt
      .compare(password, userInfo.password)
      .then((result) => {
        if (!result) {
          return res.status(401).json({
            errors: { password: "password not matched" },
          });
        }

        userInfo.password=undefined
        
        const token = jwt.sign({ _id: userInfo._id,name: userInfo.userName,email: userInfo.email,role: userInfo.role }, JWT_SECRET);
        return res.status(200).json({
          userInfo,
          token,
        });
      })
      .catch((err) => {
        controllerError(err, res, "Error occurred");
      });
  } catch (error) {
    controllerError(error, res, "Error occurred");
  }
};
