var fs = require('fs');
var Generate = (function () {
    function Generate(proj, name) {
        this.proj = proj;
        this.name = name;
    }
    Generate.prototype.saveFiles = function () {
        fs.writeFileSync("./" + this.name + ".js", this.chartJSFileContents());
        fs.writeFileSync("./" + this.name + ".html", this.chartHtmlFileContents());
    };
    Generate.prototype.generateDataColumns = function () {
        var result = "";
        for (var _i = 0, _a = this.proj.questions; _i < _a.length; _i++) {
            var question = _a[_i];
            result += "data.addColumn('number', '" + question + "');";
        }
        return result;
    };
    Generate.prototype.generateTicValues = function () {
        var result = "";
        for (var _i = 0, _a = this.proj.getSurveyMonths(); _i < _a.length; _i++) {
            var month = _a[_i];
            result += "new Date(" + month.getFullYear() + ", " + month.getMonth() + ", 1),";
        }
        return result;
    };
    Generate.prototype.generateResponses = function () {
        var result = "";
        var responses = this.proj.getResponses();
        for (var _i = 0; _i < responses.length; _i++) {
            var resp = responses[_i];
            result += "{v: " + resp.value + ", f: \"" + resp.text + "\"},";
        }
        result += "{v: " + responses.length + ", f: \"\"}";
        return result;
    };
    Generate.prototype.generateDataRows = function () {
        var result = "";
        for (var _i = 0, _a = this.proj.surveys; _i < _a.length; _i++) {
            var surv = _a[_i];
            console.dir(surv);
            var sdate = surv.when;
            var resp = surv.calcAveResponses();
            result += "[new Date(" + sdate.getFullYear() + ", " + sdate.getMonth() + ", " + sdate.getDate() + "), " + resp.join(",") + "],";
        }
        console.dir(result);
        return result;
    };
    Generate.prototype.chartHtmlFileContents = function () {
        var chart_html_template = "<script type=\"text/javascript\" src=\"https://www.google.com/jsapi\"></script>\n    <script type=\"text/javascript\" src=\"" + this.name + ".js\"></script>\n    <div id=\"chart_div\"></div>\n";
        return chart_html_template;
    };
    Generate.prototype.chartJSFileContents = function () {
        var chart_js_template = "google.load('visualization', '1', {\n        packages: ['corechart', 'line']\n    });\n    google.setOnLoadCallback(drawLogScales);\n\n    function drawLogScales() {\n        var data = new google.visualization.DataTable();\n        data.addColumn('date', 'X');\n        " + this.generateDataColumns() + "\n\n        data.addRows([\n          " + this.generateDataRows() + "\n        ]);\n\n        var options = {\n            chartArea: {left:\"20%\",top: '10%',width:'55%',height:'70%'},\n            hAxis: {\n                title: 'Date',\n                ticks: [" + this.generateTicValues() + "],\n                gridlines: {color: 'none'}\n            },\n            vAxis: {\n                ticks: [" + this.generateResponses() + "],\n                minorGridlines: {\n                    count: 1,\n                    color: '#DCDCDC'\n                  },\n                  gridlines: {\n                    count: -1,\n                    color: '#DCDCDC'\n                  },\n                  title: 'Mastery',\n                  width: '100%',\n                  height: '100%'},\n                width: 1200,\n                height: 800\n          };\n\n        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));\n        chart.draw(data, options);\n    }\n";
        return chart_js_template;
    };
    return Generate;
})();
exports.Generate = Generate;
//# sourceMappingURL=generate.js.map