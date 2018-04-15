var express = require('express');
var router = express.Router();
var path = require('path');
var nodemailer = require('nodemailer');
const apn = require('apn');


/* 
    APN code, uesd to setup and send a notification
*/
let options = {
    token: {
        //apple .cert file, turned into .p8
        key: "routes/aps.p8",
        //my keyId?, gotten from the 'keys' tab under the certificates tab in
        //developer.apple.com
        keyId: "X3H5KQKUPZ",
        //my teamId? from developer.apple.com, go to membership tab
        teamId: "MGCJP7HRV3"
    },
    production: false
};

let apnProvider = new apn.Provider(options);

//device token for phone, this is ideally stored in a database,
//since each phone has a different device token. Just gonnna use the
//one for my phone for now.
let deviceToken = "1B223E64145BEB7D0F70AB052C66F3062EFFF06BF3DEA68E314CAA179656D466";


//setting up the notification and its parameters
let notification = new apn.Notification();
notification.expiry = Math.floor(Date.now() / 1000) + (24 * 3600); //will expire in 25hrs
notification.badge = 0;
notification.sound = "ping.aiff";
notification.alert = "ALERT! The target frequency was detected!";
notification.contentAvailable = 1;
notification.payload = {aps: {messageFrom : 'Mahmud Ahmad', badge: "+1", "content-available": "1"} };

//app bundle id
notification.topic = "com.mahmudahmad.Safety-Earmuff";

//send the actual notificaiton using this function

/*
    apnProvider.send(notification, devToken).then(result => {
        console.log(result);
    });
*/

//close notifications server
//apnProvider.shutdown();

function sendNotification() {
    console.log("its going in 1");
    apnProvider.send(notification, deviceToken).then(result => {
        console.log(result);
        console.log("its going in");
    });
    apnProvider.shutdown();
}
/*
    END of APN code
*/




/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.sendfile(path.resolve(path.join(__dirname, '../views/index.html')));
});

router.post('/send-mail', (req, res) => {
    console.log("look here?");
    sendNotification();
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
    //var x = req.rawHeaders.values.toString;
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
        html: '<p>A XHz signal was found! Gal Gadot is Hot</p> <img src="https://cdn.vox-cdn.com/thumbor/_PzVzSBP7cweErN1i0fDfosNIoE=/0x0:3000x3000/1200x800/filters:focal(1404x319:1884x799)/cdn.vox-cdn.com/uploads/chorus_image/image/57581219/856437894.jpg.0.jpg" alt="Gal Gadot">',
    };

    // send mail with defined transport object
    /*transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            var responseData = { message: 'fail' };
            if (error.rejected && error.rejected.length > 0) responseData.error = 'rejected';
            // res.json(responseData);
            return;
        }

        console.log('Message sent: ' + info.response);
    });*/
    //}

    res.json({ message: 'success' });
});

module.exports = router;