const mongoose = require("mongoose");
const slugify = require("slugify");
// const User = require('./userModel');
// const validator = require('validator');

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A subject must have a name"],
      unique: true,
      trim: true,
      maxlength: [
        12,
        "A subject name must have less or equal then 40 characters",
      ],
      minlength: [
        6,
        "A subject name must have more or equal then 10 characters",
      ],
      // validate: [validator.isAlpha, 'subject name must only contain characters']
    },
    slug: String,

    maxGroupSize: {
      type: Number,
      required: [true, "A subject must have a group size"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    Class: [
      {
        type: mongoose.Schema.ObjectId,
        required: [true, "A subject must have a class"],
        ref: "Class",
      },
    ],
    Teacher: [
      {
        type: mongoose.Schema.ObjectId,
        required: [true, "A subject must have a class"],

        ref: "User",
      },
    ],
    students: [
      {
        type: mongoose.Schema.ObjectId,
        required: [true, "A subject must have a student"],

        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// subjectSchema.index({ price: 1 });
subjectSchema.index({ slug: 1 });

// Virtual populate

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
subjectSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// subjectSchema.pre('save', async function(next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// subjectSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// subjectSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// subjectSchema.pre('find', function(next) {

subjectSchema.pre(/^find/, function (next) {
  this.populate({
    path: "Class",
    select: "name",
  });

  next();
});
subjectSchema.pre(/^find/, function (next) {
  this.populate({
    path: "Teacher",
    select: "name",
  });

  next();
});
subjectSchema.pre(/^find/, function (next) {
  this.populate({
    path: "students",
    select: "name",
  });

  next();
});

subjectSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
// subjectSchema.pre('aggregate', function(next) {
//   this.pipeline().unshift({ $match: { secretSubject: { $ne: true } } });

//   console.log(this.pipeline());
//   next();
// });

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
