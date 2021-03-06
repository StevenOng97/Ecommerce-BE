const express = require('express');
const connection = require('./db/mongoose');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const productRouter = require('./src/routes/product');
const userRouter = require('./src/routes/user');
const cartRouter = require('./src/routes/cart');
const orderRouter = require('./src/routes/order');

// const productRouter = require('./routes/product');
// const productRouter = require('./routes/product');

const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
connection();

let gfs, gridfsBucket;

const conn = mongoose.connection;

const main = async () => {
  try {
    await conn.once('open', function () {
      gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos',
      });

      gfs = Grid(conn.db, mongoose.mongo);
      gfs.collection('photos');
    });

    app.use(cors());
    app.use(express.json());

    app.use('/file', productRouter);

    app.get('/file/:filename', async (req, res) => {
      try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
      } catch (err) {
        res.status(404).send('Not Found!');
      }
    });

    app.get('/file', async (req, res) => {
      const files = await gfs.files.find({});
      res.send(files);
    });

    app.use(productRouter);
    app.use(userRouter);
    app.use(cartRouter);
    app.use(orderRouter);

    app.get('/', (req, res) => {
      res.send('Hello');
    });

    app.listen(port, () => {
      console.log('Server is up on port ' + port);
    });
  } catch (err) {}
};

main();

// app.use(cors());
// app.use(express.json());

// app.use('/file', productRouter);

// app.get('/file/:filename', async (req, res) => {
//   try {
//     const file = await gfs.files.findOne({ filename: req.params.filename });
//     const readStream = gridfsBucket.openDownloadStream(file._id);
//     readStream.pipe(res);
//   } catch (err) {
//     res.status(404).send('Not Found!');
//   }
// });

// app.get('/file', async (req, res) => {
//   const files = await gfs.files.find({});
//   res.send(files);
// });

// app.use(productRouter);
// app.use(userRouter);
// app.use(cartRouter);
// app.use(orderRouter);

// app.get('/', (req, res) => {
//   res.send('Hello');
// });

// app.listen(port, () => {
//   console.log('Server is up on port ' + port);
// });
