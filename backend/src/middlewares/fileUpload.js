const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname + "/../../public/upload"),
  filename: (req, file, callback) => {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  const types = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

  if (types.indexOf(file.mimetype) >= 0) callback(null, true);
  else callback(new Error("Only image is allowed"));
};

module.exports = multer({ storage, fileFilter });
