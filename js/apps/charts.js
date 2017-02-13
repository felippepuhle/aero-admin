(function ($) {

    /* ----------- *
     * Google Maps *
     * ----------- */
    var startGoogleCharts = function() {
     	google.charts.load('current', {'packages':['corechart', 'bar']});

     	google.charts.setOnLoadCallback(function() {
     		drawGoogleColumnChart();
     		drawGoogleBarChart();
            drawGoogleAreaChart();
            drawGoogleLineChart();
            drawGooglePieChart();
     	});

    };

    var drawGoogleColumnChart = function() {
    	var data = new google.visualization.DataTable();
    	data.addColumn('timeofday', 'Time of Day');
    	data.addColumn('number', 'Motivation Level');
    	data.addColumn('number', 'Energy Level');

    	data.addRows([
    		[{v: [8, 0, 0], f: '8 am'}, 1, .25],
    		[{v: [9, 0, 0], f: '9 am'}, 2, .5],
    		[{v: [10, 0, 0], f:'10 am'}, 3, 1],
    		[{v: [11, 0, 0], f: '11 am'}, 4, 2.25],
    		[{v: [12, 0, 0], f: '12 pm'}, 5, 2.25],
    		[{v: [13, 0, 0], f: '1 pm'}, 6, 3],
    		[{v: [14, 0, 0], f: '2 pm'}, 7, 4],
    		[{v: [15, 0, 0], f: '3 pm'}, 8, 5.25],
    		[{v: [16, 0, 0], f: '4 pm'}, 9, 7.5],
    		[{v: [17, 0, 0], f: '5 pm'}, 10, 10],
    		]);

    	var options = {
    		title: 'Motivation and Energy Level Throughout the Day',
    		isStacked: true,
    		hAxis: {
    			title: 'Time of Day',
    			format: 'h:mm a',
    			viewWindow: {
    				min: [7, 30, 0],
    				max: [17, 30, 0]
    			}
    		},
    		vAxis: {
    			title: 'Rating (scale of 1-10)'
    		}
    	};

    	var chart = new google.visualization.ColumnChart(document.getElementById('gchart-column'));
    	chart.draw(data, options);
    };

    var drawGoogleBarChart = function() {
    	var data = google.visualization.arrayToDataTable([
    		['City', '2010 Population', '2000 Population'],
    		['New York City, NY', 8175000, 8008000],
    		['Los Angeles, CA', 3792000, 3694000],
    		['Chicago, IL', 2695000, 2896000],
    		['Houston, TX', 2099000, 1953000],
    		['Philadelphia, PA', 1526000, 1517000]
    		]);

    	var options = {
    		chart: {
    			title: 'Population of Largest U.S. Cities',
    			subtitle: 'Based on most recent and previous census data'
    		},
    		hAxis: {
    			title: 'Total Population'
    		},
    		vAxis: {
    			title: 'City'
    		},
    		bars: 'horizontal',
    		series: {
    			0: {axis: '2010'},
    			1: {axis: '2000'}
    		},
    		axes: {
    			x: {
    				2010: {label: '2010 Population (in millions)', side: 'top'},
    				2000: {label: '2000 Population'}
    			}
    		}
    	};

    	var material = new google.charts.Bar(document.getElementById('gchart-bar'));
    	material.draw(data, options);
    };

    var drawGoogleAreaChart = function() {
        var data = google.visualization.arrayToDataTable([
            ['Year', 'Sales', 'Expenses'],
            ['2013',  1000, 400],
            ['2014',  1170, 460],
            ['2015',  660, 1120],
            ['2016',  1030, 540]
            ]);

        var options = {
            title: 'Company Performance',
            hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
            vAxis: {minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('gchart-area'));
        chart.draw(data, options);
    };

    var drawGoogleLineChart = function() {
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'X');
        data.addColumn('number', 'Dogs');

        data.addRows([
            [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
            [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
            [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
            [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
            [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
            [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
            [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
            [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
            [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
            [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
            [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
            [66, 70], [67, 72], [68, 75], [69, 80]
            ]);

        var options = {
            hAxis: {
                title: 'Time'
            },
            vAxis: {
                title: 'Popularity'
            }
        };

        var chart = new google.visualization.LineChart(document.getElementById('gchart-line'));
        chart.draw(data, options);
    };

    var drawGooglePieChart = function() {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work', 11],
          ['Eat', 2],
          ['Commute', 2],
          ['Watch TV', 2],
          ['Sleep', 7]
        ]);

        var options = {
          title: 'My Daily Activities'
        };

        var chart = new google.visualization.PieChart(document.getElementById('gchart-pie'));

        chart.draw(data, options);
    };


    /* -------- *
     * AmCharts *
     * -------- */
    var startAmCharts = function() {
        drawAmColumnChart();
        drawAmBarChart();
        drawAmAreaChart();
        drawAmLineChart();
        drawAmPieChart();
    };

    var drawAmColumnChart = function() {
        AmCharts.makeChart("amchart-column", {
            "type": "serial",
            "theme": "light",
            "dataProvider": [ {
                "country": "USA",
                "visits": 2025
            }, {
                "country": "China",
                "visits": 1882
            }, {
                "country": "Japan",
                "visits": 1809
            }, {
                "country": "Germany",
                "visits": 1322
            }, {
                "country": "UK",
                "visits": 1122
            }, {
                "country": "France",
                "visits": 1114
            }, {
                "country": "India",
                "visits": 984
            }, {
                "country": "Spain",
                "visits": 711
            }, {
                "country": "Netherlands",
                "visits": 665
            }, {
                "country": "Russia",
                "visits": 580
            }, {
                "country": "South Korea",
                "visits": 443
            }, {
                "country": "Canada",
                "visits": 441
            }, {
                "country": "Brazil",
                "visits": 395
            } ],
            "valueAxes": [ {
                "gridColor": "#FFFFFF",
                "gridAlpha": 0.2,
                "dashLength": 0
            } ],
            "gridAboveGraphs": true,
            "startDuration": 1,
            "graphs": [ {
                "balloonText": "[[category]]: <b>[[value]]</b>",
                "fillAlphas": 0.8,
                "lineAlpha": 0.2,
                "type": "column",
                "valueField": "visits"
            } ],
            "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "country",
            "categoryAxis": {
                "gridPosition": "start",
                "gridAlpha": 0,
                "tickPosition": "start",
                "tickLength": 20
            },
            "export": {
                "enabled": true
            }

        } );
    };

    var drawAmBarChart = function() {
        AmCharts.makeChart("amchart-bar", {
            "type": "serial",
            "theme": "light",
            "categoryField": "year",
            "rotate": true,
            "startDuration": 1,
            "categoryAxis": {
                "gridPosition": "start",
                "position": "left"
            },
            "trendLines": [],
            "graphs": [
            {
                "balloonText": "Income:[[value]]",
                "fillAlphas": 0.8,
                "id": "AmGraph-1",
                "lineAlpha": 0.2,
                "title": "Income",
                "type": "column",
                "valueField": "income"
            },
            {
                "balloonText": "Expenses:[[value]]",
                "fillAlphas": 0.8,
                "id": "AmGraph-2",
                "lineAlpha": 0.2,
                "title": "Expenses",
                "type": "column",
                "valueField": "expenses"
            }
            ],
            "guides": [],
            "valueAxes": [
            {
                "id": "ValueAxis-1",
                "position": "top",
                "axisAlpha": 0
            }
            ],
            "allLabels": [],
            "balloon": {},
            "titles": [],
            "dataProvider": [
            {
                "year": 2005,
                "income": 23.5,
                "expenses": 18.1
            },
            {
                "year": 2006,
                "income": 26.2,
                "expenses": 22.8
            },
            {
                "year": 2007,
                "income": 30.1,
                "expenses": 23.9
            },
            {
                "year": 2008,
                "income": 29.5,
                "expenses": 25.1
            },
            {
                "year": 2009,
                "income": 24.6,
                "expenses": 25
            }
            ],
            "export": {
                "enabled": true
            }

        })
    };

    var drawAmAreaChart = function() {
        AmCharts.makeChart("amchart-area", {
            "type": "serial",
            "theme": "light",
            "marginRight":30,
            "legend": {
                "equalWidths": false,
                "periodValueText": "total: [[value.sum]]",
                "position": "top",
                "valueAlign": "left",
                "valueWidth": 100
            },
            "dataProvider": [{
                "year": 1994,
                "cars": 1587,
                "motorcycles": 650,
                "bicycles": 121
            }, {
                "year": 1995,
                "cars": 1567,
                "motorcycles": 683,
                "bicycles": 146
            }, {
                "year": 1996,
                "cars": 1617,
                "motorcycles": 691,
                "bicycles": 138
            }, {
                "year": 1997,
                "cars": 1630,
                "motorcycles": 642,
                "bicycles": 127
            }, {
                "year": 1998,
                "cars": 1660,
                "motorcycles": 699,
                "bicycles": 105
            }, {
                "year": 1999,
                "cars": 1683,
                "motorcycles": 721,
                "bicycles": 109
            }, {
                "year": 2000,
                "cars": 1691,
                "motorcycles": 737,
                "bicycles": 112
            }, {
                "year": 2001,
                "cars": 1298,
                "motorcycles": 680,
                "bicycles": 101
            }, {
                "year": 2002,
                "cars": 1275,
                "motorcycles": 664,
                "bicycles": 97
            }, {
                "year": 2003,
                "cars": 1246,
                "motorcycles": 648,
                "bicycles": 93
            }, {
                "year": 2004,
                "cars": 1318,
                "motorcycles": 697,
                "bicycles": 111
            }, {
                "year": 2005,
                "cars": 1213,
                "motorcycles": 633,
                "bicycles": 87
            }, {
                "year": 2006,
                "cars": 1199,
                "motorcycles": 621,
                "bicycles": 79
            }, {
                "year": 2007,
                "cars": 1110,
                "motorcycles": 210,
                "bicycles": 81
            }, {
                "year": 2008,
                "cars": 1165,
                "motorcycles": 232,
                "bicycles": 75
            }, {
                "year": 2009,
                "cars": 1145,
                "motorcycles": 219,
                "bicycles": 88
            }, {
                "year": 2010,
                "cars": 1163,
                "motorcycles": 201,
                "bicycles": 82
            }, {
                "year": 2011,
                "cars": 1180,
                "motorcycles": 285,
                "bicycles": 87
            }, {
                "year": 2012,
                "cars": 1159,
                "motorcycles": 277,
                "bicycles": 71
            }],
            "valueAxes": [{
                "stackType": "regular",
                "gridAlpha": 0.07,
                "position": "left",
                "title": "Traffic incidents"
            }],
            "graphs": [{
                "balloonText": "<img src='http://www.amcharts.com/lib/3/images/car.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>[[value]]</b></span>",
                "fillAlphas": 0.6,
                "hidden": true,
                "lineAlpha": 0.4,
                "title": "Cars",
                "valueField": "cars"
            }, {
                "balloonText": "<img src='http://www.amcharts.com/lib/3/images/motorcycle.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>[[value]]</b></span>",
                "fillAlphas": 0.6,
                "lineAlpha": 0.4,
                "title": "Motorcycles",
                "valueField": "motorcycles"
            }, {
                "balloonText": "<img src='http://www.amcharts.com/lib/3/images/bicycle.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>[[value]]</b></span>",
                "fillAlphas": 0.6,
                "lineAlpha": 0.4,
                "title": "Bicycles",
                "valueField": "bicycles"
            }],
            "plotAreaBorderAlpha": 0,
            "marginTop": 10,
            "marginLeft": 0,
            "marginBottom": 0,
            "chartScrollbar": {},
            "chartCursor": {
                "cursorAlpha": 0
            },
            "categoryField": "year",
            "categoryAxis": {
                "startOnAxis": true,
                "axisColor": "#DADADA",
                "gridAlpha": 0.07,
                "title": "Year",
                "guides": [{
                    category: "2001",
                    toCategory: "2003",
                    lineColor: "#CC0000",
                    lineAlpha: 1,
                    fillAlpha: 0.2,
                    fillColor: "#CC0000",
                    dashLength: 2,
                    inside: true,
                    labelRotation: 90,
                    label: "fines for speeding increased"
                }, {
                    category: "2007",
                    lineColor: "#CC0000",
                    lineAlpha: 1,
                    dashLength: 2,
                    inside: true,
                    labelRotation: 90,
                    label: "motorcycle fee introduced"
                }]
            },
            "export": {
                "enabled": true
            }
        });
    };

    var drawAmLineChart = function() {
        var generateChartData = function() {
            var chartData = [];
            var firstDate = new Date();
            firstDate.setDate(firstDate.getDate() - 150);

            for (var i = 0; i < 150; i++) {
                var newDate = new Date(firstDate);
                newDate.setDate(newDate.getDate() + i);

                var visits = Math.round(Math.random() * 100 - 50);

                chartData.push({
                    date: newDate,
                    visits: visits
                });
            }
            return chartData;
        };

        chartData = generateChartData();

        var chart = AmCharts.makeChart("amchart-line", {
            "theme": "light",
            "type": "serial",
            "marginRight": 80,
            "autoMarginOffset": 20,    
            "marginTop":20,
            "dataProvider": chartData,
            "valueAxes": [{
                "id": "v1",
                "axisAlpha": 0.1
            }],
            "graphs": [{
                "useNegativeColorIfDown": true,
                "balloonText": "[[category]]<br><b>value: [[value]]</b>",
                "bullet": "round",
                "bulletBorderAlpha": 1,
                "bulletBorderColor": "#FFFFFF",
                "hideBulletsCount": 50,
                "lineThickness": 2,
                "lineColor": "#fdd400",
                "negativeLineColor": "#67b7dc",
                "valueField": "visits"
            }],
            "chartScrollbar": {
                "scrollbarHeight": 5,
                "backgroundAlpha": 0.1,
                "backgroundColor": "#868686",
                "selectedBackgroundColor": "#67b7dc",
                "selectedBackgroundAlpha": 1
            },
            "chartCursor": {
                "valueLineEnabled": true,
                "valueLineBalloonEnabled": true
            },
            "categoryField": "date",
            "categoryAxis": {
                "parseDates": true,
                "axisAlpha": 0,
                "minHorizontalGap": 60
            },
            "export": {
                "enabled": true
            }
        });

        chart.addListener("dataUpdated", function() {
            if (chart.zoomToIndexes) {
                chart.zoomToIndexes(130, chartData.length - 1);
            }
        });
    };

    var drawAmPieChart = function() {
        AmCharts.makeChart("amchart-pie", {
            "type": "pie",
            "theme": "light",
            "dataProvider": [ {
                "country": "Lithuania",
                "litres": 501.9
            }, {
                "country": "Czech Republic",
                "litres": 301.9
            }, {
                "country": "Ireland",
                "litres": 201.1
            }, {
                "country": "Germany",
                "litres": 165.8
            }, {
                "country": "Australia",
                "litres": 139.9
            }, {
                "country": "Austria",
                "litres": 128.3
            }, {
                "country": "UK",
                "litres": 99
            }, {
                "country": "Belgium",
                "litres": 60
            }, {
                "country": "The Netherlands",
                "litres": 50
            } ],
            "valueField": "litres",
            "titleField": "country",
            "balloon":{
                "fixedPosition":true
            },
            "export": {
                "enabled": true
            }
        });
    };


    /* -------- *
     * DOM LOAD *
     * -------- */
    $(document).ready(function() {
        // Google Charts
    	startGoogleCharts();

        // AmCharts
        startAmCharts();
    });

 }(jQuery));