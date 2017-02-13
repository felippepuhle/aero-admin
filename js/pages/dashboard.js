(function ($) {

    /* ------------------- *
     * Generate line chart *
     * ------------------- */
    function generateLineChartFor(divId) {
        // Generate random data
        var generateRandomData = function(minValue, maxValue, count) {
            minValue = minValue || 0;
            maxValue = maxValue || 100;
            count = count || 10;

            var randomData = [];

            var todayDate = new Date();
            var oneDayMS = 24 * 60 * 60 * 1000;

            for(var i = 0; i<count; i++) {
                randomData.push({
                    'date': new Date(todayDate.getTime() - (oneDayMS * i)),
                    'value': Math.floor((Math.random() * maxValue) + minValue)
                });
            }   

            return randomData.reverse(); 
        };

        // Generate chart
        var chart = AmCharts.makeChart(divId, {
            'type': 'serial',
            'theme': 'light',
            'dataProvider': generateRandomData(),
            'graphs': [{
                'id':'g1',
                'balloonText': '[[category]] | <b>[[value]]</b>',
                'bullet': 'round',
                'bulletSize': 8,         
                'lineColor': '#fff',
                'lineThickness': 2,
                'negativeLineColor': '#fff',
                'type': 'smoothedLine',
                'valueField': 'value'
            }],
            'chartCursor': {
                'categoryBalloonEnabled': false, 
                'cursorAlpha': 0,
                'fullWidth':true
            },
            'categoryField': 'date',
            'categoryAxis': {
                'parseDates': true,
                'axisAlpha': 0,
                'gridAlpha': 0,
                'labelsEnabled': false
            },
            'valueAxes': [{
                'axisAlpha': 0,
                'gridAlpha': 0,
                'labelsEnabled': false
            }]
        });

        // Baloon options
        var balloon = chart.balloon;
        balloon.color = '#464646';
    }


    /* ------------------ *
     * Generate bar chart *
     * ------------------ */
    function generateBarChartFor(divId) {
        // Generate random data
        var generateRandomData = function(minValue, maxValue, count) {
            minValue = minValue || 0;
            maxValue = maxValue || 100;
            count = count || 10;

            var randomData = [];

            var todayDate = new Date();
            var oneDayMS = 24 * 60 * 60 * 1000;

            for(var i = 0; i<count; i++) {
                randomData.push({
                    'date': new Date(todayDate.getTime() - (oneDayMS * i)),
                    'computers': Math.floor((Math.random() * maxValue) + minValue),
                    'printers': Math.floor((Math.random() * maxValue) + minValue),
                    'cellphones': Math.floor((Math.random() * maxValue) + minValue)
                });
            }   

            return randomData.reverse(); 
        };

        // Generate column config
        var generateColumnConfig = function(key, title, color) {
            return {
                'balloonText': '[[category]] | <b>[[value]]</b>',
                'fillAlphas': 0.8,
                'labelText': '',
                'lineAlpha': 0.3,
                'title': title,
                'type': 'column',
                'color': color,
                'valueField': key
            };
        };

        // Generate chart
        var chart = AmCharts.makeChart(divId, {
            'type': 'serial',
            'theme': 'light',
            'legend': {
                'fontSize': 12,
                'color': '#464646', 
                'align': 'center',
                'position': 'top',
                'markerType': 'circle',
                'switchType': ''
            },
            'dataProvider': generateRandomData(),
            'valueAxes': [{
                'color': '#464646', 
                'stackType': 'regular',
                'axisAlpha': 0,
                'gridAlpha': 0.05
            }],
            'graphs': [
                generateColumnConfig('computers', 'Computers', '#000'),
                generateColumnConfig('printers', 'Printers', '#000'),
                generateColumnConfig('cellphones', 'Cell phones', '#000'),
            ],
            'categoryField': 'date',
            'categoryAxis': {
                'color': '#464646', 
                'parseDates': true,
                'gridPosition': 'start',
                'axisAlpha': 0,
                'gridAlpha': 0,
                'position': 'left'
            }
        });

        // Baloon options
        var balloon = chart.balloon;
        balloon.color = '#464646';
    }


    /* -------------------------- *
     * Generate server stat chart *
     * -------------------------- */
    function generateServerStatFor(divId) {
        var chart = AmCharts.makeChart(divId, {
              "theme": "light",
              "type": "gauge",
              "color": "#737373",
              "axes": [{
                "axisThickness": 1,
                "axisAlpha": 0.1,
                "tickAlpha": 0.1,
                "endValue": 100,
                "valueInterval": 20,
                "inside": false,
                "bands": [
                    {
                      "color": "#66BB6A",
                      "startValue": 0,
                      "endValue": 50
                    }, {
                      "color": "#ffeb3b",
                      "startValue": 50,
                      "endValue": 75
                    }, {
                      "color": "#EF5350",
                      "startValue": 75,
                      "endValue": 100
                    }
                ],
                "bottomText": $('#' + divId).data('title'),
                "bottomTextYOffset": 15
            }],
            "arrows": [
                {
                    "id": "arrow-" + divId,
                    "startWidth": 4, 
                    "color": "#737373",
                    "radius": "85%",
                    "innerRadius": 0,
                    "nailAlpha": 1, 
                    "nailColor": "#737373",
                    "nailRadius": 4, 
                    "borderAlpha": 0
                }
            ]
        });

        updateServerStatFor(chart);
    };
    function updateServerStatFor(chart) {
        var arrow = chart.arrows[0];
        var randomValue = Math.round(Math.random() * 100);
        var timeoutSeconds = 100;

        if(arrow.setValue){
            arrow.setValue(randomValue);
            timeoutSeconds = 3000;
        }

        setTimeout(function() { updateServerStatFor(chart); }, timeoutSeconds);
    }


    /* -------- *
     * DOM LOAD *
     * -------- */
    $(document).ready(function() {
        generateLineChartFor('chartSalesperDay');
        generateLineChartFor('chartCustomersPerDay');
        generateLineChartFor('chartNewsletterSignups');

        generateBarChartFor('chartTotalSales');

        generateServerStatFor('chartServerCpu');
        generateServerStatFor('chartServerMemory');
        generateServerStatFor('chartServerHd');
    });
    
}(jQuery));