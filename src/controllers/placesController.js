import Place from "../models/placeModel.js";
import fs from "fs";

// Fungsi untuk menghapus file dari sistem
const uploadRemover = (filename) => {
  if (filename) {
    const path = `./uploads/${filename}`;
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  }
};

// Mendapatkan semua tempat
export const getPlace = async (req, res) => {
  try {
    const places = await Place.find();
    return res.status(200).json({ message: "Get place", data: places });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Mendapatkan tempat berdasarkan ID
export const getPlaceById = async (req, res) => {
  const placeId = req.params.id;

  try {
    const place = await Place.findById(placeId);
    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }
    return res.status(200).json({ message: "Get place by ID", data: place });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Membuat tempat baru
export const createPlace = async (req, res) => {
  const { name, description, googleMapsLink, address } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !description) {
    return res.status(400).json({ message: "Name and description are required" });
  }

  try {
    const place = new Place({
      name,
      description,
      googleMapsLink,
      image,
      address,
    });
    const savePlace = await place.save();
    return res.status(201).json({ message: "Create place", data: savePlace });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Memperbarui tempat berdasarkan ID
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
      uploadRemover(place.image); // Menghapus gambar lama
    }

    place.name = name || place.name;
    place.address = address || place.address;
    place.description = description || place.description;
    place.googleMapsLink = googleMapsLink || place.googleMapsLink;
    place.image = newImage ? newImage : place.image;

    const updatedPlace = await place.save();
    return res.status(200).json({ message: "Update place", data: updatedPlace });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Menghapus tempat berdasarkan ID
export const deletePlace = async (req, res) => {
  const { id } = req.params;

  try {
    const place = await Place.findById(id);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    if (place.image) {
      uploadRemover(place.image); // Hapus gambar jika ada
    }

    const deletedPlace = await place.remove();
    return res.status(200).json({
      message: "Place deleted successfully",
      data: deletedPlace,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
