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
  - Clean html
  - Compile scss
  - Concatenate css
  - Minify css
  - Minify js
  - Install livereload
3. Article to finish
  - VBn information
  - 2 years information
  - Shneck-analysis
  - Email-analysis
4. Integrate image logo of Iwheelshare, VBN, arkena, meteor to project
6. Recreate blogsite style
7. Add a custom 404 page if possible
8. Correct articles - add english version


DOING:
- Choose gulp, seems better and funny a [little tutorial](https://www.youtube.com/watch?v=dwSLFai8ovQ)


DONE:
- Gulp base configuration
- Migrate site from angularjs to jekyll
- Include .travis integration
