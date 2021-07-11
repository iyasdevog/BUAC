const express = require("express");
const SubjectController = require("./../Controller/subCtrl");
const authController = require("./../Controller/AuthController");

const router = express.Router();

// router.param('id', SubjectController.checkID);

// POST /Subject/234fad4/reviews
// GET /Subject/234fad4/reviews

// router
//   .route("/top-5-cheap")
//   .get(SubjectController.aliasTopSubjects, SubjectController.getAllSubjects);

router
  .route("/")
  .get(SubjectController.getAllSubjects)
  .post(
    authController.protect,
    authController.restrictTo("admin", "user", "teacher"),
    SubjectController.createSubject
  );

router
  .route("/:id")
  .get(SubjectController.getSubject)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "teacher"),
    SubjectController.updateSubject
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "teacher"),
    SubjectController.deleteSubject
  );

module.exports = router;
