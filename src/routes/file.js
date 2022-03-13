// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const Grid = require("gridfs-stream");

// let gfs;

// const conn = mongoose.connection;

// conn.once('open', function () {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('photos');
// });

// router.use('/file', upload)

// router.get('/file/:filename', async (req, res) => {
//   console.log(gfs);
//   const file = await gfs.files.findOne({ filename: req.params.filename });
//   console.log("File", file);
//   // // console.log(gfs.createReadStream);
//   // try {
//   //   const file = await gfs.files.findOne({ filename: req.params.filename });
//   //   console.log(gfs.createReadStream);
//   //   const readStream = gfs.createReadStream(file.filename);
//   //   // console.log(readStream);
//   //   readStream.pipe(res);
//   //   // gfs.openDownloadStreamByName(file).pipe(res);
//   // } catch (err) {
//   //   res.send('not found');
//   // }
// });

// module.exports = router;
