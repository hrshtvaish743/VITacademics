var api_login = require('../../../api/vellore/login');
var express = require('express');
var router = express.Router();

router.get('/manual', function (req, res)
{
    var RegNo = req.query.regno;
    api_login.getCaptcha(RegNo, function (captchaImage)
    {
        res.writeHead(200, {"Content-Type": "image/bmp"});
        res.write(captchaImage);
        res.end();
    });
});

router.get('/auto', function (req, res)
{
    var RegNo = req.query.regno;
    var DoB = req.query.dob;
    /*
     login(doc, function (callback) {
     callback();
     });
     */
    res.send('Captchaless login!');
});

router.get('/submit', function (req, res)
{
    var RegNo = req.query.regno;
    var DoB = req.query.dob;
    var Captcha = req.query.captcha;
    api_login.submitLogin(RegNo, DoB, Captcha, function (loginResponse)
    {
        res.send(loginResponse);
    });
});

module.exports = router;