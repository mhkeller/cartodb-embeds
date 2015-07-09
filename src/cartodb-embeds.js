// @preserve cartodb-embed.js version: 0.1.0
// @preserve CartoDB.js version: 3.15.2 
// @preserve github.com/mhkeller/cartodb-embeds

(function(){

	var maps = {

		init: function(){

			var self = this;

			// Load the CartoDB.js stylesheet
			// And add some of our own basic styles
			var carto_stylesheet = '<link rel="stylesheet" href="http://libs.cartocdn.com/cartodb.js/v3/3.15/themes/css/cartodb.css" />'
			document.write(carto_stylesheet+'<style>.CDBE-embed{margin-bottom:10px;}.CDBE-map-container,.CDBE-inner-wrapper{width:100%;height:100%;}</style>')

			var id_counter = 0 

			var outerEls = document.querySelectorAll('.CDBE-embed')

			Array.prototype.forEach.call(outerEls, function(outerEl){

				var opts = {
					embedLink: outerEl.getAttribute('data-embed-link'),
					zoom: +outerEl.getAttribute('data-zoom'),
					latlng: self.parseLatLngAttr( outerEl.getAttribute('data-latlng') ),
					mobileZoom: +outerEl.getAttribute('data-mobile-zoom'),
					mobileLatlng: self.parseLatLngAttr( outerEl.getAttribute('data-mobile-latlng') ),
					mobileBreakpoint: parseFloat( outerEl.getAttribute('data-mobile-breakpoint') )
				}

				var id = 'mapid_' + id_counter

				self[id] = {}
				self[id].outerEl = outerEl	

				// Do our thangs
				self.bakeLayout(id)
				self.initCartoDb(id, opts)

				// Iterate the counter to generate a unique id
				id_counter++
				
			})


		},

		parseLatLngAttr: function(latLngStr){
			latLngStr = latLngStr || ''
			if (latLngStr) {
				latLngStr = latLngStr.split(',').map(function(val){ return +val })
			}

			return latLngStr
		},

		bakeLayout: function(id){

			// Nest everything in an inner wrapper.
			// This is good if we want to later add anything to our embed that is not part of the map canvas
			var innerEl = document.createElement('div')
			innerEl.setAttribute('class', 'CDBE-inner-wrapper')
			// Append the inner wrapper to our outer wrapper
			this[id].outerEl.appendChild(innerEl)

			// Create a map container
			var mapContainer = document.createElement('div')
			mapContainer.setAttribute('class', 'CDBE-map-container')
			mapContainer.setAttribute('id', 'CDBE-map-container-' + id)
			// Append that to the inner wrapper
			innerEl.appendChild(mapContainer)

			// Save this selector. This is the main parent we append to
			this[id].innerEl = innerEl
			this[id].mapContainer = mapContainer

			return this

		},

		initCartoDb: function(id, opts){
			var self = this

			cartodb.createVis('CDBE-map-container-' + id, opts.embedLink)	
				.on('done', function(vis, layers){
					self.setCartoDbListeners.call(self, id, vis, layers, opts)
				})
				.on('error', function() {
					cartodb.log.log('An error occurred loading CartoDB vis', id)
				})

			return this
		},

		setCartoDbListeners: function(id, vis, layers, opts){
			// layers[0] is the base layer. Future iterations of this will allow for custom baselayer and zoom-based baselayers
			var data_layer = layers[1]
			data_layer.setInteraction(true)

			var native_map = vis.getNativeMap(),
					initial_lnglat = native_map.getCenter(),
					initial_zoom = native_map.getZoom()

			console.log('native center', native_map.getCenter())

			var zoom   = opts.zoom   || initial_zoom
			var latlng = opts.latlng || initial_lnglat
			var mobile_breakpoint = opts.mobileBreakpoint || 720
			var window_width = window.innerWidth;


			if (window_width < opts.mobileBreakpoint) {
				zoom = opts.mobileZoom || zoom
				latlng = opts.mobileLatlng || latlng
				console.log('mobile')
			}

			console.log(zoom, latlng)

			native_map.setView(latlng, zoom)

			// Put custom functionality here
			// data_layer.on('featureOver', function(e, pos, latlng, data) {
			// 	cartodb.log.log(e, pos, latlng, data)
			// })

			data_layer.on('error', function(err) {
				cartodb.log.log('error: ' + err)
			})		

			this[id].native_map = native_map

		}

	}

	// Start
	maps.init()

}).call(this)