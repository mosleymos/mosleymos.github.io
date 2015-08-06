module.exports = {
  'Projects page should display the correct title' : function(test){
	 test
	    .open('http://localhost:8000/#/projects')
	    .assert.text('h2').is('Mes projets actuels')
	    .done();
  }
};
