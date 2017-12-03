var express = require('express');
var router = express.Router();
var path = require('path');
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.sendfile(path.resolve(path.join(__dirname, '../views/index.html')));
});

router.post('/send-mail', (req, res) => {

  // Create the transporter with the required configuration for Gmail
  // change the user and pass !
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: 'ahmad.mahmud1997@gmail.com',
      pass: 'mahmudzer0',
    }
  });

  var emails = ['abdul.ahmad@therapyhubapp.com', 'mahma3@unh.newhaven.edu'];

  for (var i = 0; i < emails.length; i++) {
    var email = emails[i];

      // setup e-mail data
    var mailOptions = {
      from: 'Mahmud <ahmad.mahmud1997@gmail.com>', // sender address (who sends)
      to: email, // list of receivers (who receives)
      subject: "Signal found", // Subject line
      text: '',
      html: '',
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
        var responseData = { message: 'fail' };
        if (error.rejected && error.rejected.length > 0) responseData.error = 'rejected';
        // res.json(responseData);
        return;
      }

      console.log('Message sent: ' + info.response);
    });
  }

  res.json({ message: 'success' });
});

module.exports = router;
