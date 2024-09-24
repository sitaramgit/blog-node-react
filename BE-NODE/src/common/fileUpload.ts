import multer from 'multer';
import path from 'path';

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Get the file extension
        cb(null, `${Date.now()}-${file.fieldname}${ext}`); // Preserve the extension
    }
});

// File filter to accept only images
const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // Accept file
    } else {
        cb(new Error('Invalid file type, only images are allowed!'), false); // Reject file
    }
};

// Create the Multer upload middleware
const fileUpload = multer({ storage: storage, fileFilter: fileFilter });

export default fileUpload;
