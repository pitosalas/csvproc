var datafile_1 = require('./datafile');
var project_1 = require('./project');
var config_1 = require('./config');
var generate_1 = require('./generate');
var config = new config_1.Config();
config.fromJSONFile("./csvconfig.json");
var datafile = new datafile_1.DataFile();
datafile.prepareFile("cs105spring2015.csv", config);
var project = new project_1.Project(datafile.questions(), datafile.surveys());
var gen = new generate_1.Generate(project, "chart1");
gen.saveFiles();
//# sourceMappingURL=csvproc.js.map