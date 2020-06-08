module.exports = {
   '404 page if the url does not exist' : function(test){
          test
	     .open('http://localhost:8000/#/404')
	     .assert.text('h2').is('404')
	     .done();
   	}

};
