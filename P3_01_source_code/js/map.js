class MapWrapper {
    constructor() {
        mapboxgl.accessToken =  mapAccessToken
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
        if(window.innerWidth >= maxMobileWidth) { // if width is lower or equal to number, disable zoom if mobile.do
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
 
    // if pin = 0 hide sign up form, let message show ( no bikes available for reservation)


}
