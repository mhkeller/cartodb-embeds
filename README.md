CartoDB Embeds
===

These CartoDB embeds balance all the free things you get when using a CartoDB "Visualization embed" (legends, address search field, tile layer loading spinners), with the ability to customize a zoom and starting lat/lng and a few other ideas in the works.

#### Check out the [example](http://mhkeller.github.io/cartodb-embeds/examples/index.html).

## Installation

The `dist/` folder contains two files

* **`cartodb-embeds.js`** The minified version of just this library. You'll need to load your own CartoDB.js. Note: this library has only been tested with CartoDB.js 3.15.1
* **`cartodb-embeds.pkgd.min.js`** The same as above packaged with CartoDB.js 3.15.1.

## Example usage

````html
<!-- Vanilla embed, latlng and zoom are as described in viz -->
<div class="CDBE-embed" data-embed-link="link-goes-here" style="width: 100%; height: 500px;"></div>
	
<!-- Custom zoom -->
<div class="CDBE-embed" data-embed-link="link-goes-here" data-zoom="14" style="width: 100%; height: 500px;"></div>

<!-- Custom latlng and zoom -->
<div class="CDBE-embed" data-embed-link="link-goes-here" data-latlng="33.9436333,-118.4906967" data-zoom="9" style="width: 100%; height: 500px;"></div>

<!-- Custom mobile latlng, mobile zoom and mobile breakpoint -->
<div class="CDBE-embed" data-embed-link="link-goes-here" data-latlng="33.9436333,-118.4906967" data-zoom="9" data-mobile-zoom="3" data-mobile-latlng="33.8,-119" data-mobile-breakpoint="500px" style="width: 100%; height: 500px;"></div>

<!-- Include script -->
<script src="cartodb-embeds.pkgd.min.js"></script>

````

## Developing

This projects uses bower and gulp, which are [NodeJS](http://nodejs.org) tools. If you don't have them, install with:

````
npm install bower -g
npm install gulp -g
````

Then, in this project folder run

````
bower install
npm install
````

To package the JavaScript to the `dist/` folder, simply run `gulp`.

#### Other handy things

If you want to repackage the JavaScript as you're working, use the `gulp dev` command, which will watch the project folder and rerun the gulp tasks when it detects changes.

If you're not used to writing Vanilla JavaScript (i.e. not using jQuery), the site "[You might not need jQuery](http://youmightnotneedjquery.com/)" has a lot of equivalencies. I'm currently setting it to the "Support IE9" level.

## Future features

Check the [Issue Tracker](https://github.com/mhkeller/cartodb-embeds/issues) for progress. A few ideas are:

* Mobile latlng
* Mobile zoom
* Baselayer swap out based on zoom
