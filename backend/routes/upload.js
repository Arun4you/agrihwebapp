if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}

const {
  Aborter,
  BlobURL,
  BlockBlobURL,
  ContainerURL,
  ServiceURL,
  StorageURL,
  SharedKeyCredential,
  uploadStreamToBlockBlob
} = require("@azure/storage-blob");

const express = require("express");
const router = express.Router();
const multer = require("multer");

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).array("image");

const getStream = require("into-stream");
const containerName = "images";
const ONE_MEGABYTE = 1024 * 1024;
const uploadOptions = { bufferSize: 4 * ONE_MEGABYTE, maxBuffers: 20 };
const ONE_MINUTE = 60 * 1000;

const sharedKeyCredential = new SharedKeyCredential(
  process.env.AZURE_STORAGE_ACCOUNT_NAME,
  process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY
);
const pipeline = StorageURL.newPipeline(sharedKeyCredential);
const serviceURL = new ServiceURL(
  `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  pipeline
);

const getBlobName = originalName => {
  // Use a random number to generate a unique file name,
  // removing "0." from the start of the string.
  const identifier = Math.random()
    .toString()
    .replace(/0\./, "");
  return `${identifier}-${originalName}`;
};

router.post("/upload", uploadStrategy, async (req, res) => {
  try {
    console.log("upload called");
    // console.log("req:", req);
    // console.log("req body:", req.body);
    console.log("req route files:", req.files);
    const aborter = Aborter.timeout(30 * ONE_MINUTE);
    const blobName = getBlobName(req.files[0].originalname);
    const stream = getStream(req.files[0].buffer);

    const containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);
    console.log("blockBlobURL ", blockBlobURL.url);
    const uploadResp = await uploadStreamToBlockBlob(
      aborter,
      stream,
      blockBlobURL,
      uploadOptions.bufferSize,
      uploadOptions.maxBuffers,
      { blobHTTPHeaders: { blobContentType: "image/jpeg" } }
    );
    console.log("uploadResp ", uploadResp);
    // res.render("success", { message: "File uploaded to Azure Blob storage." });
  } catch (err) {
    console.log("Error: ", err.message);
    res.status(200).json({ message: err.message });
  }
});

module.exports = router;
