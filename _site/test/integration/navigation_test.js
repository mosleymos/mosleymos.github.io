module.exports = {
  'home page should have navigation': function(test){
	test
	  .open('http://localhost:8000')
	  .assert.visible('.navigation-link' ,'Home page test')
	  .assert.text('a.navigation-link').is('Accueil')
	  .assert.text('#navigation > ul > li:nth-child(3) > a').is('Articles')
	  .assert.text('#navigation > ul > li:nth-child(4) > a').is('Projets')
	  .assert.text('#navigation > ul > li:nth-child(5) > a').is('A propos')
	  .done();
  }, 

 'About page should have navigation': function(test){
	test
	  .open('http://localhost:8000/#/about')
	  .assert.visible('.navigation-link' ,'About page test')
	  .assert.text('a.navigation-link').is('Accueil')
	  .assert.text('#navigation > ul > li:nth-child(3) > a').is('Articles')
	  .assert.text('#navigation > ul > li:nth-child(4) > a').is('Projets')
	  .assert.text('#navigation > ul > li:nth-child(5) > a').is('A propos')

	  .done();
  }, 

 'Articles page should have navigation': function(test){
	test
	  .open('http://localhost:8000/#/articles')
	  .assert.visible('.navigation-link' ,'Articles page test')
	  .assert.text('a.navigation-link').is('Accueil')
	  .assert.text('#navigation > ul > li:nth-child(3) > a').is('Articles')
	  .assert.text('#navigation > ul > li:nth-child(4) > a').is('Projets')
	  .assert.text('#navigation > ul > li:nth-child(5) > a').is('A propos')

	  .done();
  }, 

 'Projects page should have navigation': function(test){
	test
	  .open('http://localhost:8000/#/projects')
	  .assert.visible('.navigation-link' ,'Articles page test')
	  .assert.text('a.navigation-link').is('Accueil')
	  .assert.text('#navigation > ul > li:nth-child(3) > a').is('Articles')
	  .assert.text('#navigation > ul > li:nth-child(4) > a').is('Projets')
	  .assert.text('#navigation > ul > li:nth-child(5) > a').is('A propos')

	  .done();
  }
};
