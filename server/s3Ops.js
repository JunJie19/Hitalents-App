// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const AWS = require('aws-sdk');
// const path = require('path');

// const s3Config = require('./s3Config');
// const __env__ = process.env.NODE_ENV;
// const s3Client = new AWS.S3(s3Config.s3Client[__env__]);
// const bucket = s3Config.bucket[__env__];

// // multipart/form-data , which is primarily used for uploading files
// const singleUpload = multer({
//     storage: multerS3({
//         s3: s3Client,
//         bucket: bucket,
//         key: function (req, file, cb) {
//             cb(null, Date.now().toString() + path.extname(file.originalname))
//         }
//     }),
//     fileFilter: function (req, file, cb) {
//         checkFileType(file, cb);
//     }
// }).single("file");

// function checkFileType(file, cb) {
//     const filetypes = /doc|docx|pdf|jpeg|jpg|png/;
//     // Check ext
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // Check mime
//     const mimetype = filetypes.test(file.mimetype);

//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb(new Error('File type not allowed!'), false);
//     }
// }

// function uploadFile(req, res) {
//     singleUpload(req, res, (err) => {
//         if (err) {
//             res.status(500).json({
//                 success: false,
//                 msg: err
//             });
//         } else {
//             if (req.file === undefined) {
//                 res.status(500).json({
//                     success: false,
//                     msg: 'No File Selected'
//                 });
//             }
//             res.status(200).json({
//                 success: true,
//                 data: {
//                     fileName: req.file.key
//                 }
//             });
//         }
//     })
// }

// function downloadFile(req, res) {
//     const params = {
//         Bucket: bucket,
//         Key: req.params.filename
//     }

//     res.setHeader('Content-Disposition', 'attachment');

//     s3Client.getObject(params)
//         .createReadStream()
//         .on('error', function (err) {
//             res.status(500).json({
//                 success: false,
//                 msg: err.message
//             });
//         }).pipe(res);
// }

// module.exports = {
//     uploadFile,
//     downloadFile
// };