const {
  getStudent__controller,
  getTeacher__controller,
  deleteTeacher__controller
} = require("../controllers/userController");
const { adminAuthentication } = require("../middlewares/authentication");
const { requireLogin } = require("../middlewares/requireLogin");

const router = require("express").Router();

router.get(
  "/student",
 
  getStudent__controller
);

router.get(
  "/teacher",
  
  getTeacher__controller
);

router.get(
  "/delete-teacher",
 
  deleteTeacher__controller
);

module.exports = router;
