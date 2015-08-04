module.exports = {
   'Home page is present' : function(test){
	   test
	      .open('http://localhost:8000')
	      .assert.title().is('DecoDe blog' , 'Le titre de la page est présent')
	      .done();
   }
};
