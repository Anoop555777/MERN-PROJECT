const Cabin = require("./../models/cabinModel");
const APIFeatures = require("./../utils/apiFeatures");
exports.createCabin = async function (req, res) {
  try {
    const cabin = await Cabin.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        cabin,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getAllCabins = async function (req, res) {
  try {
    const features = new APIFeatures(Cabin.find(), req.query)
      .filter()
      .sort()
      .field()
      .pagination();

    const cabins = await features.query;
    res.status(200).json({
      status: "success",
      result: cabins.length,
      data: {
        cabins,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getCabin = async function (req, res) {
  try {
    const cabin = await Cabin.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        cabin,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateCabin = async function (req, res) {
  try {
    const cabin = await Cabin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        cabin,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteCabin = async function (req, res, next) {
  try {
    const cabin = await Cabin.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
