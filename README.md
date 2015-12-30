# mosleymos.github.io

Blog Mosleymos

I write some posts about programmation, tips and tricks
It's a work in progress
Integration test made with dalekjs
I've used browserify to import angularjs
In order to run the website on your local machine, you'll need ruby programming language and rake gem.

Build website
```
rake build_site

```
Launch website
```
python -m SimpleHTTPServer

```
Open your brower at localhost:8000 to see the website

TODO:
1. Make an other version of the site with polymerjs
2. Create a gruntfile process
  2.1 Concatenate html
  2.2 Compile scss 
  2.3 Concatenate css 
  2.4 Minify css
  2.5 Minify js 
  2.6 Install livereload
