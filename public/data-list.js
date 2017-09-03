var request = require('request')
var cheerio = require('cheerio');
var urlConstant = require('../constants/url-constant.js');

var homePage = urlConstant.HOME_PAGE;

var getList = {
	getSlider: function (callback) {
		request(homePage, function (err, res, body) {
			if (err) {
				callback(err);
			} else {
				var $ = cheerio.load(body);
				var listSlider = [];
				$('div#marquee_navid_slide').find('a').each(function (i, e) {
					var href = e['attribs']['href'];
					var listJson = {
						title: e['attribs']['title'],
						img: $(this).find('img').attr('src'),
						href: href
					};
					listSlider[i] = listJson;
				});
				callback(null, listSlider);
			}
		});
	},
	getSongTop: function (url, callback) {
		request(url, function (err, response, body) {
			if (err) {
				callback(err);
			} else {
				var listInfomation = _getTopInfomation(body);
				callback(null, listInfomation);
			}
		});
	},
};

function _getTopInfomation (body) {
	var $ = cheerio.load(body);
	var listAll = [];
	$('div.box_info_field').each(function (i, e) {
		// Get title for song
		var titleForSong = $(this).find('a.name_song');
		var title = titleForSong.text();
		var href = titleForSong.attr('href');
		var id = href.split('.')[3];

		// Get singer list for a song
		var singersForSong = $(this).find('a.name_singer');
		var singers = [];
		singersForSong.each(function (i, e) {
			singers[i] = $(this).text();
		});

		// Get image for song
		var imgForSong = $(this).find('img');
		var img = $(this).find('img').attr('src');

		var listJson = {
			title: title,
			singers: singers,
			img: img,
			key: id,
			href: href
		}
		listAll[i] = listJson;
	});
	return listAll;
}

module.exports = {
	getList
};