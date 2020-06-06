// Full Documentation - https://docs.turbo360.co
const express = require('express');
const router = express.Router();
const crypt = require('crypto');
const bodyParser=require('body-parser')
const app = express()
var fs = require('fs'); // file system, to save files
var request = require('request');
var url = require('url'); // to parse URL and separate filename from path
var progress = require('progress-stream');
const methodOverride =require('method-override')
var multer = require('multer'); // library to uplaod photos https://github.com/expressjs/multer

var Bio = require('./biok.js');
let multipart = require('connect-multiparty');
let multipartMiddleware = multipart();


// storage used with Multer library to define where to save files on server, and how to save filename
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/uploads')
	},
	filename: function (req, file, cb) {
		//console.log(file.mimetype)
		cb(null, file.originalname + '-' + Date.now() + '-' + getExtension(file));
	}
})


function getExtension(file) {
    // this function gets the filename extension by determining mimetype. To be exanded to support others, for example .jpeg or .tiff
    var res = '';
    if (file.mimetype === 'image/jpeg') res = '.jpg';
    if (file.mimetype === 'image/png') res = '.png';
    return res;
}
app.use(bodyParser.json)
app.use(express.static('./')); // serve all files in root folder, such as index.html

// initialize Multer with storage definition and other options like limit to file size that can be uploaded
var upload = multer({
    storage: storage,
    // limits: { fileSize: 1048576, files: 1 } // limit file size to 1048576 bytes or 1 MB
    //,fileFilter: // TODO limit types of files. currently can upload a .txt or any kind of file into uploads folder
}).fields([ // fields to accept multiple types of uploads
    { name: "fileName", maxCount: 1 } // in <input name='fileName' />
]);





router.get('/', (req, res, next) => {
	res.render('home', null)
	
})


router.post('/result', upload, (req, res, ) => {
	var body = req.body
	var data = JSON.stringify(req.body)

	var files = req.files
	
					var bionew = new Bio ({ 
						data: data,
						image: files.fileName[0].filename
					});
	
	console.log(bionew);
						bionew.save( (err) => {
						if (err) { 
						res.type('html').status(500);
						res.send('Error: ' + err); 
						}
							
						else {
							var path = "/uploads/" + files.fileName[0].filename;
							console.log(path)
							const data = req.body
							data.image= path
							res.render('result',data)
						} 
	 });
		
	 });
	
		
	 
router.get('/retrive/:id', async(req, res, next) => {
	var index = req.params.id;
	var datax = await Bio.find();
	console.log(datax[index])
	var parse = datax[index].data
	var another=JSON.parse(parse)
	var matter = another;
	matter.image = datax[index].image;
	// var parse = data[2].data
    //   var another=JSON.parse(parse)
	// console.log(another.Name)
	// res.send(data[2].data.Name)
	console.log(matter)
	res.render('retrive',matter)
})





module.exports = router
