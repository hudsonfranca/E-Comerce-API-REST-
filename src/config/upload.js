const multer = require("multer");
const path = require("path");

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      cb(null, `${name}-${Date.now()}${ext}`);
    }
  }),
  fileFilter: (req, file, cb) => {
    const isAccepted = ["image/png", "image/jpg", "image/jpeg"].find(
      acceptedFormat => acceptedFormat === file.mimetype
    );

    if (isAccepted) {
      return cb(null, true);
    } else {
      return cb(null, false);
    }
  }
};
