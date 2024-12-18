import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" || 
    file.mimetype === "image/png" || 
    file.mimetype === "image/jpg"  // Corrected this line
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);  // Optional: provide more informative error
  }
};

export const upload = multer({ storage, fileFilter });