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
            result += "new Date(" + month.getFullYear() + ", " + month.getMonth() + ", 1);";
        }
        return result;
    };
    Generate.prototype.chartHtmlFileContents = function () {
        var chart_html_template = "<script type=\"text/javascript\" src=\"https://www.google.com/jsapi\"></script>\n    <script type=\"text/javascript\" src=\"" + this.name + ".js\"></script>\n    <div id=\"chart_div\"></div>\n";
        return chart_html_template;
    };
    Generate.prototype.chartJSFileContents = function () {
        var chart_js_template = "google.load('visualization', '1', {\n        packages: ['corechart', 'line']\n    });\n    google.setOnLoadCallback(drawLogScales);\n\n    function drawLogScales() {\n        var data = new google.visualization.DataTable();\n        data.addColumn('date', 'X');\n        " + this.generateDataColumns() + "\n\n        data.addRows([\n            [new Date(2015, 2, 11), 2.5, 1.0, 3.5, 4.5],\n            [new Date(2015, 3, 11), 4.1, 1.1, 4.2, 4.7],\n            [new Date(2015, 4, 11), 5.0, 2.1, 4.5, 4.7],\n            [new Date(2015, 5, 11), 5.0, 3.5, 4.5, 4.9],\n        ]);\n\n        var options = {\n            chartArea: {left:\"20%\",top: '10%',width:'55%',height:'70%'},\n            hAxis: {\n                title: 'Survey Number',\n                ticks: [" + this.generateTicValues() + "],\n                gridlines: {color: 'none'}\n            },\n            vAxis: {\n                ticks: [\n                    {v: 0, f: \"\"},\n                    {v: 1, f: \"No idea\"},\n                    {v: 2, f: \"Can guess\"},\n                    {v: 3, f: \"Studied it\"},\n                    {v: 4, f: \"understand it\"},\n                    {v: 5, f: \"An expert\"},\n                    {v: 6, f: \"\"}],\n                title: 'Mastery',\n                gridlines: {color: 'none'},\n                width: '100%',\n                height: '100%'        },\n        };\n\n        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));\n        chart.draw(data, options);\n    }\n";
        return chart_js_template;
    };
    return Generate;
})();
exports.Generate = Generate;
//# sourceMappingURL=generate.js.map