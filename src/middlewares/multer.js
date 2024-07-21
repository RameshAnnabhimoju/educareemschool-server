import multer from "multer";
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "src/assets/images");
  },
  filename: (request, file, callback) => {
    callback(
      null,
      new Date().toISOString().replace(/:/g, "-") + file.originalname
    );
  },
});
export const upload = multer({ storage: storage });
