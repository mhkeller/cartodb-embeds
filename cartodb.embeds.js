(function(){


	var maps = {

		init: function(){

			// Load the CartoDB.js stylesheet
			// And add some of our own basic styles
			var carto_stylesheet = '<link rel="stylesheet" href="http://libs.cartocdn.com/cartodb.js/v3/3.15/themes/css/cartodb.css" />';
			document.write(carto_stylesheet+'<style>.CDBE-map{margin-bottom:10px;}.CDBE-map-container,.CDBE-inner-wrapper{width:100%;height:100%;}</style>');

			var id_counter = 0;

			var outerEls = document.querySelectorAll('.CDBE-map');

			outerEls.each(function(){


				var $outerEl = jQuery(this),
						embed_link = $outerEl.attr('data-embed-link'),
						zoom = +$outerEl.attr('data-zoom'),
						latlng_str = $outerEl.attr('data-latlng'),
						latlng = latlng_str;

				if (latlng_str){
					latlng = latlng_str.split(',').map(function(val){ return +val; });
				}

				var id = 'mapid_'+id_counter;

				maps[id] = {};
				maps[id].$outerEl = $outerEl;	

				// Do our thangs
				maps.bakeLayout(id);
				maps.initCartoDb(id, latlng, zoom, embed_link);

				// Iterate the counter to generate a unique id
				id_counter++;
				
			});

		},

		bakeLayout: function(id){

			// Nest everything in an inner wrapper.
			// This is good if we want to later add anything to our embed that is not part of the map canvas
			var $innerEl = jQuery('<div class="CDBE-inner-wrapper"></div>').appendTo(this[id].$outerEl);

			var $mapContainer = jQuery('<div class="CDBE-map-container" id="CDBE-map-container-'+id+'"></div>').appendTo($innerEl);

			// Save this selector. This is the main parent we append to
			this[id].$innerEl = $innerEl;
			this[id].$mapContainer = $mapContainer;

			return this;

		},

		initCartoDb: function(id, latlng, zoom, embedLink){
			var that = this;
			console.log(id, embedLink)

			cartodb.createVis('CDBE-map-container-'+id, embedLink)	
				.on('done', function(vis, layers){
					that.setCartoDbListeners.call(that, id, vis, layers, latlng, zoom);
				})
				.on('error', function() {
					cartodb.log.log('An error occurred loading CartoDB vis', id);
				});

			return this;
		},

		setCartoDbListeners: function(id, vis, layers, latlng, zoom){
			// layers[0] is the base layer. Future iterations of this will allow for custom baselayer and zoom-based baselayers
			var data_layer = layers[1];
			data_layer.setInteraction(true);

			var native_map = vis.getNativeMap(),
					initial_lnglat = native_map.getCenter(),
					initial_zoom = native_map.getZoom();

			latlng = latlng || initial_lnglat;
			zoom   = zoom   || initial_zoom;

			native_map.setView(latlng, zoom);

			// Put custom functionality here
			// data_layer.on('featureOver', function(e, pos, latlng, data) {
			// 	cartodb.log.log(e, pos, latlng, data);
			// });

			data_layer.on('error', function(err) {
				cartodb.log.log('error: ' + err);
			});		

			this[id].native_map = native_map;

		}

	};

	// Give the site's version of jQuery control over `$`, we'll use 
	$.noConflict();

	maps.init();


}).call(this);