import fs = require('fs');
import { Survey } from './survey';
import { Config } from './config';


var parse = require('csv-parse');

export class DataFile {
	fileName: string;
	rawRecords: string[][];
	config:Config;

	constructor() {
		this.rawRecords = [];
	}

	prepareFile(name: string, config:Config) {
		this.config = config;
		this.fileName = name;
		var data = fs.readFileSync(name, "utf8");
		var parser = parse();
		var record;

		parser.on('readable', () => {
			while(record = parser.read()) {
				this.rawRecords.push(record);
			}
		});

		parser.on('error', function(err) {
			console.log("WARN: "+err.message);
		});

		/*parser.on('finish', function() {
			console.log("csv finished")
		});*/

		parser.write(data);
		parser.end();
	}

	questions(): string[] {
			var regexp = /\[(.*)\]/;
			return this.rawRecords[0].map((value) => {
				var match = regexp.exec(value);
				if (match) {
					return match[1];
				} else {
					console.log(`WARN: Header that's not a question: ${value}`);
				}
			}).filter(x=>!!x);
	}

	surveys(): Survey[] {
		var prevDate:Date = new Date('Jan 1 2015');
		var samples = 0;
		var day = 1000*60*60*24;
		var result: Survey[] = [];
		var survey:Survey;

		for (var i in this.rawRecords) {
			if (i == 0) { continue; }
			var resp:string[] = this.rawRecords[i];
			var sampDate:Date = new Date(resp[0]);
			var diff = (sampDate.getTime() - prevDate.getTime())/day;
			if (diff > 5.0) {
				survey = new Survey(sampDate, i*1);
				result.push(survey);
			}	else {
				survey.samples += 1;
				survey.indexEnd = i*1;
			};
			var respStrings:string[] = this.rawRecords[i].slice(1, -1);
			var respInts:number[] = respStrings.map((s) => this.config.mapAnswerToNum(s));
			survey.addResponse(respInts);
			prevDate = sampDate;
			}
		return result;
	}

	surveyData() {

	}
}
