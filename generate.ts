import fs = require('fs');
import { Project } from './project';

export class Generate {
  constructor(public proj: Project, public name: string) {
  }

  saveFiles(): void {
    fs.writeFileSync("./" + this.name + ".js", this.chartJSFileContents());
    fs.writeFileSync("./" + this.name + ".html", this.chartHtmlFileContents());
  }

  generateDataColumns(): string {
    /* generate one of these rows for each question.
      data.addColumn('number', 'Object Oriented Design');
      data.addColumn('number', 'Source Control');
      data.addColumn('number', 'Ruby on Rails');
      data.addColumn('number', 'Debugging');
    */
    var result = "";
    for (var question of this.proj.questions) {
      result += `data.addColumn('number', '${question}');`
    }
    return result;
  }

  generateTicValues(): string {
    /* Generate one of these rows for each desired horizontal tic, e.g.
      new Date(2015, 1, 11),
      new Date(2015, 2, 11),
      new Date(2015, 3, 11),
      new Date(2015, 4, 11),
      new Date(2015, 5, 11),
      new Date(2015, 6, 11)*/
    var result = "";
    for (var month of this.proj.getSurveyMonths()) {
      result += `new Date(${month.getFullYear() }, ${month.getMonth() }, 1),`
    }
    return result;
  }

  generateResponses(): string {
    /* Generate one of these rows for each question in the survey
    {v: 0, f: ""},
    {v: 1, f: "No idea"},
    {v: 2, f: "Can guess"},
    {v: 3, f: "Studied it"},
    {v: 4, f: "understand it"},
    {v: 5, f: "An expert"},
    {v: 6, f: ""} */
    var result = "";// `{v: -1, f: ""},`;
    var responses = this.proj.getResponses();
    for (var resp of responses) {
      result += `{v: ${resp.value}, f: "${resp.text}"},`
    }
    result += `{v: ${responses.length}, f: ""}`
    return result;
  }

  generateDataRows(): string {
    /* Generate one of these rows for each survey. The first entry is the date of the survey,
    followed by a floating point number for the average response value for each question, during that
    survey.

    [new Date(2015, 2, 11), 2.5, 1.0, 3.5, 4.5],
    [new Date(2015, 3, 11), 4.1, 1.1, 4.2, 4.7],
    [new Date(2015, 4, 11), 5.0, 2.1, 4.5, 4.7],
    [new Date(2015, 5, 11), 5.0, 3.5, 4.5, 4.9],

    */
    var result = "";
    for (var surv of this.proj.surveys) {
      console.dir(surv);
      var sdate: Date = surv.when;
      var resp = surv.calcAveResponses();
      result += `[new Date(${sdate.getFullYear() }, ${sdate.getMonth() }, ${sdate.getDate() }), ${resp.join(",") }],`
    }
    console.dir(result);
    return result;
  }

  chartHtmlFileContents(): string {
    var chart_html_template = `<script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript" src="${this.name}.js"></script>
    <div id="chart_div"></div>
`
    return chart_html_template;
  }

  chartJSFileContents(): string {
    var chart_js_template: string = `google.load('visualization', '1', {
        packages: ['corechart', 'line']
    });
    google.setOnLoadCallback(drawLogScales);

    function drawLogScales() {
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'X');
        ${this.generateDataColumns() }

        data.addRows([
          ${this.generateDataRows() }
        ]);

        var options = {
            chartArea: {left:"20%",top: '10%',width:'55%',height:'70%'},
            hAxis: {
                title: 'Date',
                ticks: [${this.generateTicValues() }],
                gridlines: {color: 'none'}
            },
            vAxis: {
                ticks: [${this.generateResponses() }],
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
                  height: '100%'},
                width: 1200,
                height: 800
          };

        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
`;
    return chart_js_template;
  }
}
