const AWS = require('aws-sdk'),
    fs = require('fs'),
    config = require('../configs/config.js'),
    GeneralException = require('../exceptions/errorMiddleware');
const { resolve } = require('path');

exports.cargarImagen = async (filePath, fileName) => {
    const fileContent = fs.readFileSync(filePath);
    const ID = config.AWSAccessKeyId;
    const SECRET = config.AWSSecretKey;
    const bucketName = config.bucketName;

    const s3 = new AWS.S3({
        accessKeyId: ID,
        secretAccessKey: SECRET
    });

    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: fileContent
    };

    data = await new Promise((resolve, reject) => {
        s3.upload(params, (err, data) =>
            err == null ? resolve(data) : reject(err)
        );
    });
    return data.Location;
};
