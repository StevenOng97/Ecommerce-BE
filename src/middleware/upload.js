const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');

const path = require('path');

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== '.jpg' &&
      ext !== '.jpeg' &&
      ext !== '.png' &&
      ext !== '.webp'
    ) {
      cb(new Error('File type is not supported'), false);
      return;
    }
    cb(null, true);
  },
});

// const storage = new GridFsStorage({
//   url: process.env.MONGODB_URL,
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     const match = ['image.png', 'image/jpeg', 'image.jpg', 'image/webp'];

//     if (match.indexOf(file.mimetype) === -1) {
//       const filename = `${Date.now()}-${file.originalname}`;
//       return filename;
//     }

//     return {
//       bucketName: 'photos',
//       filename: `${Date.now()}-${file.originalname}`,
//     };
//   },
// });

// module.exports = multer({ storage });
