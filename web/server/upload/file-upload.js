const multer = require('multer'),
    fs = require('fs');


// const express = require('express'),
//   router = express.Router(),
//   User = require('../database/Schema').User;

// const mongoose = require('mongoose'),
//   express = require('express'),
//   router = express.Router();
// mongoose.connect('mongodb://127.0.0.1/nodeStream' , { useNewUrlParser: true }, error => {
//   if (!error) {
//     console.log('connected successfully');
//   }
// });
// const User = require('../database/Schema').User;
// router.get('/', (req, res) => {
//   User.find((err, user) => {
//     if (!err) {
//       console.log(user);
//     }
//   });
// });

/* To create directory:
// for more details: https://www.youtube.com/watch?v=Ejgd-la6nSY
const dirName = 'Chirayu';
try {
  fs.mkdirSync(dirName);
} catch(err) {
  if (err.code == 'EEXIST') {
    console.log('file already exist');
  } else {
    console.log('inside else: ' + err);
  }
}
*/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/media/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
});

const upload = multer({ storage: storage }).array('file');

module.exports.uploadResponse = (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  })
};
