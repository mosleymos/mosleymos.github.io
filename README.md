# mosleymos.github.io
[![Build Status](https://travis-ci.org/mosleymos/mosleymos.github.io.svg?branch=master)](https://travis-ci.org/mosleymos/mosleymos.github.io)

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
  2.1 Clean html
  2.2 Compile scss 
  2.3 Concatenate css 
  2.4 Minify css
  2.5 Minify js 
  2.6 Install livereload
3. Article to finish
  3.1 VBn information
  3.2 2 years information
  3.3 Shneck-analysis
  3.4 Email-analysis
4. Integrate image logo of Iwheelshare, VBN, arkena, meteor to project
5. Include .travis integration
6. Recreate blogsite style
7. Add a custom 404 page if possible

DOING:
- Choose gulp, seems better and funny a [little tutorial](https://www.youtube.com/watch?v=dwSLFai8ovQ)
- Migrate site from angularjs to jekyll

DONE:
- Gulp base configuration
