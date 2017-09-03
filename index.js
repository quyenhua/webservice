var app = require('express')();
app.set('view engine', 'ejs');
app.set('views', './views');
var cool = require('cool-ascii-faces');
var dataList = require('./public/data-list.js');
var list = dataList.getList;

app.get('/', function (req, res) {
	res.render('index');
});

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

app.get('/cool', function(request, response) {
  response.send(cool());
});

app.listen(3000);
console.log('Server is running...');