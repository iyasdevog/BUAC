const express = require("express");
const ClassController = require("./../Controller/ClassController");
const authController = require("./../Controller/AuthController");

const router = express.Router();

// router.param('id', ClassController.checkID);

// POST /Class/234fad4/reviews
// GET /Class/234fad4/reviews

// router
//   .route("/top-5-cheap")
//   .get(ClassController.aliasTopClasss, ClassController.getAllClasses);

router
  .route("/")
  .get(ClassController.getAllClasses)
  .post(
    authController.protect,
    authController.restrictTo("admin", "user", "teacher"),
    ClassController.createClass
  );

router
  .route("/:id")
  .get(ClassController.getClass)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "teacher"),
    ClassController.updateClass
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "teacher"),
    ClassController.deleteClass
  );

module.exports = router;
