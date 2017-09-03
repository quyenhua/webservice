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
	getAlbumHot: function (callback) {
		request(homePage, function (err, response, body) {
			if (err) {
				callback(err);
			} else {
				var $ = cheerio.load(body);
				var divImg = $(body).find('div.box-left-album');
				var listAlbum = [];
				var img = [];
				divImg.each(function (i, e) {
					img[i] = $(this).find('img').attr('src');
				});
				var divInfo = $(body).find('div.info_album');
				divInfo.each(function (i, e) {
					var title = $(this).find('a.name_song').text();
					var href = $(this).find('a.name_song').attr('href');
					var singers = [];
					$(this).find('a.name_singer').each(function (i, e) {
						singers[i] = $(this).text();
					});
					var album = {
						title: title,
						singers: singers,
						img: img[i],
						href:href
					};
					listAlbum[i] = album;
				});
				callback(null, listAlbum);
			}
		});
	},
	getListMVHot: function (callback) {
		request(homePage, function (err, response, body) {
			if (err) {
				callback(err);
			} else {
				var $ = cheerio.load(body);
				var listMV = [];
				var count = 0;
				$(body).find('li.videosmall').each(function (i, e) {
					if (count < 10) {
						var name_href = count < 2 ? $(this).find('a.name_song') : $(this).find('a.name_song_index');
						var title = name_href.text();
						var href = name_href.attr('href');
						var singers = [];
						$(this).find('a.name_singer').each(function (i, e) {
							singers[i] = $(this).text();
						});
						var img = $(this).find('img').attr('src');
						var album = {
							title: title,
							singers: singers,
							img: img,
							href:href
						};
						listMV[i] = album;
						count++;
					}
				});
				callback(null, listMV);
			}
		});
	},
	getListMVTop: function (url, callback) {
		request(url, function (err, response, body) {
			if (err) {
				callback(err);
			} else {
				var $ = cheerio.load(body);
				var listMVTop = [];
				$(body).find('div.box_info_field').each(function (i, e) {
					var title = $(this).find('a.name_song').text();
					var href = $(this).find('a.name_song').attr('href');
					var singers = [];
					$(this).find('a.name_singer').each(function (i, e) {
						singers[i] = $(this).text();
					});
					var img = $(this).find('img').attr('src');
					var album = {
						title: title,
						singers: singers,
						img: img,
						href:href
					};
					listMVTop[i] = album;
				});
				callback(null, listMVTop);
			}
		});
	},
	getListSongNewSinger: function (callback) {
		request(homePage, function(err, response, body) {
			if (err) {
				callback(err);
			} else {
				var $ = cheerio.load(body);
				var listSongNewSinger = [];
				var div = $(body).find('div.list_singer_music');
				div.find('div.info_data').each(function (i, e) {
					var title = $(this).find('a.name_song').text();
					var href = $(this).find('a.name_song').attr('href');
					var id = href.split('.')[3];
					var singers = [];
					$(this).find('a.name_singer').each(function (i, e) {
						singers[i] = $(this).text();
					});
					var img = $(this).find('img').attr('src');
					var album = {
						title: title,
						singers: singers,
						img: img,
						href:href,
						key: id
					};
					listSongNewSinger[i] = album;
				});
				callback(null, listSongNewSinger);
			}
		});
	},
	getListTopic: function (callback) {
		request(homePage, function (err, response, body) {
			if (err) {
				callback(err);
			} else {
				var $ = cheerio.load(body);
				var listTopic = [];
				var div = $(body).find('div.box_topic_music');
				div.find('ul').find('a').each(function (i, e) {
					var topic = {
						title: e['attribs']['title'],
						href: e['attribs']['href'],
						img: $(this).find('img').attr('src')
					}
					listTopic[i] = topic;
				});
				callback(null, listTopic);
			}
		});
	},
	getListNewSong: function (callback) {
		request(homePage, function (err, response, body) {
			if (err) {
				callback(err);
			} else {
				var $ = cheerio.load(body);
				var listNewSong = [];
				var div = $(body).find('div.list_music');
				div.find('div.info_song').each(function (i, e) {
					var title = $(this).find('a.name_song').text();
					var href = $(this).find('a.name_song').attr('href');
					var id = href.split('.')[3];
					var singers = [];
					$(this).find('a.name_singer').each(function (i, e) {
						singers[i] = $(this).text();
					});
					var album = {
						title: title,
						singers: singers,
						href:href,
						key: id
					};
					listNewSong[i] = album;
				});
				callback(null, listNewSong);
			}
		});
	}
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