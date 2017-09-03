var app = require('express')();
app.set('view engine', 'ejs');
app.set('views', './views');
var async = require('async');

var dataList = require('./public/data-list.js');
var list = dataList.getList;

var errCode = require('./public/err-log.js');
var urlConstants = require('./constants/url-constant.js');

var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
	res.render('index');
});

app.get('/list/slider', function (req, res, next) {
	list.getSlider(function (err, data) {
		if (err) {
			res.json(errCode.errCode());
			console.log(err);
		} else {
			res.json(data);
			console.log(data);
		}
	});
});

app.get('/song-top', function (req, res) {
	var topList = {};
	async.parallel([
		function callback() {
			list.getSongTop(urlConstants.TOP_SONG_VIET, function (err, data) {
				if (err) {
					callback(err);
				} else {
					topList.topViet = data;
					callback(null);
				}
			});
		},
		function callback() {
			list.getSongTop(urlConstants.TOP_SONG_AUMY, function (err, data) {
				if (err) {
					callback(err);
				} else {
					topList.topAuMy = data;
					callback(null);
				}
			});
		},
		function callback() {
			list.getSongTop(urlConstants.TOP_SONG_HAN, function (err, data) {
				if (err) {
					callback(err);
				} else {
					topList.topKorea = data;
					callback(null);
				}
			});
		}
	], function (err) {
		if (err) {
			res.json(err);
			console.log(err);
		} else {
			res.json(topList);
			console.log(topList);
		}
	});
});

app.listen(port);
console.log('Server is running in port ' + port);