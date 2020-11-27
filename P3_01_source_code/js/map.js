class MapWrapper {
    constructor() {
        mapboxgl.accessToken = mapAccessToken
        this.map = new mapboxgl.Map({
            container: 'map',
            style: mapStyle,
            center: [4.360625, 50.873156],
            zoom: 10
        });
        // Add zoom and rotation controls to the map.
        this.map.addControl(new mapboxgl.NavigationControl());

        // map not to zoom while scrolling

        var maxMobileWidth = 768;
        if (window.innerWidth >= maxMobileWidth) { // if width is lower or equal to number, disable zoom if mobile.do
            this.map.scrollZoom.disable();
        }
    }
    onClick(event) {
        // $("#boutonAnnuler").css("display", "none");

        var features = this.map.queryRenderedFeatures(event.point); // find features at coordinates
        var feature = features[0]; // select first feature
        var available_bikes = feature.properties.available_bikes;

        // if the bikes are more than 0 show details 
        if (available_bikes > 0) {

            $(".station-info p").css("display", "block");
            $(".informations").css("display", "block");
            $(".info_text").css("display", "none");
            $(".station-info").css("display", "block");

            var status = feature.properties.status;
            $('#status').html(status);

            var name = feature.properties.name;
            $('#name').html(name);

            var address = feature.properties.address;
            $('#station_address').html(address);

            var available_bike_stands = feature.properties.available_bike_stands; // access marker properties
            $('#available_bike_stands').html(available_bike_stands); // update html

            $('#available_bikes').html(available_bikes);

            $(".informations").css("display", "block");

            $(".noreserve_info").css("display", "none");
        }
        // if not do not show details
        else {
            alert("No Bicycle available for reservation")
        }

        $('#instructions').hide();

    };
    // wait for map to be loaded
    onload(stations) {
        // add stations to source
        var featuresList = []; // empty array of features
        // for each station
        stations.forEach(function (station) {
            // add station to features
            featuresList.push({
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [station.position.lng, station.position.lat,]
                },
                "properties": {
                    "number": station.number,
                    "name": station.name,
                    "address": station.address,
                    "bike_stands": station.bike_stands,
                    "available_bike_stands": station.available_bike_stands,
                    "available_bikes": station.available_bikes,
                    "available_bikes_str": String(station.available_bikes),
                    "status": station.status,
                }

            });
        });

        var geojson = {
            "type": "FeatureCollection",
            "features": featuresList,
        };
        this.map.addSource("bikes", {
            "cluster": true,
            "clusterRadius": 50,
            "clusterMaxZoom": 14,
            "type": "geojson",
            "data": geojson,
        });

        this.map.addLayer({
            "id": "locations",
            "type": "symbol",
            source: "bikes",
            filter: ['!', ['has', 'point_count']],
            "layout": {
                // "icon-image": "bicycle-15",
                'icon-image': ['match', ['get', 'available_bikes_str'], '0', 'bike-pin-red', '1', 'bike-pin-orange', '2', 'bike-pin-orange', '3', 'bike-pin-orange', 'bike-pin-green'],
                "icon-allow-overlap": true,
            }
        });
        this.map.addLayer({
            "id": "bikelocationscluster",
            "type": "circle",
            source: "bikes",
            filter: ["has", "point_count"],
            paint: {

                //   * teal, 15px circles when point count is above 52
                //   * Yellow, 3px circles when point count is between 27 and 23
                //   * orange when its below 23.
                'circle-color': [
                    'step',
                    ['get', 'point_count'],

                    "#e39f20",
                    23,
                    '#f1f075',
                    36,
                    '#008080',
                    750,
                    '#f28cb1'
                ],
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    15,
                    23,
                    36,
                    750,
                    40
                ]
            }

        });

        this.map.addLayer({
            id: 'cluster-count',
            type: 'symbol',
            source: "bikes",
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
            }
        });
        // add geojson to source, see mapbox documentation
        // link source to layer and add layer to map, see mapbox documentation
    }
}
