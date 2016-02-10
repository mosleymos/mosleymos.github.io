module.exports = {
  'Article page should have the correct title' : function(test){
      test
         .open('http://localhost:8000/#/articles')
	 .assert.text('h2').is('Liste des articles')
	 .done();
  }
};
