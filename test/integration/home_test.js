module.exports = {
   'Home page title is present' : function(test){
	   test
	      .open('http://localhost:8000')
	      .assert.title().is('DecoDe blog' , 'Le titre de la page est présent')
	      .done();
   },
   'Home page have the welcome' : function(test){
	   test
	      .open('http://localhost:8000')
	      .assert.text('h2').is('Bienvenue sur le blog de mosleymos', 'Exterminate')
	      .done();
   }
};
