var request = require('request'),
	username = "john",
    password = "1234",
    url = "http://" + username + ":" + password + "@www.nhaccuatui.com";
var cheerio = require('cheerio');
var urlConstant = require('../constants/url-constant.js');

var homePage = urlConstant.HOME_PAGE;

var getList = {
	getSlider: function (callback) {
		request({url}, function (err, res, body) {
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

};

module.exports = {
	getList
};