const Class = require("./../model/classmodel");
const factory = require("./handlerFactory");

exports.aliasTopClasss = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,";
  req.query.fields = "name,ratingsAverage,summary";
  next();
};

exports.getAllClasses = factory.getAll(Class);
exports.getClass = factory.getOne(Class, { path: "reviews" });
exports.createClass = factory.createOne(Class);
exports.updateClass = factory.updateOne(Class);
exports.deleteClass = factory.deleteOne(Class);
