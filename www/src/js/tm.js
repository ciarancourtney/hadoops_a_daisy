var tm;
$(function() {

    tm = TimeMap.init({
        mapId: "map",               // Id of map div element (required)
        timelineId: "timeline",     // Id of timeline div element (required)
        options: {
            eventIconPath: "images/"
        },
        datasets: [
            {
                title: "Events",
                id: "events",
                theme: "purple",
                type: "gss",
                options: {
                    // note that your spreadsheet must be published for this to work
                    key: "1ebvs1xT1L8BcOj5iMCaT9awV5hRHnJSlQzxopDzNmZw",
                    // map spreadsheet column names to expected ids
                    paramMap: {
                        start: "date"
                    }
                }
            }
        ],
        bandIntervals: [
            Timeline.DateTime.WEEK,
            Timeline.DateTime.MONTH
        ]
    });
});