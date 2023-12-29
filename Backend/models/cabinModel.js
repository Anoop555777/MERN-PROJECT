const mongoose = require("mongoose");
const slugify = require("slugify");
const cabinSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Name is required"],
      trim: true,
    },
    maxCapacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [1, "capacity must be more than one"],
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      min: [0, "rating must be more than 1"],
      max: [5, "rating must not be greater than 5"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Cabin must have a price"],
    },
    priceDiscount: {
      type: Number,
      // validate: function (val){
      //    return val<= this.price*0.5;
      // }
      //i have validate in front end
    },
    description: {
      type: String,
      trim: true,
    },
    images: [String],
    imageCover: {
      type: String,
      required: [true, "cabin must have image cover"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    slug: String,
    imageCover: String,
    discountPercentage: Number,
    secretCabin: {
      type: Boolean,
      default: false,
      select: false,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

cabinSchema.index({ slug: 1 });

// cabinSchema.virtual("discountPercentage").get(function () {
//   return Math.floor((this.priceDiscount * 100) / this.price);
// });

cabinSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "cabin",
  localField: "_id",
});

cabinSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });

  this.discountPercentage = Math.floor((this.priceDiscount * 100) / this.price);
  next();
});

cabinSchema.pre(/^find/, function (next) {
  this.find({ secretCabin: { $ne: true } });

  next();
});

const Cabin = mongoose.model("Cabin", cabinSchema);
module.exports = Cabin;
