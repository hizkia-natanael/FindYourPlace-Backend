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
  const { name, description, googleMapsLink, address } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const places = new Place({
      name,
      description,
      googleMapsLink,
      image,
      address,
    });
    const savePlace = await places.save();
    return res.status(201).json({ message: "create place", data: savePlace });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const updatePlace = async (req, res) => {
  const placeId = req.params.id;
  const { name, description, googleMapsLink, address } = req.body;
  const newImage = req.file ? req.file.filename : null;

  try {
    const place = await Place.findById(placeId);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    if (newImage) {
      uploadRemover(place.image);
    }

    place.name = name;
    place.address = address;
    place.description = description;
    place.googleMapsLink = googleMapsLink;
    place.image = newImage ? newImage : place.image;

    const updatedPlace = await place.save();
    return res
      .status(200)
      .json({ message: "Update place", data: updatedPlace });
  } catch (error) {
    return res.status(500).json({ message: "Error updating place" });
  }
};

export const deletePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPlace = await Place.findByIdAndDelete(id);

    if (!deletedPlace) {
      return res.status(404).json({ message: "Tempat tidak ditemukan" });
    }

    res.json({
      message: "Tempat berhasil dihapus",
      data: deletedPlace,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};