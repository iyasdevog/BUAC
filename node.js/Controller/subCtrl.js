const Subject = require("./../model/subjectModel");
const factory = require("./handlerFactory");

exports.aliasTopSubjects = (req, res, next) => {
  req.query.limit = "5";
  req.query.fields = "name,summary";
  next();
};

exports.getAllSubjects = factory.getAll(Subject);
exports.getSubject = factory.getOne(Subject);
exports.createSubject = factory.createOne(Subject);
exports.updateSubject = factory.updateOne(Subject);
exports.deleteSubject = factory.deleteOne(Subject);
