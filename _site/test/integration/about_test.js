module.exports = {
  'Page about should have the correct h2': function(test) {
	test
	  .open('http://localhost:8000/#/about')
	  .assert.text('h2.navigation-title').is('A propos de moi')
	  .done();

  }

};
