const express = require('express'),
  router = express.Router(),
  multer = require('multer'),
  fs = require('fs');

const thumbnailGenerator = require('../helpers/videoThumbnail')
  port = require('../config/default').server.port;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/media/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(/ /g, '_'));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50
  }
});

router.post('/',
  require('connect-ensure-login').ensureLoggedIn(),
  upload.single('file'),
  (req, res, next) => {
    thumbnailGenerator.generateThumbnail(
      'http://127.0.0.1:' + port + '/courses/' + req.file.filename.replace(/ /g, '_'), 
      req.file.filename.replace(/ /g, '_'),
      req.user.username);
    res.status(200).json({
      message: 'Video upload successful'
    });
  }
);

module.exports = router;
