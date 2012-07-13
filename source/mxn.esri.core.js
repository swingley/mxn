mxn.register('esri', {

Mapstraction: {
	
	init: function(element, api) {
		var me = this;
		dojo.require("esri.map");
		dojo.require("esri.layers.FeatureLayer");

		var map = new esri.Map(element.id, {
			wrapAround180: true
		});

		var basemap = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer");
		map.addLayer(basemap);

		// map.addEventListener('moveend', function(){
		// 	me.endPan.fire();
		// }); 
		// map.on("click", function(e) {
		// 	me.click.fire({'location': new mxn.LatLonPoint(e.latlng.lat, e.latlng.lng)});
		// });
		// map.on("popupopen", function(e) {
		// 	if (e.popup._source.mxnMarker) {
		// 		e.popup._source.mxnMarker.openInfoBubble.fire({'bubbleContainer': e.popup._container});
		// 	}
		// });
		// map.on("popupclose", function(e) {
		// 	if (e.popup._source.mxnMarker) {
		// 		e.popup._source.mxnMarker.closeInfoBubble.fire({'bubbleContainer': e.popup._container});
		// 	}
		// });
		this.layers = {};
		this.features = [];
		this.maps[api] = map;
		this.setMapType();
		this.currentMapType = mxn.Mapstraction.ROAD;
		this.loaded[api] = true;

	},
	
	applyOptions: function(){
		if (this.options.enableScrollWheelZoom) {
			// this.maps[this.api].enableScrollWheelZoom();
		} else {
			// this.maps[this.api].disableScrollWheelZoom();
		}
		return;
	},

	resizeTo: function(width, height){
		this.currentElement.style.width = width;
		this.currentElement.style.height = height;
		this.maps[this.api].invalidateSize();
	},

	addControls: function(args) {
		var map = this.maps[this.api];
		if (args.zoom) {
			map.showZoomSlider();
		} else {
			map.hideZoomSlider();
		}
		if (args.map_type) {
			var basemapGallery = new esri.dijit.BasemapGallery({
				showArcGISBasemaps: true,
				map: map
			}, "basemapGallery");

			basemapGallery.startup();
		}
	},

	addSmallControls: function() {
		this.addControls({zoom: true, map_type: true});
	},

	addLargeControls: function() {
		throw 'Not implemented';
	},

	addMapTypeControls: function() {
		this.addControls({map_type: true});
	},

	setCenterAndZoom: function(point, zoom) { 
		var map = this.maps[this.api];
		var pt = point.toProprietary(this.api);
		// map.centerAndZoom(pt, zoom); 
	},
	
	addMarker: function(marker, old) {
		// var map = this.maps[this.api];
		// var pin = marker.toProprietary(this.api);
		// map.addLayer(pin);
		// this.features.push(pin);
		// return pin;
	},

	removeMarker: function(marker) {
		// var map = this.maps[this.api];
		// map.removeLayer(marker.proprietary_marker);
	},
	
	declutterMarkers: function(opts) {
		throw 'Not implemented';
	},

	addPolyline: function(polyline, old) {
		// var map = this.maps[this.api];
		// polyline = polyline.toProprietary(this.api);
		// map.addLayer(polyline);
		// this.features.push(polyline);
		// return polyline;
	},

	removePolyline: function(polyline) {
		// var map = this.maps[this.api];
		// map.removeLayer(polyline.proprietary_polyline);
	},

	getCenter: function() {
		var map = this.maps[this.api];
		var pt = map.getCenter();
		return new mxn.LatLonPoint(pt.lat, pt.lng);
	},

	setCenter: function(point, options) {
		var map = this.maps[this.api];
		var pt = point.toProprietary(this.api);
		map.centerAt(pt);
	},

	setZoom: function(zoom) {
		var map = this.maps[this.api];
		map.centerAndZoom(map.getCenter().toProprietary(this.api), zoom);
	},
	
	getZoom: function() {
		var map = this.maps[this.api];
		return map.getLevel();
	},

	getZoomLevelForBoundingBox: function(bbox) {
		var map = this.maps[this.api];
		var bounds = new L.LatLngBounds(
			bbox.getSouthWest().toProprietary(this.api),
			bbox.getNorthEast().toProprietary(this.api));
		return map.getBoundsZoom(bounds);
	},

	setMapType: function(type) {
		// switch(type) {
		// 	case mxn.Mapstraction.ROAD:
		// 		this.addTileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
		// 			name: "Roads",
		// 			attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">',
		// 			subdomains: [1,2,3,4]
		// 		});
		// 		this.currentMapType = mxn.Mapstraction.ROAD;
		// 		break;
		// 	case mxn.Mapstraction.SATELLITE:
		// 		this.addTileLayer('http://oatile{s}.mqcdn.com/naip/{z}/{x}/{y}.jpg', {
		// 			name: "Satellite",
		// 			attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">',
		// 			subdomains: [1,2,3,4]
		// 		});
		// 		this.currentMapType = mxn.Mapstraction.SATELLITE;
		// 		break;
		// 	case mxn.Mapstraction.HYBRID:
		// 		throw 'Not implemented';
		// 	default:
		// 		this.addTileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
		// 			name: "Roads",
		// 			attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">',
		// 			subdomains: [1,2,3,4]
		// 		});
		// 		this.currentMapType = mxn.Mapstraction.ROAD;
		// }
	},

	getMapType: function() {
		return this.currentMapType;
	},

	getBounds: function () {
		var map = this.maps[this.api];
		var box = map.extent;
		return new mxn.BoundingBox(box.ymin, box.xmin, box.ymax, box.xmax);
	},

	setBounds: function(bounds){
		var map = this.maps[this.api];
		var sw = bounds.getSouthWest().toProprietary(this.api);
		var ne = bounds.getNorthEast().toProprietary(this.api);
		var newBounds = new esri.geometry.Extent(sw.lon,sw.lat,ne.lon,ne.lat, new esri.SpatialReference({ wkid:4326 }));
		map.setExtent(newBounds); 
	},

	addImageOverlay: function(id, src, opacity, west, south, east, north) {
		throw 'Not implemented';
	},

	setImagePosition: function(id, oContext) {
		throw 'Not implemented';
	},
	
	addOverlay: function(url, autoCenterAndZoom) {
		throw 'Not implemented';
	},

	addTileLayer: function(tile_url, options) {
		// var layerName;
		// if (options && options.name) {
		// 	layerName = options.name;
		// 	delete options.name;
		// } else {
		// 	layerName = 'Tiles';
		// }
		// this.layers[layerName] = new L.TileLayer(tile_url, options || {});
		// var map = this.maps[this.api];
		// map.addLayer(this.layers[layerName]);
	},

	toggleTileLayer: function(tile_url) {
		throw 'Not implemented';
	},

	getPixelRatio: function() {
		throw 'Not implemented';
	},
	
	mousePosition: function(element) {
		throw 'Not implemented';
	},

	openBubble: function(point, content) {
		var map = this.maps[this.api];
		map.showInfoWindow(marker);
	},

	closeBubble: function() {
		var map = this.maps[this.api];
		map.hideInfoWindow();
	}
},

LatLonPoint: {
	
	toProprietary: function() {
		return new esri.geometry.Point(this.lon, this.lat, new esri.SpatialReference({ wkid: 4326 }));
	},

	fromProprietary: function(point) {
		this.lat = point.y;
		this.lon = point.x;
	}
	
},

Marker: {
	
	toProprietary: function() {
		var me = this;
		var thisIcon = L.Icon;
		if (me.iconUrl) {
			thisIcon = thisIcon.extend({
				iconUrl: me.iconUrl
			});
		}
		if (me.iconSize) {
			thisIcon = thisIcon.extend({
				iconSize: new L.Point(me.iconSize[0], me.iconSize[1])
			});
		}
		if (me.iconAnchor) {
			thisIcon = thisIcon.extend({
				iconAnchor: new L.Point(me.iconAnchor[0], me.iconAnchor[1])
			});
		}
		if (me.iconShadowUrl) {
			thisIcon = thisIcon.extend({
				shadowUrl: me.iconShadowUrl
			});
		}
		if (me.iconShadowSize) {
			thisIcon = thisIcon.extend({
				shadowSize: new L.Point(me.iconShadowSize[0], me.iconShadowSize[1])
			});
		}
		var iconObj = new thisIcon();
		var marker = new L.Marker(
			this.location.toProprietary('leaflet'),
			{ icon: iconObj }
		);
		(function(me, marker) {
			marker.on("click", function (e) {
				me.click.fire();
			});
		})(me, marker);
		return marker;
	},

	openBubble: function() {
		var pin = this.proprietary_marker;
		if (this.infoBubble) {
			map.infoWindow.show();
		}
	},
	
	closeBubble: function() {
		var pin = this.proprietary_marker;
		map.infoWindow.hide();

	},

	hide: function() {
		var map = this.mapstraction.maps[this.api];
		map.removeLayer(this.proprietary_marker);
	},

	show: function() {
		var map = this.mapstraction.maps[this.api];
		map.addLayer(this.proprietary_marker);
	},
	
	isHidden: function() {
		var map = this.mapstraction.maps[this.api];
		if (map.hasLayer(this.proprietary_marker)) {
			return false;
		} else {
			return true;
		}
	},

	update: function() {
		throw 'Not implemented';
	}
	
},

Polyline: {

	toProprietary: function() {
		var points = [];
		for (var i = 0,  length = this.points.length ; i< length; i++){
			points.push(this.points[i].toProprietary('leaflet'));
		}

		var polyOptions = {
			color: this.color || '#000000',
			opacity: this.opacity || 1.0, 
			weight: this.width || 3,
			fillColor: this.fillColor || '#000000'
		};

		if (this.closed) {
			return new L.Polygon(points, polyOptions);
		} else {
			return new L.Polyline(points, polyOptions);
		}
	},
	
	show: function() {
		this.map.addLayer(this.proprietary_polyline);
	},

	hide: function() {
		this.map.removeLayer(this.proprietary_polyline);
	},
	
	isHidden: function() {
		if (this.map.hasLayer(this.proprietary_polyline)) {
			return false;
		} else {
			return true;
		}
	}
}

});

