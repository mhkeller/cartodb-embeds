CartoDB Embeds
===

These CartoDB embeds balance all the free things you get when using a CartoDB "Visualization embed" (search field, loading spinner legends), with the ability to customize a zoom and starting lat/lng.

Check out the [example](http://mhkeller.github.io/cartodb-embeds/examples/index.html).

## Example usage

````html

<!-- Include script -->
<script src="cartodb.embeds.js"></script>

<!-- Vanilla embed, latlng and zoom are as described in viz -->
<div class="CDBE-embed" data-embed-link="link-goes-here" style="width: 100%; height: 500px;"></div>
	
<!-- Custom zoom -->
<div class="CDBE-embed" data-embed-link="link-goes-here" data-zoom="14" style="width: 100%; height: 500px;"></div>

<!-- Custom latlng and zoom -->
<div class="CDBE-embed" data-embed-link="link-goes-here" data-latlng="33.9436333,-118.4906967" data-zoom="9" style="width: 100%; height: 500px;"></div>

````

## Future features

Check the Issue Tracker for progress. A few ideas are:

* Mobile latlng
* Mobile zoom
* Baselayer swap out based on zoom
