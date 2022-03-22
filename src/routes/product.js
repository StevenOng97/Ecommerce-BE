const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const { cloudinary } = require('../../cloudinary');

router.get('/products', async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.categories;

  try {
    const { page = 1, limit = 10 } = req.query;
    let products;

    if (qNew) {
      products = await Product.find()
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      })
        .limit(limit * 1)
        .skip((page - 1) * limit);
    } else {
      products = await Product.find()
        .limit(limit * 1)
        .skip((page - 1) * limit);
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/products', auth, upload.array('file', 3), async (req, res) => {
  if (req.files.length < 3) return res.send('Please select a file.');

  const promises = req.files.map(async (file) => {
    return await cloudinary.v2.uploader.upload(
      file.path,
      { folder: 'ecommerce' },
      function (error, result) {
        if (error) {
          return res.status(500).send("Getting Error while uploading Images");
        }
        return result;
      }
    );
  });

  const uploadedFiles = await Promise.all(promises);
  const mappedFiles = uploadedFiles.map((file) => file.secure_url);

  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    isNew: req.body.isNew || true,
    images: mappedFiles,
    categories: req.body.categories,
    desc: req.body.desc,
    sale: req.body?.sale,
    priceAfterSale: req.body?.priceAfterSale,
  });

  try {
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    throw new Error('Error', err);
  }
});

router.put('/products/:id', auth, upload.array('file', 3), async (req, res) => {
  if (req.files.length < 3) return res.send('Please select a file.');
  const imgUrls = [];
  req.files.map(({ filename }) => {
    imgUrls.push(filename);
  });

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    isNew: true,
    images: imgUrls,
    category: req.body.category,
  });

  try {
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    throw new Error('Error', err);
  }
});

router.delete('/products/:id', auth, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json('Product has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
