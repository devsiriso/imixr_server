const api = require('./api');
const express = require('express');
const cors = require('cors')
const path = require('path');
const app = express();
const router = express.Router();

const viewPath = __dirname + '/views/';
const port = 8080;

router.use(function (req,res,next) {
  console.log('/' + req.method);
  next();
});

router.get('/', (req,res) => {
  res.sendFile(viewPath + 'index.html');
});

router.get('/script.js', (req,res) => {
  res.sendFile(viewPath + 'script.js');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/', router);
app.use(express.static(__dirname));

// app.get('/objects', api.getAllObjects);
// app.post('/objects', api.createObject);
// app.delete('/objects', api.deleteAllObjects);

app.get('/videos', api.getAllVideos);
app.get('/images', api.getAllImages);
app.get('/documents', api.getAllDocuments);

app.get(/(.*\.pdf)\/([0-9]+).png$/i, function (req, res) {
  fs = require('fs');
  let pdfPath = req.params[0].substring(1);

  let PDFImage = require("pdf-image").PDFImage;
  let pdfImage = new PDFImage(pdfPath, { 
    graphicsMagick: true, 
    combinedImage: true, 
    quality: 100 });
  pdfImage.convertFile().then((imagePaths) => {
    res.send("/" + imagePaths);
  }, (err) => {
    res.send(err, 500)
  });
});

app.listen(port, function () {
  console.log('Server started.')
})


