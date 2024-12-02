import Place from "../models/placeModel.js";

export const getPlace = async (req, res) => {
  try {
    const places = await Place.find();
    return res.status(200).json({ message: "get place", data: places });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

export const getPlaceById = async (req, res) => {
  const placeId = req.params.id;

  try {
    const places = await Place.findById(placeId);
    if (!places) {
      return res.status(404).json({ message: "place not found" });
    }
    return res.status(200).json({ message: "get place by id", data: places });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};

export const createPlace = async (req, res) => {
  const { name, description, googleMapsLink } = req.body;
  const images = req.file ? req.file.filename : null;

  try {
    const places = new Place({ name, description, googleMapsLink, images });
    const savePlace = await places.save();
    return res.status(201).json({ message: "create place", data: savePlace });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
