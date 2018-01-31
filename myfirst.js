var http = require('http');
//var url = require('url'); URL MODULE
//var dt = require('./myfirstmodule'); MY OWN MODULE
var fs = require('fs'); //FILE SYSTEM Module
var formidable = require('formidable'); //Formidable module dl:ed via npm.
var filename = "";
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'alexnodejsfun@gmail.com',
    pass: 'alex123123'
  }
});

var mailOptions = {
  from: 'alexnodejsfun@gmail.com',
  to: 'benjaminjekarlsson@gmail.com',
  subject: 'Lol Pwnd by NodeJS!',
  text: '/Din vän Alexander'
};

http.createServer(function (req, res) {

  switch(req.url) {
    case '/fileupload':
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = '/Users/alexander.sundin/Documents/nodelearning/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function(err) {
          if (err) throw err;
          filename = newpath;
        })
      });
      break;

    case '/fileremove':
    if(filename !== "") {
      fs.unlink(filename, function (err) {
        if (err) throw err;
        filename = "";
      });
    }
      break;

    case '/sendmail':
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email send: ' + info.response);
        }
      });
      break;

    default:
      fs.readFile('demofile1.html', function(err, data){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
};

}).listen(8080);