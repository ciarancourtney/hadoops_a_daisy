var tm
$(function() {
    TimeMap.loaders.custom = function(options) {
        var loader = new TimeMap.loaders.remote(options);
        loader.parse = JSON.parse;
        loader.preload = function(data) {
            return data['limitSortedInput']
        }
        loader.transform = function(data) {
            return {
                "title" : "Station ID: " + data.id,
                "start" : data.date,
                "options" : {
                "description" : "Temp: " + data.temp + "°C"
                },
            "point": {
                "lat" : data.lat,
                "lon" : data.lon,
                }
            };
        };
        return loader;
    };

    tm = TimeMap.init({
        mapId: "map",               // Id of map div element (required)
        timelineId: "timeline",     // Id of timeline div element (required)
        options: {
            eventIconPath: "../images/"
        },
        datasets: [
            {
                type: "custom",
                options: {
                    url: "output_json/part-r-00000"
                }
            }
        ],
     bandIntervals: [
            Timeline.DateTime.DAY,
            Timeline.DateTime.WEEK
        ]
    });
});