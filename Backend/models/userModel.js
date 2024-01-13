const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name field is required"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please provide a valid email address"],
    required: [true, "email field is required"],
    lowercase: true,
    trim: true,
  },

  photo: {
    type: String,
    default: "data/img/default-user.jpg",
  },
  password: {
    type: String,
    required: [true, "password field is required"],
    minLength: 8,
    select: false,
  },

  confirmPassword: {
    type: String,
    required: [true, "ConfirmPassword field is required"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      messages: "Password and Confirm Password must be the same",
    },
  },
  passwordChangedAt: Date,
  role: {
    type: String,
    enum: ["user", "admin", "employee"],
    default: "user",
  },
  isAdmin: {
    type: Boolean,
    select: false,
    default: false,
  },
  passwordResetToken: String,
  passwordExpireToken: Date,

  nationalId: {
    type: String,
    required: [true, "National Id is required"],
  },
  nationality: {
    type: String,
    required: [true, "National Id is required"],
    lowercase: true,
    default: "indian",
  },
  countryFlag: {
    type: String,
    default: "https://flagcdn.com/in.svg",
  },
});

userSchema.pre("save", async function (next) {
  //only work when password is modify
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now();
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changeTimeStamp = Number.parseInt(
      this.passwordChangedAt.getTime() / 1000
    );

    return JWTTimeStamp < changeTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordExpireToken = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
