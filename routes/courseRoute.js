const {
  postCourse__controller,
  getCourses__controller,
  getOneCourse__controller,
  deleteCourse__Controller,
} = require("../controllers/courseController");
const { adminAuthentication } = require("../middlewares/authentication");
// const { requireLogin } = require("../middlewares/requireLogin");

const router = require("express").Router();


router.post(
  "/post-course",
  
  postCourse__controller
);

router.get("/get-courses", getCourses__controller);

router.get("/get-course/:courseId", getOneCourse__controller)

router.delete('/delete',adminAuthentication,deleteCourse__Controller)

module.exports = router;
