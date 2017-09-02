var app = require('express')();
var dataList = require('./public/data-list.js');
var list = dataList.getList;

app.get('/listSlider', function (req, res, next) {
	list.getSlider(function (err, data) {
		if (err) {
			console.log(err);
		} else {
			res.json(data);
			console.log(data);
		}
	});
});

app.listen(3000);
console.log('Server is running...');