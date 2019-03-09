# Bootstrap 4 boilerplate

A minimalistic boilerplate for [Bootstrap 4](https://getbootstrap.com) with [Sass](https://sass-lang.com), [Browsersync](https://www.browsersync.io) and [Gulp.js](https://gulpjs.com/) for autoprefixing, concatenating, sourcemap creation, live reloading, minification and building.

## Setup

`git clone https://github.com/RaunoT/bootstrap-4-boilerplate`

`cd bootstrap-4-boilerplate`

`npm install`

## Gulp tasks

* `gulp` - The default task that compiles Sass, concatenates CSS & JS files, creates sourcemaps and moves dependencies to vendor folders

* `gulp vendor` - Moves dependencies to vendor folders

* `gulp dev` - Runs Browsersync in your browser to live reload any changes made

* `gulp dist` - Builds everything and moves it into **dist** folder for production

## Copyright and License

Copyright © 2019 Rauno Tegelmann.

Released under the [MIT](https://github.com/RaunoT/bootstrap-4-boilerplate/blob/master/LICENSE) license.
