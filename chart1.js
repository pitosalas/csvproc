google.load('visualization', '1', {
  packages: ['corechart', 'line']
});
google.setOnLoadCallback(drawLogScales);

function drawLogScales() {
  var data = new google.visualization.DataTable();
  data.addColumn('date', 'X');
  data.addColumn('number', 'Best practices in Software Engineering');
  data.addColumn('number', 'Object oriented design');
  data.addColumn('number', 'Test Driven Design');
  data.addColumn('number', 'Refactoring');
  data.addColumn('number', 'Architectural concepts for achieving scale');
  data.addColumn('number', 'Caching as a critical strategy for scale');
  data.addColumn('number', 'Load testing of web applications');
  data.addColumn('number', 'Application performance analysis');
  data.addColumn('number', 'How to write excellent Ruby');
  data.addColumn('number', 'How to write and deploy a Sinatra application');
  data.addColumn('number', 'Deploying to the cloud (e.g. Heroku)');
  data.addColumn('number', 'Generate and a load and analyze performance');

  data.addRows([
    [new Date(2015, 1, 11), 2.310344827586207, 2.8620689655172415, 1.793103448275862, 2.1379310344827585, 1, 1.0689655172413792, 0.9310344827586207, 1.206896551724138, 2.310344827586207, 1.6206896551724137, 1.6896551724137931, 0.8620689655172413],
    [new Date(2015, 2, 18), 2.1666666666666665, 2.7083333333333335, 1.6666666666666667, 1.9583333333333333, 1.4583333333333333, 1.4583333333333333, 1.4583333333333333, 1.25, 2.2916666666666665, 2.5833333333333335, 1.75, 0.9583333333333334],
    [new Date(2015, 3, 22), 2.769230769230769, 3.0384615384615383, 2.423076923076923, 2.3076923076923075, 2.3076923076923075, 2.3846153846153846, 2.6923076923076925, 2.4615384615384617, 2.8076923076923075, 3.0384615384615383, 2.730769230769231, 2.6538461538461537],
  ]);

  var options = {
    chartArea: {
      left: "20%",
      top: '10%',
      width: '55%',
      height: '70%'
    },
    hAxis: {
      title: 'Survey Number',
      ticks: [new Date(2015, 1, 1), new Date(2015, 2, 1), new Date(2015, 3, 1), new Date(2015, 4, 1), ],
      gridlines: {
        color: 'none'
      }
    },
    vAxis: {
      ticks: [{
        v: 0,
        f: ""
      }, {
        v: 1,
        f: "At a loss to explain it..."
      }, {
        v: 2,
        f: "Have a vague sense..."
      }, {
        v: 3,
        f: "Pretty good handle on it..."
      }, {
        v: 4,
        f: "Confident that I understand it..."
      }, {
        v: 5,
        f: "Feel pretty expert at it..."
      }, {
        v: 5,
        f: ""
      }],
      minorGridlines: {
        count: 1,
        color: '#DCDCDC'
      },
      gridlines: {
        count: -1,
        color: '#DCDCDC'
      },
      title: 'Mastery',
      width: '100%',
      height: '100%'
    },
    width: 1200,
    height: 800
  };

  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}
