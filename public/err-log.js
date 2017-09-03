'use strict';

var errCode = {
	errCode: function (err) {
		var err = {
			err: true,
			errMessage: err  
		};
		return err;
	} 
};

module.exports = errCode;