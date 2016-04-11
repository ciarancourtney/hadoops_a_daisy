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
                "title" : data.STATION_NAME,
                "start" : data.date,
                "options" : {
                "description" : "z: " + data.SNOW + "ele: " + data.ELEVATION
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







// We're going to define a new loader class extending the spreadsheet loader, which
// will do both the transformation and the consolidation by title in the preload
TimeMap.loaders.custom_gss = function(options) {
    var loader = new TimeMap.loaders.gss(options),
        extraColumns = options.extraColumns || [];

    // We want the transform function, but not as such;
    // save it under a different name and clear the function
    loader.oldTransform = loader.transform;
    loader.transform = function(data) { return data; };

    // Do both transform and consolidation in the preload function
    loader.preload = function(data) {
        // basic preload: get rows
        var rows = data.feed.entry,
            counties = {}, items = [],
            parser = TimeMap.dateParsers.hybrid,
            item, i;
        for (i=0; i < rows.length; i++) {
            // call the original loader transform to get the formatted object
            item = loader.oldTransform(rows[i]);
            // consolidate by title (county)
            if (!(item.title in counties)) {
                // make an EventIndex for the data
                item.options.dates = new SimileAjax.EventIndex(null);
                // add to county map
                counties[item.title] = item;
            }
            // save the data as a pseudo-event to the EventIndex
            // (have to wrap in an anonymous function to fix scope)
            (function(start) {
                var d = parser(start),
                    datapoint = {
                        // these functions are to make it behave like an event
                        getStart: function() {
                            return d;
                        },
                        getEnd: function() {
                            return d;
                        },
                        getID: function() {
                            return start;
                        }
                    };
                    // add the data we care about; assuming it's extraColumns
                    for (x=0; x < extraColumns.length; x++) {
                        paramName = extraColumns[x];
                        datapoint[paramName] = item.options[paramName];
                    }
                counties[item.title].options.dates.add(datapoint);
            })(item.start);
        }
        // turn the consolidated items into an array again
        for (i in counties) {
            if (counties.hasOwnProperty(i)) {
                item = counties[i];
                // while we're at it, let's turn this into a duration event
                item.start = item.options.dates.getEarliestDate();
                item.end = item.options.dates.getLatestDate();
                items.push(item);
            }
        }
        return items;
    }

    // return the customized loader
    return loader;
};

/**
 * Get the current data, by date, for a particular item.
 *
 * @param {Date} d      Current date
 * @return {Object}     Most recent data object for the current date
 */
TimeMapItem.prototype.getData = function(d) {
    // get center date if none is supplied
    d = d || this.dataset.timemap.timeline.getBand(0).getMaxVisibleDate(),
        dates = this.opts.dates;
    // look for the most recent data point in the past
    var iterator = dates.getReverseIterator(this.getStart(), d);
    if (!iterator.hasNext()) {
        // event only exists in the future
        return null;
    }
    return iterator.next();
};

/**
 * Make an array of scaled circle icons and add them to a theme
 *
 * @param {TimeMapTheme} theme      Theme to modify
 */
TimeMapTheme.addScaledIcons = function(theme) {
    var imgPath = theme.eventIconPath,
        icons = [], i,
        sizes = [4,5,7,10,13,16,20,23,26,28];
    // make icons
    for (i=0; i<sizes.length; i++) {
        icons.push(
            TimeMapTheme.getCircleUrl(sizes[i], theme.color, 'bb')
        );
    }
    // add to theme
    theme.scaledIcons = icons;
};

/**
 * Initialize the filter chain for the heatmap.
 */
TimeMap.prototype.initHeatmap = function() {
    // this function needs to be set in the timemap options;
    // it should take a data object and return a value 0-9
    var getScaleFromData = tm.opts.getScaleFromData;
    if (!getScaleFromData) return;

    // add heatmap filter chain
    tm.addFilterChain("heatmap",
        // true condition: change marker icon
        function(item) {
            var data = item.getData(),
                theme = item.opts.theme;
            if (data) {
                item.showPlacemark();
                var scale = getScaleFromData(data),
                    newIcon = theme.scaledIcons[scale];
                // note that this is specific to Google v3
                item.getNativePlacemark().setIcon(newIcon);
            } else {
                item.hidePlacemark();
            }
        },
        // false condition: do nothing
        function(item) { }
    );
    // filter: change icon if visible
    tm.addFilter("heatmap", function(item) {
        return item.placemarkVisible;
    });
    // add listener for filter chain
    tm.timeline.getBand(0).addOnScrollListener(function() {
        tm.filter("heatmap");
    });
};

var tm;
$(function() {
    // make the theme
    var theme = TimeMapTheme.createCircleTheme();
    TimeMapTheme.addScaledIcons(theme);
    theme.icon = theme.scaledIcons[0];

    tm = TimeMap.init({
        mapId: "map",               // Id of map div element (required)
        timelineId: "timeline",     // Id of timeline div element (required)
        options: {
            theme: theme,
            getScaleFromData: function(data) {
                return (data["log1.6"] > 9) ? 9 : parseInt(data["log1.6"]);
            },
            mapFilter: "hideFuture",
            // there isn't going to be a good way to show 139 duration events on the timeline
            noEventLoad: true
        },
        datasets: [
            {
                title: "Events",
                id: "events",
                type: "custom_gss",
                options: {
                    // note that your spreadsheet must be published for this to work
                    key: "tnobdBZ6zvWAWVZEW-uBW1Q",
                    // map spreadsheet column names to expected ids
                    paramMap: {
                        start: "year"
                    },
                    // load extra data from non-standard spreadsheet columns
                    extraColumns: [
                        "count",
                        "cumulative",
                        "log1.6"
                    ],
                    openInfoWindow: function() {
                        var item = this,
                            data = item.getData();
                        item.opts.infoHtml = '<div class="infotitle">' + item.getTitle() + '</div>';
                        if (data) {
                            item.opts.infoHtml += '<div class="itemdata">'
                                + '<p><em>Year: </em>' + data.getID() + '</p>'
                                + '<p><em>Deaths: </em>' + data.count + '</p>'
                                + '<p><em>Cumulative: </em>' + data.cumulative + '</p>'
                                + '<div>';
                        }
                        // use basic window opener
                        TimeMapItem.openInfoWindowBasic.call(item);
                    }
                }
            }
        ],
        // lay out timeline for a thin navigational display
        bandInfo: [
            {
                width:          "60%",
                intervalUnit:   Timeline.DateTime.YEAR,
                intervalPixels: 70
            },
            {
                width:          "40%",
                intervalUnit:   Timeline.DateTime.DECADE,
                intervalPixels: 160
            }
        ],
        // set up filter once the timeline is loaded
        dataDisplayedFunction: function(tm) {
            tm.initHeatmap();
            tm.filter("heatmap");
        },
        // we aren't loading the items, so we need to set this manually
        scrollTo: '1969'
    });
});

