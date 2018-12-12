# sass-url-issue-with imports

This repository is meant just to describe a common issue with SASS when using `url(image)` in `background-image` or `mask-image` properties.

## Issue

Place image file in same directory of component's SCSS and import the component from main SCSS file. Try to require the image in component's SCSS file with `url()`.

### About this example

On this example we have `src/main.scss` which imports `src/foo/bar.scss`.

The options for requiring image are:
- *Option A:* `url('./bar.png')`
- *Option B:* `url('foo/bar.png')` 
- *Option C:* `url('bar.png')`

### Desired outcome

It would be nice to have option A to work (or option C, if it would require the image from same directory where the SASS file with url() is located in). 

Option B is not desireable, because it's difficult to maintain relative path to image in subdirectories - for example if the imported components come in package located in `node_modules` or GIT submodule.

Many of the currently available modules use global variables to cope with the issue (e.g. set local relative path with some variable, before importing the file). The problem is handled correctly in Stylus and LESS, which have option to translate the paths when importing.

The only option so far that works with SASS is using Webpack and `resolve-url-loader`, which isolates the issue and uses source maps to fix imported paths.

## NPM scripts

You can run the following tasks:

- `npm run webpack` = executes webpack build with default configuration (`webpack.config.js`), outputting to `dist/webpack`.
- `npm run webpack-without-resolve-url-loader` = executes webpack build with configuration without `resolve-url-loader` (`webpack-without-resolve-url-loader.config.js`), outputting to `dist/webpack-without-resolve-url-loader`.
- `npm run node-sass` = executes SASS build (node-sass) outputting to `dist/node-sass`.
- `npm run ruby-sass` = executes SASS build (Ruby SASS, e.g. `sudo gem install sass`) outputting to `dist/ruby-sass`.
- `npm run parcel` = executes Parcel build outputting to `dist/parcel`.

## Webpack

*Option A:* Works with `resolve-url-loader`. Uncomment `src/foo/bar.scss` line 5 and run `npm run webpack`.

*Option B:* Works without `resolve-url-loader`. Uncomment `src/foo/bar.scss` line 6 and run `npm run webpack-without-resolve-url-loader`.

*Option C:* Doesn't work with or without `resolve-url-loader`. Uncomment `src/foo/bar.scss` line 7 and try running `npm run webpack` or `npm run webpack-without-resolve-url-loader`.

## SASS

*Option A:* Doesn't work. Uncomment `src/foo/bar.scss` line 5 and try running `npm run node-sass` or `npm run ruby-sass`.

*Option B:* Works. Uncomment `src/foo/bar.scss` line 6 and run `npm run node-sass` or `npm run ruby-sass`.

*Option C:* Doesn't work. Uncomment `src/foo/bar.scss` line 7 and try running `npm run node-sass` or `npm run ruby-sass`.

## Parcel

*Option A:* Doesn't work. Uncomment `src/foo/bar.scss` line 5 and try running `npm run parcel`.

*Option B:* Works. Uncomment `src/foo/bar.scss` line 6 and run `npm run parcel`.

*Option C:* Doesn't work. Uncomment `src/foo/bar.scss` line 7 and try running `npm run parcel` .

