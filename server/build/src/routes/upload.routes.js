"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer = require('multer');
const router = express_1.default.Router();
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(new Error('File Format is not an jpg/jpeg/png'), false);
    }
};
const storage = multer.memoryStorage();
// multer middleware
const upload = multer({
    storage,
    fileFilter,
});
router.put('/upload-image', upload.single('csvfile'));
exports.default = router;
