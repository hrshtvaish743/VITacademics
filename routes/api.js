/*
 *  VITacademics
 *  Copyright (C) 2015  Aneesh Neelam <neelam.aneesh@gmail.com>
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var express = require('express');
var path = require('path');
var router = express.Router();

var loginManual = require(path.join(__dirname, '..', 'api', 'login', 'get'));
var loginAuto = require(path.join(__dirname, '..', 'api', 'login', 'auto'));
var loginSubmit = require(path.join(__dirname, '..', 'api', 'login', 'submit'));
var dataAggregate = require(path.join(__dirname, '..', 'api', 'scraper', 'aggregate'));
var dataGrades = require(path.join(__dirname, '..', 'api', 'scraper', 'grades'));
var friendsGenerate = require(path.join(__dirname, '..', 'api', 'friends', 'generate'));
var friendsShare = require(path.join(__dirname, '..', 'api', 'friends', 'share'));
var system = require(path.join(__dirname, '..', 'api', 'system'));


router.get('/system', function (req, res) {
    var app = {
        db: req.db
    };
    var data = {
        campus: req.originalUrl.split('/')[2].toLowerCase()
    };
    var onGet = function (err, response) {
        res.json(response);
    };
    system.get(app, data, onGet);
});

router.get('/login/manual', function (req, res) {
    var app = {
        db: req.db
    };
    var data = {
        reg_no: req.query.regno.toUpperCase(),
        campus: req.originalUrl.split('/')[2].toLowerCase()
    };
    var onGetCaptcha = function (err, captchaResponse) {
        if (err) {
            res.send(captchaResponse);
        }
        else {
            res.writeHead(200, {'Content-Type': 'image/bmp'});
            res.write(captchaResponse);
            res.end();
        }
    };
    loginManual.get(app, data, onGetCaptcha);
});

router.get('/login/submit', function (req, res) {
    var app = {
        db: req.db
    };
    var data = {
        reg_no: req.query.regno.toUpperCase(),
        dob: req.query.dob,
        captcha: req.query.captcha.toUpperCase(),
        campus: req.originalUrl.split('/')[2].toLowerCase()
    };
    var onGet = function (err, loginResponse) {
        res.json(loginResponse);
    };
    loginSubmit.get(app, data, onGet);
});

router.get('/login/auto', function (req, res) {
    var app = {
        db: req.db
    };
    var data = {
        reg_no: req.query.regno.toUpperCase(),
        dob: req.query.dob,
        campus: req.originalUrl.split('/')[2].toLowerCase()
    };
    var onGet = function (err, loginResponse) {
        res.json(loginResponse);
    };
    loginAuto.get(app, data, onGet);
});

router.get('/data/first', function (req, res) {
    var app = {
        db: req.db
    };
    var data = {
        reg_no: req.query.regno.toUpperCase(),
        dob: req.query.dob,
        first_time: true,
        campus: req.originalUrl.split('/')[2].toLowerCase()
    };
    var onGet = function (err, data) {
        res.json(data);
    };
    dataAggregate.get(app, data, onGet);
});

router.get('/data/refresh', function (req, res) {
    var app = {
        db: req.db
    };
    var data = {
        reg_no: req.query.regno.toUpperCase(),
        dob: req.query.dob,
        first_time: false,
        campus: req.originalUrl.split('/')[2].toLowerCase()
    };
    var onGet = function (err, data) {
        res.json(data);
    };
    dataAggregate.get(app, data, onGet);
});

router.get('/data/grades', function (req, res) {
    var app = {
        db: req.db
    };
    var data = {
        reg_no: req.query.regno.toUpperCase(),
        dob: req.query.dob,
        campus: req.originalUrl.split('/')[2].toLowerCase()
    };
    var onGet = function (err, data) {
        res.send(data);
    };
    dataGrades.get(app, data, onGet);
});

router.get('/friends/regenerate', function (req, res) {
    var app = {
        db: req.db
    };
    var data = {
        reg_no: req.query.regno.toUpperCase(),
        dob: req.query.dob,
        campus: req.originalUrl.split('/')[2].toLowerCase()
    };
    var onGet = function (err, data) {
        res.json(data);
    };
    friendsGenerate.get(app, data, onGet);
});

router.get('/friends/share', function (req, res) {
    var token;
    var reg_no;
    if (req.query.token) token = req.query.token.toUpperCase();
    if (req.query.regno) reg_no = req.query.regno.toUpperCase();
    var app = {
        db: req.db
    };
    var data = {
        reg_no: reg_no,
        dob: req.query.dob,
        token: token,
        campus: req.originalUrl.split('/')[2].toLowerCase()
    };
    var onGet = function (err, data) {
        res.json(data);
    };
    friendsShare.get(app, data, onGet);
});

module.exports = router;
