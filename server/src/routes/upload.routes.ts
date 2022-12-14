import express, { Request } from 'express';
const multer = require('multer');
const router = express.Router();

const fileFilter = (
  req: Request,
  file: any,
  cb: (err: Error | null, isAccepted: boolean) => void
) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('File Format is not an jpg/jpeg/png'), false);
  }
};

const storage = multer.memoryStorage();

// multer middleware
const upload = multer({
  storage,
  fileFilter,
});

router.put('/upload-image', upload.single('imgfile'), uploadImageHandler);

export default router;
