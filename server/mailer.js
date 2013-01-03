/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true eqeqeq:true immed:true latedef:true*/
(function () {
  "use strict";

  var nodemailer = require("nodemailer")
    , config = require('./config')
      // create reusable transport method (opens pool of SMTP connections)
    , smtpTransport = nodemailer.createTransport("SMTP", config.mailer)
    ;

  function newTall(tall) {
    // TODO 'Congrats, you're the new tallest member of'
    // setup e-mail data with unicode symbols
    var mailOptions = {
            from: "AJ ONeal <aj@mensmediumtall.com>" // sender address
          , to: "AJ ONeal <coolaj86@gmail.com>, Brian Tecklenburg <briantecklenburg@gmail.com>" // list of receivers
          , subject: "[MMT] Bean pole #{x} " + tall.email.replace(/@.*/, '') // Subject line
          , text: JSON.stringify(tall, null, '  ') // plaintext body
            // TODO syntax highlight
          , html: '<pre>' + JSON.stringify(tall, null, '  ') + '</pre>' // html body
        }
    ;

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
  }

  module.exports.newTall = newTall;
}());
