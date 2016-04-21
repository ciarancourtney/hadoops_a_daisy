var tm
$(function() {
    TimeMap.loaders.custom = function(options) {
        var loader = new TimeMap.loaders.remote(options);
        loader.parse = JSON.parse;
        loader.preload = function(data) {
            return data
        }
        loader.transform = function(data) {
            return {
                "title" : data[0],  // STATION_NAME
                "start" : data[1],  // date
                "options" : {
                "description" : "Snow (mm): " + data[2] + "  elev (m): " + data[3] + " lat: " + data[4] + " lon: " + data[5]
                },
            "point": {
                "lat" : data[4],
                "lon" : data[5],
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
                    url: "output_json_spark/output.json"
                }
            }
        ],
     bandIntervals: [
            Timeline.DateTime.DAY,
            Timeline.DateTime.WEEK
        ]
    });
});