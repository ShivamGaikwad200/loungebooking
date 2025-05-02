import Lounge from "../models/Lounge.js";

export const createLounge = async (req, res, next) => {
  const newLounge = new Lounge(req.body);

  try {
    const savedLounge = await newLounge.save();
    res.status(201).json(savedLounge);
  } catch (err) {
    next(err);
  }
};

export const updateLounge = async (req, res, next) => {
  try {
    const updatedLounge = await Lounge.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedLounge);
  } catch (err) {
    next(err);
  }
};

export const deleteLounge = async (req, res, next) => {
  try {
    await Lounge.findByIdAndDelete(req.params.id);
    res.status(200).json("Lounge deleted successfully");
  } catch (err) {
    next(err);
  }
};

export const getLounge = async (req, res, next) => {
  try {
    const lounge = await Lounge.findById(req.params.id);
    res.status(200).json(lounge);
  } catch (err) {
    next(err);
  }
};

export const getAllLounges = async (req, res, next) => {
  try {
    const lounges = await Lounge.find();
    res.status(200).json(lounges);
  } catch (err) {
    next(err);
  }
};
