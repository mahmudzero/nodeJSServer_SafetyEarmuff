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
            user: 'mahmud.ahmad.safetyearmudd@gmail.com',
            pass: 'elec4457',
        }
    });
    var x = req.rawHeaders.values.toString;
    //var html_string = '<p> The found frequency is: ' + '' + '</p>';

    var emails = ['ahmad.mahmud1997@gmail.com'
        /*, 'mahma3@unh.newhaven.edu',
                'rkoll2@unh.newhaven.edu', 'bkarimi@newhaven.edu', 'msarraf@newhaven.edu',
                'malja1@unh.newhaven.edu', 'fpena2@unh.newhaven.edu', 'jpell3@unh.newhaven.edu',
                'jmarcus@newhaven.edu', 'mgeli1@unh.newhaven.edu', 'adami3@unh.newhaven.edu',
                'mmick1@unh.newhaven.edu', 'sosel1@unh.newhaven.edu', 'bphil3@unh.newhaven.edu',
                'vmill1@unh.newhaven.edu', 'jrami1@unh.newhaven.edu', 'jrest1@unh.newhaven.edu',
                'lospi1@unh.newhaven.edu', 'abrit1@unh.newhaven.edu'*/
    ];

    //for (var i = 0; i < emails.length; i++) {
    //var email = emails[i];

    // setup e-mail data
    var mailOptions = {
        from: 'Mahmud <mahmud.ahmad.SafteyEarmuff@gmail.com>', // sender address (who sends)
        to: emails, // list of receivers (who receives)
        subject: "Signal found", // Subject line
        text: "",
        html: '', //'<p>A XHz signal was found! Gal Gadot is Hot</p> <img src="https://cdn.vox-cdn.com/thumbor/_PzVzSBP7cweErN1i0fDfosNIoE=/0x0:3000x3000/1200x800/filters:focal(1404x319:1884x799)/cdn.vox-cdn.com/uploads/chorus_image/image/57581219/856437894.jpg.0.jpg" alt="Gal Gadot">',
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
    //}

    res.json({ message: 'success' });
});

module.exports = router;