const express = require('express'),
  router = express.Router();

const VideoDetails = require('../database/VideoUploadSchema');

router.get('/',
  require('connect-ensure-login').ensureLoggedIn(),
  (req, res) => {
    VideoDetails
      .find()
      .exec()
      .then(docs => {
        res.status(200).json(docs);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  }
);

router.delete('/:videoId', (req, res) => {
  const id = req.params.videoId;
  VideoDetails
    .deleteOne({_id: id})
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Video deleted'
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
