const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

exports.upload = (req, res, next) => {
    if (!req.body.imageLink && !req.file) {
        console.log("neither file nor imageLink is here");
    } else if (req.body.imageLink) {
        // console.log("req", req);

        console.log("req.body.link", req.body.imageLink);
        next();
    } else {
        const { filename, mimetype, size, path } = req.file;

        s3.putObject({
            Bucket: "touch-of-spice", ///name of the bucket
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
            .promise()

            .then(() => {
                console.log("promise worked");
                next();
            })

            .catch((err) => {
                console.log("err", err);
                res.sendStatus(500);
            });
    }
};
