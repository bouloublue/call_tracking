const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadPath = path.join(__dirname, "..", "uploads");

// Create the folder if it doesn't exist
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// General upload (for images or unrestricted)
const upload = multer({ storage });

// CSV-only upload
const csvUpload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const isCsv = file.mimetype === "text/csv" || path.extname(file.originalname).toLowerCase() === ".csv";
    if (isCsv) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV files are allowed"));
    }
  },
});

module.exports = {
  upload,
  csvUpload,
};
