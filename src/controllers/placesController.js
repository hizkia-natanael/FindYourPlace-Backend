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

export const updatePlace = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      googleMapsLink: req.body.googleMapsLink,
    };

    // Jika ada file gambar baru
    if (req.file) {
      updateData.images = [req.file.filename];
    }

    const updatedPlace = await Place.findByIdAndUpdate(
      id,
      { 
        ...updateData,
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!updatedPlace) {
      return res.status(404).json({ message: "Tempat tidak ditemukan" });
    }

    res.json({
      message: "Tempat berhasil diupdate",
      data: updatedPlace,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
