const mongoose = require("mongoose");
const slugify = require("slugify");
const User = require("./userModel");
// const validator = require('validator');

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Class must have a name"],
      unique: true,
      trim: true,
      maxlength: [
        12,
        "A Class name must have less or equal then 40 characters",
      ],
      minlength: [6, "A Class name must have more or equal then 10 characters"],
      // validate: [validator.isAlpha, 'Class name must only contain characters']
    },
    slug: String,

    maxGroupSize: {
      type: Number,
      required: [true, "A Class must have a group size"],
    },

    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
    },
    photo: String,
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretClass: {
      type: Boolean,
      default: false,
    },

    Teacher: [
      {
        type: mongoose.Schema.ObjectId,
        required: [true, "class must belong a teacher"],

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

// classSchema.index({ price: 1 });
classSchema.index({ slug: 1 });

// Virtual populate

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
classSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// classSchema.pre('save', async function(next) {
//   const guidesPromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// classSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// classSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// classSchema.pre('find', function(next) {
classSchema.pre(/^find/, function (next) {
  this.find({ secretClass: { $ne: true } });

  this.start = Date.now();
  next();
});

classSchema.pre(/^find/, function (next) {
  this.populate({
    path: "Teachers",
    select: "name photo",
  });

  next();
});
classSchema.pre(/^find/, function (next) {
  this.populate({
    path: "students",
    select: "name photo",
  });

  next();
});

classSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
// classSchema.pre('aggregate', function(next) {
//   this.pipeline().unshift({ $match: { secretClass: { $ne: true } } });

//   console.log(this.pipeline());
//   next();
// });

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
