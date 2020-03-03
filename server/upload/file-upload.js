const multer = require('multer'),
    fs = require('fs');

module.exports.uploadResponse = (req, res) => {
  // To create unique folder name for unique user
  const dirName = req.user.username + '_' + req.user.email;
  const cle = function(err) { if (err) console.log(err); }

  if (!fs.existsSync('./server/media/uploads/' + dirName)) {
    fs.mkdirSync('./server/media/uploads/' + dirName, cle);
    fs.writeFileSync('./server/media/uploads/' + dirName + '/file_count.txt', '0', 'utf8', cle);
  }

  const currentFileCnt = parseInt(fs.readFileSync('./server/media/uploads/' + dirName + '/file_count.txt', 'utf8', cle)) + 1;

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'server/media/uploads/' + dirName);
    },
    filename: function (req, file, cb) {
      cb(null, currentFileCnt + ' ' + file.originalname );
    }
  });
  fs.writeFileSync('./server/media/uploads/' + dirName + '/file_count.txt', currentFileCnt, 'utf8', cle);
  const upload = multer({ storage: storage }).array('file');
  
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  })
};
