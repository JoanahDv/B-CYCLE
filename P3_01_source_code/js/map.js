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

        var canvas_signature = $("#canvas");
        var canvas_info = $(".canvas_info");
        var action_clear = $("#buttonclear");
        var action_save = $("#buttonsave");
        var action_cancel= $("#buttoncancel");

        var features = this.map.queryRenderedFeatures(event.point); // find features at coordinates
        //  
        $(".station-info p").css("display", "block");
        $(".informations").css("display", "block");
        $(".info_text").css("display", "none");
        $(".station-info").css("display", "block");
        
        var feature = features[0]; // select first feature
        var status = feature.properties.status;
        $('#status').html(status);

        var name = feature.properties.name;
        $('#name').html(name);

        var address = feature.properties.address;
        $('#station_address').html(address);

        var available_bike_stands = feature.properties.available_bike_stands; // access marker properties
        $('#available_bike_stands').html(available_bike_stands); // update html

        var available_bikes = feature.properties.available_bikes;
        $('#available_bikes').html(available_bikes); 

        $(".informations").css("display", "block");

        $(".noreserve_info").css("display", "none");

        canvas_signature.hide();
        canvas_info.hide();
        action_clear.hide();
        action_save.hide();
        action_cancel.hide();

    }
}
