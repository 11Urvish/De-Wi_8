import multer from 'multer';
import path from 'path'

// const maxSize = 2 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  }
});

const fileFilter = function(req, file, cb){
  if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
      cb(null, true);
  }else{
      cb(null, false);
  }
}

const uploadFile = multer({
  storage: storage,
  fileFilter: fileFilter
  // limits: { fileSize: 54938 },
});
module.exports = (uploadFile);


